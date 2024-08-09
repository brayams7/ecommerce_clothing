
import CategoryList from "@/components/categories/CategoryList"
import CategoryWrapper from "@/components/categories/CategoryWrapper"
import ProductList from "@/components/products/ProductList"
import Slider from "@/components/slider/Slider"
import { useWixClient } from "@/hooks/useWixClient"
import { wixClientServer } from "@/lib"
import { Suspense, useEffect } from "react"

const HomePage = async () => {

  // const wixClient = useWixClient()

  
  
  // useEffect(()=>{
    
  //   const getProducts = async () => {
  //     const response = await wixClient.products.queryProducts().find();
  //     console.log(response)
  //   }

  //   getProducts()
  // },[wixClient])

  // const wixClient = await wixClientServer()
  // const response = await wixClient.products.queryProducts().find();

  // console.log(response)

  return (
    <div>
      <Slider />
      <section className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-3xl">
          Products
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList limit={4} categoryId={process.env.NEXT_PUBLIC_CATEGORY_ID_ACCESORIES!}/>
        </Suspense>
      </section>
      <section className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-8">
          Categories
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <CategoryWrapper />
        </Suspense>
      </section>
      {/* 
      <section className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-3xl">
          Products
        </h1>
        <ProductList />
      </section> */}
    </div>
  )
}

export default HomePage
