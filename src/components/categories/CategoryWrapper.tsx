import { wixClientServer } from "@/lib"
import { collections } from "@wix/stores"
import CategoryItem from "./CategoryItem"
import { Suspense } from "react"
import CategoryList from "./CategoryList"
const CategoryWrapper = async () => {
  const wixClient = await wixClientServer()
  const response = await wixClient.collections.queryCollections().find()
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <CategoryList list={response.items} />
    </Suspense>
  )
}

export default CategoryWrapper