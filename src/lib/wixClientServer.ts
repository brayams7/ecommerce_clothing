import { createClient, OAuthStrategy } from "@wix/sdk"
import { products, collections } from "@wix/stores"
import { currentCart, orders } from "@wix/ecom"
import { cookies } from "next/headers"
import { members } from "@wix/members"

export const wixClientServer = async () => {
  
  let refreshToken

  try {
    const cookieStore = cookies()

    refreshToken = JSON.parse(cookieStore.get("refreshToken")?.value || "{}")
  } catch (error) {}

  const wixClient = createClient({
    modules: {
      products,
      collections,
      currentCart,
      orders,
      members
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID as string,
      tokens: {
        accessToken: {
          value: "",
          expiresAt: 0,
        },
        refreshToken,
      },
    }),
  })

  return wixClient
}
