import Link from "next/link"
import {Menu, MenuMobile} from "./Menu"
import Image from "next/image"
import { SearchBar } from "../utils"
import dynamic from "next/dynamic"
const NavIcons = dynamic(() => import("../utils/NavIcons"), { ssr: false })
const Navbar = () => {
  return (
    <nav className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* MOBILE */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link href={"/"}>
          <div className="text-2xl tracking-wide">ECOMMERCE</div>
        </Link>

        <MenuMobile />
      </div>
      
      {/* BIGGER SCREEN */}
      <div className="hidden md:flex items-center h-full justify-center gap-8">
        {/* LEFT */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
          <Link href={"/"} className="flex items-center gap-3">
            <Image src="/logo.png" alt="logo" width={24} height={24} />
            <div className="text-2xl tracking-wide">ECOMMERCE</div>
          </Link>
          <Menu />
        </div>
        {/* RIGHT */}
        <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <SearchBar />         
          <NavIcons />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
