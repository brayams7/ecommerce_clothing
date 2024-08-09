"use client"

import { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"

interface Props {
  children: React.ReactNode
  trigger: React.ReactNode
  position?: "right" | "left"
  zIndex?: number,
}

const CustomDropdown: React.FC<Props> = ({
  children,
  trigger,
  zIndex = 30,
  position = "right",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const toogleRef = useRef<HTMLAnchorElement | null>(null)
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({})

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const isCloseElement = (e.target as HTMLElement).closest(
        "#close-dropdown"
      )
      if (
        (isOpen &&
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node) &&
          toogleRef.current &&
          !toogleRef.current.contains(e.target as Node)) ||
        isCloseElement
      ) {
        setIsOpen(false) // close dropdown
      }
    }

    document.addEventListener("mousedown", handleClickOutside, true)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true)
    }
  }, [isOpen, dropdownRef, toogleRef])

  useEffect(() => {
    // cambia la posicion del dropdown si se sale de la pantalla
    const updatePosition = () => {
      const buttonRect = toogleRef.current?.getBoundingClientRect()

      if (buttonRect && dropdownRef.current) {
        const dropdownHeight = dropdownRef.current.offsetHeight
        const dropdownWidth = dropdownRef.current.offsetWidth

        const top = buttonRect.top + buttonRect.height
        const left = buttonRect.left

        const shouldOpenUpwards = window.innerHeight < top + dropdownHeight
        const shouldOpenLeftwards =
          window.innerWidth - buttonRect.right < dropdownWidth

        if (position === "right") {
          setDropdownStyle({
            top: shouldOpenUpwards
              ? buttonRect.top - dropdownHeight + window.scrollY
              : top + window.scrollY,
            left: shouldOpenLeftwards
              ? buttonRect.right - dropdownWidth
              : left + window.scrollX,
          })
        }

        if (position === "left") {
          setDropdownStyle({
            top: shouldOpenUpwards
              ? buttonRect.top -
                dropdownHeight +
                window.scrollY +
                buttonRect.height
              : buttonRect.top + window.scrollY,
            left: buttonRect.left - dropdownWidth - 10 + window.scrollX,
          })
        }
      }
    }

    if (isOpen) {
      updatePosition()
    }

    const handleWindowChange = () => {
      if (isOpen) {
        updatePosition()
      }
    }

    window.addEventListener("resize", handleWindowChange)
    window.addEventListener("scroll", handleWindowChange, true)

    return () => {
      window.removeEventListener("resize", handleWindowChange)
      window.removeEventListener("scroll", handleWindowChange, true)
    }
  }, [isOpen, position])

  const dropdownContent = isOpen && (
    <div
      ref={dropdownRef}
      className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white rounded-md text-sm p-4 m-3"
      style={{
        position: "fixed",
        zIndex: zIndex,
        // backgroundColor: "white",
        width: "max-content",
        height: "max-content",
        opacity: isOpen ? 1 : 0,
        minWidth: "auto",
        transition: "opacity 0.2s ease, visibility 0.2s ease",
        // border: border || "1px solid var(--gray-200)",
        ...dropdownStyle,
      }}
    >
      {children}
    </div>
  )

  return (
    <>
      {/* {trigger ? (
        <a ref={toogleRef} onClick={handleClick} role="button">
          {trigger}
        </a>
      ) : (
        <button
          ref={toogleRef}
          onClick={handleClick}
          className="btn p-1 border-0 btn-outline-light"
          role="button"
          type="button"
        >
          <MoreIcon fill="var(--navbar-vertical-link-color)" />
        </button>
      )} */}

      <a ref={toogleRef} onClick={handleClick} role="button">
        {trigger}
      </a>

      {isOpen && ReactDOM.createPortal(dropdownContent, document.body)}
    </>
  )
}

export default CustomDropdown
