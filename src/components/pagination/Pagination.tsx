"use client"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

interface Props {
  currentPage:number,
  hasPrev:boolean,
  hasNext:boolean,
}

const Pagination = ({currentPage, hasPrev, hasNext}:Props) => {
  // console.log(currentPage)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const {replace} = useRouter()

  const createPageUrl = (page:number) =>{
    
    const params = new URLSearchParams(searchParams.toString())
    params.set("page",page.toString())
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex justify-between mt-6">
      <button
        disabled={!hasPrev}
        onClick={() => createPageUrl(currentPage - 1)}
        className="rounded-md bg-lama text-white p-2 text-sm w-24 disabled:cursor-not-allowed disabled:bg-pink-200">
        Previus
      </button>
      <button
        onClick={() => createPageUrl(currentPage + 1)}
        disabled={!hasNext}
        className="rounded-md bg-lama text-white p-2 text-sm w-24 disabled:cursor-not-allowed disabled:bg-pink-200">

        Next
      </button>
    </div>
  )
}

export default Pagination