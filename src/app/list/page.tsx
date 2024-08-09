import Image from "next/image"
import Filter from "@/components/products/Filter"
import ProductList from "@/components/products/ProductList"
import { notFound, useSearchParams } from "next/navigation"
import { wixClientServer } from "@/lib"
import { CATEGORIES, CATEGORY_ALL_ID } from "@/config"
import { Suspense } from "react"
import { collections } from "@wix/stores"
const ListPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string>
}) => {
  const categoryName = searchParams?.["cat"] || CATEGORIES.all
  const wixClient = await wixClientServer()
  let response:
    | (collections.GetCollectionBySlugResponse &
        collections.GetCollectionBySlugResponseNonNullableFields)
    | null = null
  try {
    response = await wixClient.collections.getCollectionBySlug(categoryName)
  } catch (error: object | any) {
    if (typeof error === "object" && error?.details) {
      if (error?.details?.applicationError?.code === 404) {
        return notFound()
      }
    }
  }

  if (!response) return notFound()

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Aprovecha hasta un 50% de descuento en <br /> productos
            seleccionados
          </h1>
          <button className="rounded-3xl bg-lama text-small w-max text-white py-3 px-5">
            Buy now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src="/woman.png" alt="woman" fill className="object-contain" />
        </div>
      </div>

      {/* FILTER */}
      <Filter />

      {/* PRODUCT LIST */}

      <h1 className="mt-12 text-xl font-semibold">
        {response.collection?.name} !Para ti!
      </h1>
      {response && (
        <Suspense fallback={<div>Cargando...</div>}>
          <ProductList
            categoryId={response.collection?._id || CATEGORY_ALL_ID}
            limit={20}
            searchParams={searchParams}
          />
        </Suspense>
      )}
    </div>
  )
}

export default ListPage
