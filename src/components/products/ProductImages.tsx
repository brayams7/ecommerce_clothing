"use client"
import { products } from "@wix/stores"
import Image from "next/image"
import React, { useState } from "react"

// const images = [
//   {
//     id: 1,
//     url: "https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
//   },
//   {
//     id: 2,
//     url: "https://images.pexels.com/photos/17867705/pexels-photo-17867705/free-photo-of-crowd-of-hikers-on-the-mountain-ridge-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
//   },
//   {
//     id: 3,
//     url: "https://images.pexels.com/photos/21812160/pexels-photo-21812160/free-photo-of-puerta-colonial-color-rojo-de-guanajuato-mexico.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
//   },
//   {
//     id: 4,
//     url: "https://images.pexels.com/photos/20832069/pexels-photo-20832069/free-photo-of-a-narrow-street-with-buildings-and-cars.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
//   },
// ]

interface Props {
  images: products.MediaItem[]
}

const ProductImages: React.FC<Props> = ({images}) => {

  const [item, setItem] = useState<products.MediaItem>(images[0])
  return (
    <div>
      <div className="h-[500px] relative">
        <Image
          src={item.image?.url || "product.png"}
          alt={item.title || "product"}
          fill
          className="object-cover rounded-md"
          sizes="50vw"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {images.map((image, index) => (
          <div key={image._id} className="w-1/4 h-32 relative gap-4 mt-8">
            <button type="button" onClick={() => setItem(images[index])}>
              <Image
                src={item.image?.url || "product.png"}
                alt={item.title || "product"}
                fill
                className="object-cover rounded-md"
                sizes="30vw"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductImages
