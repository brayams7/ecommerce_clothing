"use client"
import { useWixClient } from "@/hooks/useWixClient"
import useCartStore from "@/lib/store"
import { useState } from "react"

const TYPE_INCREMENT = "increment"
const TYPE_DECREMENT = "decrement"

type quantityType = "increment" | "decrement"

interface Props {
  productId: string
  variantId: string
  stockNumber: number
}

const Add: React.FC<Props> = ({ productId, variantId, stockNumber }) => {
  const [quantity, setQuantity] = useState(1)
  const wixClient = useWixClient()
  const { addItem, isLoading } = useCartStore((state) => state)

  //TEMPORARY
  // const stock = 4

  const handleQuantity = (type: quantityType) => {
    if (type === TYPE_INCREMENT && quantity < stockNumber) {
      setQuantity(quantity + 1)
    } else if (type === TYPE_DECREMENT && quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  // const handleAddToCart = async () => {
  //   try {
  //     const response = await wixClient.currentCart.addToCurrentCart({
  //       lineItems:[
  //         {
  //           catalogReference:{
  //             appId: process.env.NEXT_PUBLIC_WIX_APP_ID,
  //             catalogItemId: productId,
  //             ...(variantId && {options:{variantId}})
  //           },
  //           quantity
  //         }
  //       ]
  //     });
  //     console.log(response)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Seleccione la cantidad</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              type="button"
              className="text-xl"
              onClick={() => handleQuantity(TYPE_DECREMENT)}
            >
              {" "}
              -{" "}
            </button>
            {quantity}
            <button
              type="button"
              className="text-xl"
              onClick={() => handleQuantity(TYPE_INCREMENT)}
            >
              {" "}
              +{" "}
            </button>
          </div>
          {stockNumber === 0 ? (
            <span className="text-red-500 text-sm">No hay stock</span>
          ) : (
            <div className="text-xs">
              !Solo quedan <span className="text-orange-400">{stockNumber} artículos</span>{" "}
              ! <br /> No te lo pierdas
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={
            () => addItem(wixClient, productId, variantId, quantity)
          }
          disabled={isLoading || stockNumber === 0}
          className="w-36 text-sm rounded-3xl ring-1 ring-lama text-lama py-2 px-4 hover:bg-lama hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-none"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  )
}

export default Add
