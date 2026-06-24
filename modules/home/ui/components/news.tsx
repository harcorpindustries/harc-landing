import { getNewsItems } from "@/lib/news"
import { NewsContent } from "./news-content"

export const News = async () => {
  const items = await getNewsItems()

  return <NewsContent items={items} />
}
