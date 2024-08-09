"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

const Filter = () => {

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const {replace } = useRouter()

  const handlevalidateNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    const re = /^[0-9\b]+$/
    
    return value === '' || re.test(value)
  }

  const handleAllowOnlyNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  }


  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)
    replace(`${pathname}?${params.toString()}`)
  }


  return (
    <div className="mt-12 flex justify-between flex-wrap gap-y-4">
      <div className="flex gap-4 md:gap-x-6 flex-wrap">
        <select
          onChange={handleFilterChange}
          name="type"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
        >
          <option value="type">Type</option>
          <option value="physical">Physical</option>
          <option value="digital">Digital</option>
        </select>

        <input
          onChange={(e)=>{
            if(handlevalidateNumber(e))
              handleFilterChange(e)
            handleAllowOnlyNumber(e)
            // handleFilterChange(e)
          }}
          type="text"
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl py-2 px-4 ring-1 ring-gray-400"
        />
        <input
          onChange={handleFilterChange}
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl py-2 px-4 ring-1 ring-gray-400"
        />
        <select
          onChange={handleFilterChange}
          name="category"
          id="category"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
        >
          <option value="category">Category</option>
          <option value="newArrival">New Arrival</option>
          <option value="popular">Popular</option>
        </select>
        <select
          name="all"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
        >
          <option value="all">All filters</option>
        </select>
      </div>
      <div className="justify-self-end">
        <select
          name="sort"
          id="sort"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
          onChange={handleFilterChange}
        >
          <option>Sort By</option>
          <option value="asc price">Price (low to high)</option>
          <option value="desc price">Price (high to low)</option>
          <option value="asc lastUpdated">Newest</option>
          <option value="desc lastUpdated">Oldest</option>
        </select>
      </div>
    </div>
  )
}

export default Filter
