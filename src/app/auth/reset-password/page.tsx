"use client"
import { MODES } from "@/config"
import { useWixClient } from "@/hooks/useWixClient"
import { LoginState } from "@wix/sdk"
import Link from "next/link"
import { useState } from "react"


const ResetPasswordPage = () => {
  const [dataForm, setDataForm] = useState({
    email: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const wixClient = useWixClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)

      await wixClient.auth.sendPasswordResetEmail(
        dataForm.email,
        window.location.href + "auth/login"
      )
      setMessage("Revisa tu correo para reestablecer tu contraseña")
    } catch (error) {
      console.log(error)
      setError("Ocurrio un error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        {message && (
          <p className="text-lg font-semibold text-green-600 gap-0">
            {message}
          </p>
        )}
        <h1 className="text-2xl font-semibold">{MODES.RESET_PASSWORD.title}</h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm text-gray-700">
            {" "}
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="brayck@brayck.dev"
            className="ring-2 ring-gray-300 rounded-md p-4"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 self-center bg-lama text-white rounded-md w-max disabled:cursor-not-allowed disabled:bg-pink-200"
        >
          {MODES.RESET_PASSWORD.submit}
        </button>
        <Link href={"/auth/login"} className="text-sm underline">
          Go to back login
        </Link>
      </form>
    </div>
  )
}

export default ResetPasswordPage
