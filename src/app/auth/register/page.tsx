"use client"

import { MODES } from "@/config"
import { useWixClient } from "@/hooks/useWixClient"
import { LoginState } from "@wix/sdk"
import Link from "next/link"
import { useState } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

const RegisterPage = () => {
  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
    email: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()
  const wixClient = useWixClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)

      const response = await wixClient.auth.register({
        email: dataForm.email,
        password: dataForm.password,
        profile: {
          nickname: dataForm.username,
        },
      })

      console.log(response)

      switch (response?.loginState) {
        case LoginState.SUCCESS:
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken
          )

          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          })
          wixClient.auth.setTokens(tokens)
          setMessage("Registro exitoso")
          router.push("/")
          break

        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setError("Por favor, verifique su correo")
          break

        case LoginState.FAILURE:
          if (response.errorCode === "emailAlreadyExists") {
            setError("El correo electronico ya existe")
          } else {
            setError("Ocurrio un error al registrar")
          }

          break
        default:
          break
      }
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
        <h1 className="text-2xl font-semibold">{MODES.LOGIN.title}</h1>

        <div className="flex flex-col gap-4">
          <label htmlFor="username" className="text-sm text-gray-700">
            {" "}
            Username
          </label>
          <input
            onChange={(e) =>
              setDataForm({ ...dataForm, username: e.target.value })
            }
            value={dataForm.username}
            type="text"
            name="username"
            placeholder="Brayck"
            className="ring-2 ring-gray-300 rounded-md p-4"
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="email" className="text-sm text-gray-700">
            {" "}
            Email
          </label>
          <input
            onChange={(e) =>
              setDataForm({ ...dataForm, email: e.target.value })
            }
            value={dataForm.email}
            type="email"
            name="email"
            placeholder="brayck@brayck.dev"
            className="ring-2 ring-gray-300 rounded-md p-4"
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="password" className="text-sm text-gray-700">
            {" "}
            Password
          </label>
          <input
            onChange={(e) =>
              setDataForm({ ...dataForm, password: e.target.value })
            }
            value={dataForm.password}
            type="password"
            name="password"
            placeholder="********"
            className="ring-2 ring-gray-300 rounded-md p-4"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 self-center bg-lama text-white rounded-md w-max disabled:cursor-not-allowed disabled:bg-pink-200"
          disabled={loading}
        >
          {MODES.REGISTER.title}
        </button>

        {error && <p className="text-red-600">{error}</p>}

        <Link href={"/auth/login"} className="text-sm underline">
          Have an account? Login
        </Link>
      </form>
    </div>
  )
}

export default RegisterPage
