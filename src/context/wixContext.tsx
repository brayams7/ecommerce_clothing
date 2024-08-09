"use client"

import { createClient, OAuthStrategy } from "@wix/sdk"
import { products,collections } from "@wix/stores"
import { currentCart } from "@wix/ecom"
import { members } from "@wix/members"
import Cookies from "js-cookie"
import { createContext } from "react"

const refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}")

const wixClient = createClient({
  modules: {
    products,
    collections,
    currentCart,
    members
  },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID as string,
    tokens: {
      accessToken: {
        value: '',
        expiresAt: 0

      },
      refreshToken
    }
  })
})

export type WixClient = typeof wixClient

export const WixClientContext = createContext<WixClient>(wixClient)


export const WixClientContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <WixClientContext.Provider value={wixClient}>{children}</WixClientContext.Provider>
}
