import { wixClientServer } from "@/lib"
import { products } from "@wix/stores"
import Image from "next/image"
import Link from "next/link"
import DOMPurify from "isomorphic-dompurify"
import { Pagination } from "../pagination"

const PRODUCT_PER_PAGE = 10

const ASCENDING = "asc"
const DESCENDING = "desc"

const allowedSortValues = {
  price: "price",
  lastUpdated: "lastUpdated",
} as const

type AllowdSortValue =
  (typeof allowedSortValues)[keyof typeof allowedSortValues]

const ADDITIONAL_INFO_SECTIONS = {
  shortDesc: "ShortDescription",
}

const ProductList = async ({
  categoryId,
  // limit=1,
  searchParams,
}: {
  categoryId?: string
  limit?: number
  searchParams?: Record<string, string>
}) => {
  const wixClient = await wixClientServer()
  const query = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.search || "")
    .eq("collectionIds", categoryId)
    .hasSome("productType", [searchParams?.type || "physical", "digital"])
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 99999)
    .limit(PRODUCT_PER_PAGE)
    .skip(searchParams?.page ? Number(searchParams.page) * PRODUCT_PER_PAGE : 0)
  // .find()

  // console.log(searchParams?.page)

  if (searchParams?.sort) {
    let [sortType, sortBy] = searchParams.sort.split(" ")

    const allowedSortType = Object.values(allowedSortValues).includes(
      sortBy as AllowdSortValue
    )

    if (!allowedSortType) {
      sortBy = "price"
    }
    // console.log(sortType, sortBy)

    if (sortType === ASCENDING) {
      query.ascending(sortBy as AllowdSortValue)
    }

    if (sortType === DESCENDING) {
      query.descending(sortBy as AllowdSortValue)
    }
  }

  const response = await query.find()

  // console.log(response)

  return (
    <div className="w-full">
      <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
        {response.items.map((product: products.Product) => {
          return (
            <Link
              key={product._id}
              href={`/${product.slug}`}
              className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
            >
              <div className="relative w-full h-80">
                <Image
                  src={product.media?.mainMedia?.image?.url || "/product.png"}
                  alt="product"
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
                />

                {product.media?.items && (
                  <Image
                    src={product.media?.items[1]?.image?.url || "/product.png"}
                    alt="product"
                    fill
                    sizes="25vw"
                    className="absolute object-cover rounded-md"
                  />
                )}
              </div>
              <div className="flex justify-between">
                <span className="fonrt-medium">{product.name}</span>
                <span className="font-semibold">
                  {product.priceData?.formatted?.price}
                </span>
              </div>
              {product.additionalInfoSections && (
                <div
                  className="text-sm text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      product.additionalInfoSections.find(
                        (section: products.AdditionalInfoSection) =>
                          section?.title === ADDITIONAL_INFO_SECTIONS.shortDesc
                      )?.description || ""
                    ),
                  }}
                ></div>
              )}
              <button className="rounded-2xl ring-1 ring-lama w-auto text-lama py-2 px-3 hover:bg-lama hover:text-white">
                Add to cart
              </button>
            </Link>
          )
        })}
      </div>
      <Pagination
        currentPage={response.currentPage  || 0}
        hasPrev={response.hasPrev()}
        hasNext={response.hasNext()}
      />
    </div>
  )
}

export default ProductList
