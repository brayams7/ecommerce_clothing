"use client"
import Image from "next/image"
import { FormEvent } from "react"
import {useRouter, useSearchParams} from "next/navigation"

export const SearchBar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const search = formData.get("search") as string

    if(search){
      // const searchParams = new URLSearchParams()
      // searchParams.append("search", search)

      const params = new URLSearchParams(searchParams.toString())
      params.set("search", search)

      console.log(params.toString())

      router.push(`/list?${params.toString()}`)
    }
    
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-1 justify-between gap-4 bg-gray-100 p-2 rounded-md">
      <input type="text" name="search"  placeholder="Buscar" className="flex-1 bg-transparent outline-none"/>
      <button type="submit" className="">
        <Image src="/search.png" alt="search" width={16} height={16} />
      </button>
    </form>
  )
}