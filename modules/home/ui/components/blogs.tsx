import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatContentDate } from "@/lib/format"
import { getBlogPosts } from "@/lib/blog"

export const Blogs = async () => {
  const posts = await getBlogPosts()
  const [featured, ...rest] = posts

  return (
    <section id="blog" className="relative w-full">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-white/35">
            02 — Intel
          </p>
          <h2 className="mt-3 text-2xl text-white md:text-3xl">Latest Blogs</h2>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-white/35 transition-colors hover:text-white"
        >
          View all
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {featured && (
        <Link href={featured.href} className="group mt-10 block">
          <article className="relative grid overflow-hidden border border-white/6 bg-white/1.5 md:grid-cols-[1.1fr_1fr]">
            <div className="relative aspect-16/10 overflow-hidden md:aspect-auto md:min-h-72">
              <Image
                src={featured.thumbnailUrl}
                alt=""
                fill
                className="object-cover opacity-80 transition-all duration-700 group-hover:scale-[1.02] group-hover:opacity-100"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent md:bg-linear-to-r md:from-transparent md:via-transparent md:to-black/40" />
            </div>

            <div className="flex flex-col justify-between gap-6 p-6 md:p-8">
              <div className="flex flex-col gap-4">
                <time
                  dateTime={featured.publishedAt}
                  className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/35"
                >
                  {formatContentDate(featured.publishedAt)}
                </time>
                <h3 className="font-heading text-xl leading-snug text-white transition-colors group-hover:text-cosmic md:text-2xl">
                  {featured.title}
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-white/45">
                  {featured.excerpt}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-white/35 transition-colors group-hover:text-white">
                Read article
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </article>
        </Link>
      )}

      {rest.length > 0 && (
        <div className="mt-px grid divide-y divide-white/6 border border-t-0 border-white/6 md:grid-cols-2 md:divide-x md:divide-y-0">
          {rest.map((post) => (
            <Link key={post.id} href={post.href} className="group block">
              <article
                className={cn(
                  "flex h-full flex-col justify-between gap-6 p-6 transition-colors duration-500",
                  "hover:bg-white/2",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <time
                    dateTime={post.publishedAt}
                    className="shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/30"
                  >
                    {formatContentDate(post.publishedAt)}
                  </time>
                  <ArrowUpRight className="size-3.5 shrink-0 text-white/20 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cosmic" />
                </div>

                <div className="flex gap-4">
                  <div className="relative size-14 shrink-0 overflow-hidden border border-white/8">
                    <Image
                      src={post.thumbnailUrl}
                      alt=""
                      fill
                      className="object-cover opacity-70 transition-opacity group-hover:opacity-100"
                      sizes="56px"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 font-heading text-base leading-snug text-white">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/40">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
