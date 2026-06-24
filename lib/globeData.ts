import * as THREE from "three";

/**
 * Shared geometric constants for the whole scene. Keeping them in one place
 * makes it trivial to keep the globe, atmosphere, orbits and particles in
 * proportion with one another.
 */
export const GLOBE_RADIUS = 0.9;
/** Inner occluder sphere – sits just under the dots to hide the back face. */
export const GLOBE_OCCLUDER_RADIUS = GLOBE_RADIUS * 0.992;
export const ATMOSPHERE_RADIUS = GLOBE_RADIUS * 1.18;

export const ORBIT_MIN_RADIUS = GLOBE_RADIUS * 1.12;
export const ORBIT_MAX_RADIUS = GLOBE_RADIUS * 1.95;

const DEG2RAD = Math.PI / 180;

/**
 * Convert geographic coordinates to a point on a sphere of `radius`.
 * Longitude increases eastward; latitude increases northward.
 */
export function latLonToVector3(
  lat: number,
  lon: number,
  radius: number,
  target = new THREE.Vector3()
): THREE.Vector3 {
  const phi = (90 - lat) * DEG2RAD;
  const theta = (lon + 180) * DEG2RAD;
  target.set(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
  return target;
}

/**
 * A land/ocean sampler built from an equirectangular mask image.
 * The three.js `earth_specular` map encodes oceans as bright pixels and
 * land masses as dark pixels, so "land" is simply a low-brightness sample.
 */
export interface LandMask {
  width: number;
  height: number;
  /** Equirectangular canvas texture for GPU coast-edge sampling. */
  texture: THREE.CanvasTexture;
  /** Returns true when the given coordinate falls on land. */
  isLand: (lat: number, lon: number) => boolean;
  /** Raw brightness 0..1 at a coordinate (useful for weighting). */
  brightness: (lat: number, lon: number) => number;
}

export async function loadLandMask(
  url: string,
  sampleWidth = 1024,
  threshold = 0.5
): Promise<LandMask> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });

  const width = sampleWidth;
  const height = Math.round(sampleWidth / 2);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, width, height);
  const data = ctx.getImageData(0, 0, width, height).data;

  const brightnessAt = (lat: number, lon: number): number => {
    const u = (lon + 180) / 360;
    const v = (90 - lat) / 180;
    const x = Math.min(width - 1, Math.max(0, Math.floor(u * width)));
    const y = Math.min(height - 1, Math.max(0, Math.floor(v * height)));
    const idx = (y * width + x) * 4;
    return (data[idx] + data[idx + 1] + data[idx + 2]) / (3 * 255);
  };

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  return {
    width,
    height,
    texture,
    brightness: brightnessAt,
    // earth_specular: ocean ~ bright, land ~ dark => land when below threshold.
    isLand: (lat, lon) => brightnessAt(lat, lon) < threshold,
  };
}

/**
 * Y/X rotation that faces the camera toward the land-heavy hemisphere on load.
 * Camera sits on +Z looking at the origin.
 */
export function getLandFacingRotation(mask: LandMask): { x: number; y: number } {
  let sumX = 0;
  let sumY = 0;
  let sumZ = 0;
  let total = 0;
  const v = new THREE.Vector3();

  for (let lat = -50; lat <= 65; lat += 4) {
    const latWeight = Math.cos(lat * DEG2RAD);
    for (let lon = -180; lon < 180; lon += 4) {
      if (!mask.isLand(lat, lon)) continue;
      latLonToVector3(lat, lon, 1, v);
      sumX += v.x * latWeight;
      sumY += v.y * latWeight;
      sumZ += v.z * latWeight;
      total += latWeight;
    }
  }

  if (total < 1) return { x: 0, y: 0 };

  const y = Math.atan2(sumX / total, sumZ / total);
  const x = -Math.asin(THREE.MathUtils.clamp(sumY / total, -0.55, 0.55)) * 0.42;
  return { x, y };
}

export interface GlobeDots {
  positions: Float32Array;
  scales: Float32Array;
  /** Per-dot brightness – most are dim; a few get a soft silver glow. */
  intensities: Float32Array;
  count: number;
}

interface DotOptions {
  radius?: number;
  rows?: number;
  dotsAtEquator?: number;
  jitter?: number;
}

/**
 * Build an evenly distributed cloud of dots that only land on continents.
 * Rows are spaced by latitude and the per-row count is scaled by cos(lat)
 * to keep an approximately uniform angular spacing across the sphere.
 */
