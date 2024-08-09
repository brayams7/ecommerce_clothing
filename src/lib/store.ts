import { create } from "zustand"
import { currentCart } from "@wix/ecom"
import { WixClient } from "@/context/wixContext"
export type CartState = {
  cart: currentCart.Cart
  isLoading: boolean
  counter: number
  getCart: (wixClient: WixClient) => void
  addItem: (
    wixClient: WixClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => void
  removeItem: (wixClient: WixClient, itemId: string) => void
}

const useCartStore = create<CartState>((set) => ({
  cart: [],
  isLoading: true,
  counter: 0,
  getCart: async (wixClient: WixClient) => {
    try {
      const cart = await wixClient.currentCart.getCurrentCart()

      set({
        cart: cart ?? [],
        isLoading: false,
        counter: cart?.lineItems.length ?? 0,
      })
    } catch (error) {
      console.log(error)
      set((state) => ({ ...state, isLoading: false }))
    }
  },
  addItem: async (
    wixClient: WixClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => {
    try {
      set((state) => ({ ...state, isLoading: true }))

      const response = await wixClient.currentCart.addToCurrentCart({
        lineItems: [
          {
            catalogReference: {
              appId: process.env.NEXT_PUBLIC_WIX_APP_ID,
              catalogItemId: productId,
              ...(variantId && { options: { variantId } }),
            },
            quantity,
          },
        ],
      })

      set({
        cart: response?.cart,
        counter: response?.cart?.lineItems.length ?? 0,
        isLoading: false,
      })
    } catch (error) { 
      console.log(error)
    } finally {
      set((state) => ({ ...state, isLoading: false }))
    }
  },

  removeItem: async (wixClient: WixClient, itemId: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }))
      const response = await wixClient.currentCart.removeLineItemsFromCurrentCart([itemId])

      set({
        cart: response?.cart,
        counter: response?.cart?.lineItems.length ?? 0,
        isLoading: false,
      })
    } catch (error) {
      console.log(error)
    }finally{
      set((state) => ({ ...state, isLoading: false }))
    }
  },
}))

export default useCartStore
