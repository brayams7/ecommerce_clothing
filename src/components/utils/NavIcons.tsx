"use client"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import CustomDropdown from "./CustomDropdown"
import CartDropdown from "../cart/CartDropdown"
import { useWixClient } from "@/hooks/useWixClient"
import Cookies from "js-cookie"
import useCartStore from "@/lib/store"

type navIconName = "Profile" | "Notification" | "Cart"

interface Iicon {
  name: navIconName
  src: string
}

type NavIcons = Iicon[]

// const LIST: NavIcons = [
//   {
//     name: "Profile",
//     src: "/profile.png",
//   },
//   {
//     name: "Notification",
//     src: "/notification.png",
//   },
//   {
//     name: "Cart",
//     src: "/cart.png",
//   },
// ]

const NavIcons = () => {
  const router = useRouter()
  const wixClient = useWixClient()
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [statusDropdown, setStatusDropdown] = useState<
    Record<navIconName, boolean>
  >({
    Profile: false,
    Notification: false,
    Cart: false,
  })

  const [isLoading, setIsLoading] = useState(false)

  const { counter, getCart } = useCartStore((state) => state)

  const isLoggedIn = wixClient.auth.loggedIn()

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/auth/login")
      return
    }
  }

  const handleLogout = async () => {
    setIsLoading(true)
    Cookies.remove("refreshToken")
    const { logoutUrl } = await wixClient.auth.logout(
      window.location.href + "auth/login"
    )
    setIsLoading(false)
    setStatusDropdown({ Profile: false, Notification: false, Cart: false })
    router.push(logoutUrl)
  }


  const handleOpenIcon = (name: navIconName) => {
    // if (name === "Profile") handleProfile()

    setStatusDropdown((prev) => {
      const listOptionsToFalse = Object.entries(prev)
        .filter(([key]) => key !== name)
        .map(([key]) => [key, false])
      const object = Object.fromEntries(listOptionsToFalse)

      return {
        ...object,
        [name]: !prev[name],
      }
    })
  }

  useEffect(() => {
    getCart(wixClient)
  }, [wixClient, getCart])

  // useEffect(() => {
  //   setIsLoggedIn()
  // }, [wixClient])

  return (
    <section className="flex items-center gap-4 xl:gap-6 relative">
      {/* {LIST.map((item) => (
        <ItemIcon key={item.name} item={item} statesIcons={statusDropdown} handleClick={handleOpenIcon} DropdownContent={ContentDropdownProfile} />
      ))} */}

      <button
        onClick={() => {
          // handleOpenIcon("Profile")
        }}
      >
        <CustomDropdown
          trigger={
            <Image
              src={"/profile.png"}
              alt={"Profile"}
              width={24}
              height={24}
            />
          }
        >
          <ContentDropdownProfile
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            isLoading={isLoading}
          />
        </CustomDropdown>
      </button>

      <button
        onClick={() => {
          handleOpenIcon("Notification")
        }}
      >
        <CustomDropdown
          trigger={
            <Image
              src={"/notification.png"}
              alt={"Notification"}
              width={24}
              height={24}
            />
          }
        >
          <div>Notification</div>
        </CustomDropdown>
      </button>

      <button
        onClick={() => {
          handleOpenIcon("Cart")
        }}
      >
        <CustomDropdown
          trigger={
            <div className="relative">
              <Image src={"/cart.png"} alt={"Cart"} width={24} height={24} />
              <span className="block absolute -top-3 -right-4 w-6 bg-lama rounded-full text-center text-white text-sm">
                {counter}
              </span>
            </div>
          }
        >
          <CartDropdown />
        </CustomDropdown>
      </button>
    </section>
  )
}

const ContentDropdownProfile = ({
  handleLogout,
  isLoading,
  isLoggedIn,
}: {
  handleLogout: () => void
  isLoading: boolean
  isLoggedIn: boolean
}) => {
  return (
    <div className="flex flex-col">
      {isLoggedIn ? (
        <>
          <Link href={"/profile"}>Profile</Link>
          <button
            className=""
            disabled={isLoading}
            onClick={() => handleLogout()}
          >
            {isLoading ? "Logging out" : "Logout"}
          </button>
        </>
      ) : (
        <Link href={"/auth/login"}>Login</Link>
      )}
    </div>
  )
}

interface PropsItemIcon {
  item: Iicon
  statesIcons: Record<navIconName, boolean>
  handleClick?: (name: navIconName) => void
  DropdownContent: React.FC<{ name: string }>
}

const ItemIcon: React.FC<PropsItemIcon> = ({
  item,
  statesIcons,
  handleClick,
  DropdownContent,
}) => {
  return (
    <>
      <button
        onClick={() => {
          if (handleClick) handleClick(item.name)
        }}
      >
        <CustomDropdown
          trigger={
            <Image src={item.src} alt={item.name} width={24} height={24} />
          }
        >
          <DropdownContent name={item.name} />
        </CustomDropdown>
      </button>
      {/* 
      {statesIcons[item.name] && (

        
       )}  */}
    </>
  )
}

const ContainerDropdown: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="absolute p-4 rounded-md top-12 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
      {children}
    </div>
  )
}

export default NavIcons