export function buildGlobeDots(
  mask: LandMask,
  { radius = GLOBE_RADIUS, rows = 195, dotsAtEquator = 400, jitter = 0.18 }: DotOptions = {}
): GlobeDots {
  const positions: number[] = [];
  const scales: number[] = [];
  const intensities: number[] = [];
  const v = new THREE.Vector3();

  for (let i = 0; i < rows; i++) {
    const lat = -90 + (180 * (i + 0.5)) / rows;
    const circumference = Math.cos(lat * DEG2RAD);
    const count = Math.max(1, Math.round(dotsAtEquator * circumference));
    // Offset every other row so dots don't form vertical seams.
    const rowOffset = (i % 2) * 0.5;

    for (let j = 0; j < count; j++) {
      const lon = -180 + (360 * (j + rowOffset)) / count;
      if (!mask.isLand(lat, lon)) continue;

      const jLat = lat + (Math.random() - 0.5) * (180 / rows) * jitter;
      const jLon = lon + (Math.random() - 0.5) * (360 / count) * jitter;
      latLonToVector3(jLat, jLon, radius, v);
      positions.push(v.x, v.y, v.z);
      const hasSoftGlow = Math.random() > 0.88;
      scales.push(hasSoftGlow ? 0.9 + Math.random() * 0.3 : 0.52 + Math.random() * 0.38);
      intensities.push(hasSoftGlow ? 0.82 + Math.random() * 0.28 : 0.32 + Math.random() * 0.2);
    }
  }

  return {
    positions: new Float32Array(positions),
    scales: new Float32Array(scales),
    intensities: new Float32Array(intensities),
    count: scales.length,
  };
}

function isNearCoast(mask: LandMask, lat: number, lon: number, probe = 1.15): boolean {
  if (!mask.isLand(lat, lon)) return false;
  const offsets: [number, number][] = [
    [probe, 0],
    [-probe, 0],
    [0, probe],
    [0, -probe],
    [probe * 0.72, probe * 0.72],
    [-probe * 0.72, probe * 0.72],
    [probe * 0.72, -probe * 0.72],
    [-probe * 0.72, -probe * 0.72],
  ];
  for (const [dlat, dlon] of offsets) {
    if (!mask.isLand(lat + dlat, lon + dlon)) return true;
  }
  return false;
}

interface CoastDotOptions {
  radius?: number;
  rows?: number;
  dotsAtEquator?: number;
  jitter?: number;
  coastProbe?: number;
}

/**
 * Silver dots placed along land/ocean coastlines – brighter and more glowing
 * than interior land dots so borders read as a dotted silver outline.
 */
export function buildCoastDots(
  mask: LandMask,
  {
    radius = GLOBE_RADIUS * 1.004,
    rows = 200,
    dotsAtEquator = 480,
    jitter = 0.42,
    coastProbe = 1.15,
  }: CoastDotOptions = {}
): GlobeDots {
  const positions: number[] = [];
  const scales: number[] = [];
  const intensities: number[] = [];
  const v = new THREE.Vector3();

  for (let i = 0; i < rows; i++) {
    const lat = -90 + (180 * (i + 0.5)) / rows;
    const circumference = Math.cos(lat * DEG2RAD);
    const count = Math.max(1, Math.round(dotsAtEquator * circumference));
    const rowOffset = (i % 2) * 0.5;

    for (let j = 0; j < count; j++) {
      const lon = -180 + (360 * (j + rowOffset)) / count;
      if (!isNearCoast(mask, lat, lon, coastProbe)) continue;

      const jLat = lat + (Math.random() - 0.5) * (180 / rows) * jitter;
      const jLon = lon + (Math.random() - 0.5) * (360 / count) * jitter;
      if (!isNearCoast(mask, jLat, jLon, coastProbe * 0.85)) continue;

      latLonToVector3(jLat, jLon, radius, v);
      positions.push(v.x, v.y, v.z);
      const bright = Math.random() > 0.55;
      scales.push(bright ? 0.95 + Math.random() * 0.45 : 0.72 + Math.random() * 0.35);
      intensities.push(bright ? 0.95 + Math.random() * 0.35 : 0.72 + Math.random() * 0.28);
    }
  }

  return {
    positions: new Float32Array(positions),
    scales: new Float32Array(scales),
    intensities: new Float32Array(intensities),
    count: scales.length,
  };
}

export interface City {
  name: string;
  lat: number;
  lon: number;
  /** 0..1 – scales dot size and glow; defaults to 0.75. */
  weight?: number;
}

