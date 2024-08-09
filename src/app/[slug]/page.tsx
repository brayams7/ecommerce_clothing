import Add from "@/components/products/Add"
import CustomSizeProducts from "@/components/products/CustomSizeProducts"
import ProductImages from "@/components/products/ProductImages"
import { wixClientServer } from "@/lib"
import { products } from "@wix/stores"
import { notFound } from "next/navigation"

interface Props {
  params: { slug: string }
}

const SiglePage: React.FC<Props> = async ({ params: { slug } }) => {
  const wixClient = await wixClientServer()
  const response = await wixClient.products
    .queryProducts()
    .eq("slug", slug)
    // .limit(limit || PRODUCT_PER_PAGE)
    .find()

  if (!response.items[0]) return notFound()

  const product = response.items[0]
  const mediaItems: products.MediaItem[] = product.media?.items || []

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages images={mediaItems} />
      </div>

      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        {/* TITLE */}
        <h1 className="text-3xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100" />

        <div className="flex items-center gap-4">
          <h3
            className={`text-xl textgray-500 ${
              product.priceData?.price !== product.priceData?.discountedPrice &&
              "line-through"
            }`}
          >
            {product.priceData?.formatted?.price}
          </h3>
          {product.priceData?.price !== product.priceData?.discountedPrice && (
            <h2 className="font-medium text-2xl">
              {product.priceData?.formatted?.discountedPrice}
            </h2>
          )}
        </div>
        <div className="h-[2px] bg-gray-100" />
        {product.productOptions && product.variants && product._id ? (
          <CustomSizeProducts
            productId={product._id}
            variants={product.variants}
            productOptions={product.productOptions}
          />
        ) : (

        <Add productId={product._id || ""} variantId={"00000000-0000-0000-0000-000000000000"} stockNumber={product.stock?.quantity || 0}/>
        )}
        <div className="h-[2px] bg-gray-100" />

        {product.additionalInfoSections?.map(
          (section: products.AdditionalInfoSection) => {
            return (
              <div className="text-sm" key={section.title}>
                <h4 className="font-medium mb-4">{section.title}</h4>
                <p>{section?.description}</p>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}

export default SiglePage
