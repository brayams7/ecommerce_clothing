"use client"
import { wixClientServer } from "@/lib"
import { collections } from "@wix/stores"
import CategoryItem from "./CategoryItem"
import React, { useEffect, useRef, useState } from "react"


interface Props{
  list: collections.Collection[]
}

const CategoryList : React.FC<Props> = ({list}) => {
  const [containerElement, setContainerElement] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if(containerElement){
      containerElement.addEventListener("wheel", (e) => {
        e.preventDefault()
        containerElement.scrollLeft += e.deltaY
      })
    }

  }, [containerElement])

  return (
    <div ref={setContainerElement} className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8 w-full">
        {list.map((item: collections.Collection) => {
          return (
            <CategoryItem key={item._id} item={item} />
          )
        })}
      </div>
    </div>
  )
}

export default CategoryList
