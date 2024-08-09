"use client"

import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { publicRoutes } from "@/config/index"

export const MenuList = [
  {
    name: publicRoutes.HOME.name,
    link: publicRoutes.HOME.path,
    isShow: true,
  },
  {
    name: publicRoutes.SHOP.name,
    link: publicRoutes.SHOP.path,
    isShow: true,
  },
  {
    name: publicRoutes.CART.name,
    link: publicRoutes.CART.path,
    isShow: true,
  },
  {
    name: publicRoutes.ABOUT.name,
    link: publicRoutes.ABOUT.path,
    isShow: true,
  },
  {
    name: publicRoutes.CONTACT.name,
    link: publicRoutes.CONTACT.path,
    isShow: true,
  },
]

export const MenuMobile = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="">
      <Image
        className="cursor-pointer"
        src="/menu.png"
        alt="menu"
        width={28}
        height={28}
        onClick={() => setOpen((prev) => !prev)}
      />
      <div className={`
          absolute bg-black text-white left-0 top-20 
          w-full ${open ? "h-[calc(100vh-80px)]" : "h-0"} flex flex-col items-center justify-center gap-8 text-xl z-10 
          transition-[height] ease-in-out duration-300`}
      >
          {
            open && MenuList.map((item) => (
              <Link key={item.name} href={item.link} className="cursor-pointer">
                {item.name}
              </Link>
            ))
          }
        </div>
    </div>
  )
}

export const Menu = () => {
  return (
    <div className="hidden xl:flex gap-4 ">
      {
        MenuList.map((item) => (
          <Link key={item.name} href={item.link} className="cursor-pointer">
            {item.name}
          </Link>
        ))
      }
    </div>
  )
}