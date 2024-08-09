"use client"
import { OPTIONS_PRODUCT } from "@/config"
import { products } from "@wix/stores"
import { useEffect, useState } from "react"
import Add from "./Add"

interface Props {
  productId: string
  variants: products.Variant[]
  productOptions: products.ProductOption[]
}

const CustomSizeProducts = ({ productId, variants, productOptions }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string
  }>({})
  const [selectedVariant, setSelectedVariant] = useState<products.Variant | null>(null)

  const handleOptionSelect = (optionType: string, choice: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionType]: choice,
    }))
  }

  const isVariantInStock = (choices: { [key: string]: string }) => {
    return variants.some((variant) => {
      const variantsChoices = variant.choices
      if (!variantsChoices) return false

      return (
        Object.keys(choices).every(
          (key) => variantsChoices[key] === choices[key]
        ) &&
        variant.stock?.inStock &&
        variant.stock?.quantity &&
        variant.stock?.quantity > 0
      )
    })
  }


  useEffect(()=>{
    const variant = variants.find((variant) =>{
      const variantsChoices = variant.choices
      if (!variantsChoices) return false
      if(Object.keys(selectedOptions).length === 0) return false
      return Object.keys(variantsChoices).every(
        (key) => {
          return variantsChoices[key] === selectedOptions[key]
        }
      )
    })

    setSelectedVariant(variant ?? null)
  },[selectedOptions, variants])

  // console.log(productOptions)


  // console.log(selectedVariant, selectedOptions)

  return (
    <div className="flex flex-col gap-6">
      {productOptions.map((option) => (
        <div key={option.optionType} className="flex flex-col gap-4">
          <h4 className="font-medium">Choose a {option.name}</h4>

          <ul className="flex items-center gap-3">
            {option.choices &&
              option.choices.map((choice) => {
                const disable = !isVariantInStock({
                  ...selectedOptions,
                  [option.name!]: choice.description!,
                })

                const selected =
                  selectedOptions[option.name!] === choice.description

                return (
                  <button
                    key={choice.description}
                    onClick={() =>
                      handleOptionSelect(option.name!, choice.description!)
                    }
                    disabled={disable}
                    style={{
                      // cursor: disable ? "not-allowed" : "pointer",
                    }}
                  >
                    {option.name === OPTIONS_PRODUCT.color && (
                      <li
                        className="w-8 h-8 rounded-full ring-1 ring-gray-300 relative"
                        style={{
                          backgroundColor: choice.value,
                        }}
                      >
                        {selected && (
                          <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        )}

                        {disable && (
                          <div className="absolute w-10 h-[2px] bg-red-400 rotate-[45deg] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </li>
                    )}

                    {option.name === OPTIONS_PRODUCT.size && (
                      <li className="ring-1 ring-lama text-lama rounded-md py-1 px-4 text-sm"
                        style={{
                          backgroundColor: selected ? "#f35c7a" : disable ? "#FBCFE8" : "#fff",
                          color: selected || disable ? "#fff" : "#f35c7a",
                          boxShadow: disable ? "none" : ""
                        }}
                      >
                        {choice.description}
                      </li>
                    )}
                  </button>
                )
              })}
          </ul>
        </div>
      ))}

      <Add
        productId={productId}
        variantId={selectedVariant?._id || "00000000-0000-0000-0000-000000000000"}
        stockNumber={selectedVariant?.stock?.quantity || 0}
      />

      {/* {
        <ul className="flex items-center gap-3">
          <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-red-500">
            <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </li>
          <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-blue-500"></li>
          <li className="w-8 h-8 rounded-full ring-1 cursor-not-allowed ring-gray-300 relative bg-green-400">
            <div className="absolute w-10 h-[2px] bg-red-400 rotate-[45deg] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </li>
        </ul>
      } */}

      {/* <h4 className="font-medium">choose a size</h4>
      <ul className="flex items-center gap-3">
        <li className="ring-1 ring-lama text-lama rounded-md py-1 px-4 text-sm cursor-pointer">
          Small
        </li>
        <li className="ring-1 ring-lama text-white bg-lama rounded-md py-1 px-4 text-sm cursor-pointer">
          Medium
        </li>
        <li className="ring-1 ring-pink-200 text-white bg-pink-200 rounded-md py-1 px-4 text-sm cursor-not-allowed">
          Large
        </li>
      </ul> */}
    </div>
  )
}

export default CustomSizeProducts