/** Major world cities used as bright silver hub dots on the globe. */
export const MAJOR_CITIES: City[] = [
  { name: "New York", lat: 40.7128, lon: -74.006, weight: 1 },
  { name: "Los Angeles", lat: 34.0522, lon: -118.2437, weight: 0.92 },
  { name: "Chicago", lat: 41.8781, lon: -87.6298, weight: 0.82 },
  { name: "Toronto", lat: 43.6532, lon: -79.3832, weight: 0.85 },
  { name: "Mexico City", lat: 19.4326, lon: -99.1332, weight: 0.9 },
  { name: "São Paulo", lat: -23.5505, lon: -46.6333, weight: 0.95 },
  { name: "Buenos Aires", lat: -34.6037, lon: -58.3816, weight: 0.8 },
  { name: "London", lat: 51.5074, lon: -0.1278, weight: 1 },
  { name: "Paris", lat: 48.8566, lon: 2.3522, weight: 0.95 },
  { name: "Berlin", lat: 52.52, lon: 13.405, weight: 0.82 },
  { name: "Madrid", lat: 40.4168, lon: -3.7038, weight: 0.8 },
  { name: "Rome", lat: 41.9028, lon: 12.4964, weight: 0.78 },
  { name: "Moscow", lat: 55.7558, lon: 37.6173, weight: 0.9 },
  { name: "Istanbul", lat: 41.0082, lon: 28.9784, weight: 0.88 },
  { name: "Cairo", lat: 30.0444, lon: 31.2357, weight: 0.85 },
  { name: "Lagos", lat: 6.5244, lon: 3.3792, weight: 0.82 },
  { name: "Johannesburg", lat: -26.2041, lon: 28.0473, weight: 0.78 },
  { name: "Dubai", lat: 25.2048, lon: 55.2708, weight: 0.88 },
  { name: "Riyadh", lat: 24.7136, lon: 46.6753, weight: 0.75 },
  { name: "Mumbai", lat: 19.076, lon: 72.8777, weight: 0.95 },
  { name: "Delhi", lat: 28.6139, lon: 77.209, weight: 0.92 },
  { name: "Bangalore", lat: 12.9716, lon: 77.5946, weight: 0.8 },
  { name: "Singapore", lat: 1.3521, lon: 103.8198, weight: 0.9 },
  { name: "Bangkok", lat: 13.7563, lon: 100.5018, weight: 0.82 },
  { name: "Jakarta", lat: -6.2088, lon: 106.8456, weight: 0.88 },
  { name: "Manila", lat: 14.5995, lon: 120.9842, weight: 0.78 },
  { name: "Hong Kong", lat: 22.3193, lon: 114.1694, weight: 0.92 },
  { name: "Shanghai", lat: 31.2304, lon: 121.4737, weight: 1 },
  { name: "Beijing", lat: 39.9042, lon: 116.4074, weight: 0.95 },
  { name: "Seoul", lat: 37.5665, lon: 126.978, weight: 0.9 },
  { name: "Tokyo", lat: 35.6895, lon: 139.6917, weight: 1 },
  { name: "Osaka", lat: 34.6937, lon: 135.5023, weight: 0.78 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093, weight: 0.9 },
  { name: "Melbourne", lat: -37.8136, lon: 144.9631, weight: 0.82 },
];

interface CityDotOptions {
  radius?: number;
  cities?: City[];
  mask?: LandMask;
}

/**
 * Bright silver hub dots at major city coordinates – the brightest layer on
 * the globe, sitting slightly above land and coast dots.
 */
export function buildCityDots(
  {
    radius = GLOBE_RADIUS * 1.012,
    cities = MAJOR_CITIES,
    mask,
  }: CityDotOptions = {}
): GlobeDots {
  const positions: number[] = [];
  const scales: number[] = [];
  const intensities: number[] = [];
  const v = new THREE.Vector3();

  for (const city of cities) {
    if (mask && !mask.isLand(city.lat, city.lon)) continue;
    latLonToVector3(city.lat, city.lon, radius, v);
    positions.push(v.x, v.y, v.z);
    const w = city.weight ?? 0.75;
    scales.push(1.1 + w * 0.65 + Math.random() * 0.2);
    intensities.push(0.92 + w * 0.28 + Math.random() * 0.12);
  }

  return {
    positions: new Float32Array(positions),
    scales: new Float32Array(scales),
    intensities: new Float32Array(intensities),
    count: scales.length,
  };
}

