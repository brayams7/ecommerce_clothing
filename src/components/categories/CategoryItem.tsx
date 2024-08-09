import { collections } from "@wix/stores"
import Image from "next/image"
import Link from "next/link"

interface Props {
  item: collections.Collection
}

const CategoryItem: React.FC<Props> = ({ item }) => {
  return (
    <Link
      key={item._id}
      href={`/list?cat=${item.slug}`}
      className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
    >
      <div className="relative bg-slate-100 w-full h-96">
        <Image
          src={`${item.media?.mainMedia?.image?.url}` || "cat.png"}
          alt={item.slug || "category"}
          fill
          sizes="20vw"
          className="object-cover"
        />
      </div>
      <h1 className="mt-8 font-light text-xl tracking-wide">{item.name}</h1>
    </Link>
  )
}

export default CategoryItem
