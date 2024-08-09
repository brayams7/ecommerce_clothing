"use client"

import { useWixClient } from "@/hooks/useWixClient"
import useCartStore from "@/lib/store"
import Image from "next/image"
// import { useEffect } from "react"
import { media as wixMedia } from "@wix/sdk"

const CartDropdown = () => {
  // const cartItems = true
  const wixClient = useWixClient()
  const { cart, isLoading, removeItem } = useCartStore((state) => state)

  console.log(cart)

  return (
    <div className="w-max flex flex-col gap-6">
      {!cart?.lineItems ? (
        <div>El carrito está vacío</div>
      ) : (
        <>
          <h2 className="text-xl">Carrito de compras</h2>
          <div className="flex flex-col gap-8">
            {/* ARTÍCULO */}
            {cart?.lineItems?.map((item) => (
              <div key={item._id} className="flex gap-4">
                {item.image && (
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(
                      item.image,
                      72,
                      96,
                      {}
                    )}
                    alt="producto"
                    width={72}
                    height={96}
                    className="object-cover rounded-md"
                  />
                )}

                <div className="flex flex-col justify-between w-full">
                  {/* SUPERIOR */}
                  <div className="flex justify-between items-center gap-8">
                    <h3 className="font-semibold">
                      {item.productName?.original}
                    </h3>
                    <p className="p-1 bg-gray-50 rounded-sm">
                      {item.quantity && item.quantity > 1
                        ? `${item.quantity} x `
                        : ""}
                      {item.price?.amount}
                    </p>
                  </div>

                  <p className="text-sm text-gray-500">
                    {item.availability?.status}
                  </p>

                  {/* INFERIOR */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Cantidad: {item.quantity}
                    </span>
                    <button
                      disabled={isLoading}
                      className="text-blue-400"
                      onClick={() => removeItem(wixClient, item._id!)}
                      style={{
                        cursor: isLoading ? "not-allowed" : "pointer",
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="flex gap-2 items-center font-semibold">
              <span>Subtotal: </span>
              {cart?.subtotal && <span> $ {cart?.subtotal?.amount}</span>}
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Impuestos y envío calculados al finalizar la compra
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                Ver carrito
              </button>
              <button
                disabled={isLoading}
                className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
              >
                Finalizar compra
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CartDropdown