export interface SurfaceNetwork {
  /** Bright hub node positions (xyz triples). */
  nodes: Float32Array;
  nodeScales: Float32Array;
  nodeCount: number;
  /** Line-segment vertex pairs for the connecting arcs. */
  lines: Float32Array;
  lineCount: number;
}

/** Spherical-linear interpolation between two unit vectors. */
function slerp(a: THREE.Vector3, b: THREE.Vector3, t: number, out: THREE.Vector3) {
  const dot = THREE.MathUtils.clamp(a.dot(b), -1, 1);
  const omega = Math.acos(dot);
  const so = Math.sin(omega);
  if (so < 1e-4) {
    out.copy(a).lerp(b, t);
    return out;
  }
  const wa = Math.sin((1 - t) * omega) / so;
  const wb = Math.sin(t * omega) / so;
  out.set(a.x * wa + b.x * wb, a.y * wa + b.y * wb, a.z * wa + b.z * wb);
  return out;
}

/**
 * Build the glowing constellation-style network that sits on the globe: a set
 * of bright hub nodes (mostly over land) connected to their nearest neighbours
 * by gently lifted great-circle arcs. Rendered with additive blending this
 * recreates the triangulated communication mesh from the reference image.
 */
export function buildSurfaceNetwork(
  mask: LandMask,
  {
    radius = GLOBE_RADIUS,
    hubCount = 72,
    neighbors = 3,
    maxDist = 0.85,
    arcSegments = 16,
    arcLift = 0.05,
    seed = 99,
  }: {
    radius?: number;
    hubCount?: number;
    neighbors?: number;
    maxDist?: number;
    arcSegments?: number;
    arcLift?: number;
    seed?: number;
  } = {}
): SurfaceNetwork {
  const rand = mulberry32(seed);
  const units: THREE.Vector3[] = [];
  const nodes: number[] = [];
  const nodeScales: number[] = [];

  let attempts = 0;
  while (units.length < hubCount && attempts < hubCount * 40) {
    attempts++;
    const lat = -90 + rand() * 180;
    const lon = -180 + rand() * 360;
    const onLand = mask.isLand(lat, lon);
    // Strongly favour land so hubs trace the continents.
    if (!onLand && rand() > 0.18) continue;
    const v = latLonToVector3(lat, lon, 1);
    units.push(v.clone());
    const p = v.clone().multiplyScalar(radius);
    nodes.push(p.x, p.y, p.z);
    nodeScales.push(onLand ? 1.5 + rand() * 1.6 : 0.9 + rand() * 0.5);
  }

  const lines: number[] = [];
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const cur = new THREE.Vector3();
  const prev = new THREE.Vector3();
  const seen = new Set<string>();

  for (let i = 0; i < units.length; i++) {
    // Find nearest neighbours by angular distance.
    const dists: { j: number; d: number }[] = [];
    for (let j = 0; j < units.length; j++) {
      if (i === j) continue;
      const d = units[i].distanceTo(units[j]);
      if (d < maxDist) dists.push({ j, d });
    }
    dists.sort((x, y) => x.d - y.d);

    for (let k = 0; k < Math.min(neighbors, dists.length); k++) {
      const j = dists[k].j;
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);

      a.copy(units[i]);
      b.copy(units[j]);
      for (let s = 0; s <= arcSegments; s++) {
        const t = s / arcSegments;
        slerp(a, b, t, cur);
        const lift = 1 + arcLift * Math.sin(Math.PI * t);
        cur.multiplyScalar(radius * lift);
        if (s > 0) {
          lines.push(prev.x, prev.y, prev.z, cur.x, cur.y, cur.z);
        }
        prev.copy(cur);
      }
    }
  }

  return {
    nodes: new Float32Array(nodes),
    nodeScales: new Float32Array(nodeScales),
    nodeCount: nodeScales.length,
    lines: new Float32Array(lines),
    lineCount: lines.length / 3,
  };
}

export interface OrbitConfig {
  radius: number;
  /** Euler tilt applied to the orbital plane (equator rings only). */
  rotation: [number, number, number];
  /** Slight eccentricity so rings aren't perfect circles. */
  eccentricity: number;
  /** Drift speed (radians / second), signed for direction. */
  speed: number;
  opacity: number;
  hue: number;
  /** Meridian rings pass through both poles; equator rings lie in a tilted plane. */
  plane?: "equator" | "meridian";
}

/** Deterministic-ish pseudo random so the layout is stable per seed. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Generate the set of orbital rings wrapping the globe. */
export function buildOrbits(count = 26, seed = 7): OrbitConfig[] {
  const rand = mulberry32(seed);
  const orbits: OrbitConfig[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const radius = THREE.MathUtils.lerp(
      ORBIT_MIN_RADIUS,
      ORBIT_MAX_RADIUS,
      Math.pow(t, 0.85)
    );
    // Bias toward shallow, near-equatorial belts (as in the reference) so the
    // rings read as flat ellipses wrapping the planet rather than a tangle.
    orbits.push({
      radius,
      rotation: [
        (rand() - 0.5) * 0.85,
        rand() * Math.PI * 2,
        (rand() - 0.5) * 0.5,
      ],
      eccentricity: 0.02 + rand() * 0.1,
      speed: (rand() > 0.5 ? 1 : -1) * (0.012 + rand() * 0.04),
      opacity: 0.07 + rand() * 0.11,
      hue: 0,
    });
  }
  return orbits;
}

/**
 * Four orbital rings spaced around the globe – visible lines with stars
 * travelling along each path at distinct radii and tilts.
 */
export function buildGlobeOrbits(count = 4): OrbitConfig[] {
  const spacing = [
    GLOBE_RADIUS * 1.06,
    GLOBE_RADIUS * 1.16,
    GLOBE_RADIUS * 1.26,
    GLOBE_RADIUS * 1.36,
  ];
  const orbits: OrbitConfig[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / Math.max(count - 1, 1);
    orbits.push({
      radius: spacing[i] ?? spacing[spacing.length - 1],
      rotation: [
        THREE.MathUtils.lerp(-0.35, 0.45, t),
        (i / count) * Math.PI * 1.35 + 0.4,
        (i % 2 === 0 ? 1 : -1) * 0.18,
      ],
      eccentricity: 0.04 + i * 0.025,
      speed: (i % 2 === 0 ? 1 : -1) * (0.011 + i * 0.0035),
      opacity: 0.24 + i * 0.07,
      hue: 0,
      plane: "equator",
    });
  }
  return orbits;
}

/**
 * Sample N points along an inclined, slightly elliptical orbit. Returned as a
 * flat Float32Array suitable for a BufferGeometry line.
 */
export function buildOrbitCurve(orbit: OrbitConfig, segments = 160): Float32Array {
  const points = new Float32Array((segments + 1) * 3);
  const euler = new THREE.Euler(...orbit.rotation);
  const v = new THREE.Vector3();
  const a = orbit.radius;
  const b = orbit.radius * (1 - orbit.eccentricity);
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    v.set(Math.cos(angle) * a, 0, Math.sin(angle) * b).applyEuler(euler);
    points[i * 3] = v.x;
    points[i * 3 + 1] = v.y;
    points[i * 3 + 2] = v.z;
  }
  return points;
}

export interface NetworkNode {
  orbit: number;
  /** Current parametric position along the orbit, 0..1. */
  offset: number;
  speed: number;
  size: number;
  hue: number;
}

/** Distribute travelling nodes across the available orbits. */
export function buildNetworkNodes(
  orbits: OrbitConfig[],
  nodeCount = 260,
  seed = 21
): NetworkNode[] {
  const rand = mulberry32(seed);
  const nodes: NetworkNode[] = [];
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      orbit: Math.floor(rand() * orbits.length),
      offset: rand(),
      speed: (rand() > 0.5 ? 1 : -1) * (0.018 + rand() * 0.06),
      size: 0.55 + rand() * 0.95,
      hue: 0,
    });
  }
  return nodes;
}

/** Evenly space stars along each ring for a clean lattice. */
export function buildEvenRingNodes(
  orbits: OrbitConfig[],
  nodesPerOrbit = 42,
  seed = 21
): NetworkNode[] {
  const rand = mulberry32(seed);
  const nodes: NetworkNode[] = [];
  for (let o = 0; o < orbits.length; o++) {
    for (let i = 0; i < nodesPerOrbit; i++) {
      nodes.push({
        orbit: o,
        offset: i / nodesPerOrbit,
        speed:
          orbits[o].speed *
          (0.85 + rand() * 0.3) *
          (rand() > 0.5 ? 1 : -1),
        size: 0.45 + rand() * 0.75,
        hue: 0,
      });
    }
  }
  return nodes;
}

/** @deprecated Use buildEvenRingNodes */
export const buildMeridianRingNodes = buildEvenRingNodes;
