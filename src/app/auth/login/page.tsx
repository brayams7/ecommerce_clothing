"use client"

import { MODES } from "@/config"
import { useWixClient } from "@/hooks/useWixClient"
import { LoginState } from "@wix/sdk"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"

interface typeMode {
  title: string
  submit: string
  redirect: string
}

const LoginPage = () => {
  const wixClient = useWixClient()
  const router = useRouter()

  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
    email: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let isOk = false
    try {
      setLoading(true)

      const response = await wixClient.auth.login({
        email: dataForm.email,
        password: dataForm.password,
      })

      console.log(response)
      switch (response?.loginState) {
        case LoginState.SUCCESS:
          setMessage("Login exitoso")
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken
          )
          console.log(tokens)
          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          })
          wixClient.auth.setTokens(tokens)
          isOk = true
          break

        case LoginState.FAILURE:
          if (
            response.errorCode === "invalidEmail" ||
            response.errorCode === "invalidPassword"
          ) {
            setError("Email o contraseña incorrectos")
          } else if (response.errorCode === "resetPassword") {
            setError("Por favor, reestablezca su contraseña")
          } else {
            setError("Ocurrio un error en el servidor")
          }
          break

        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setError("Por favor, verifique su correo, se envio un correo de verificación")
          break
        case LoginState.OWNER_APPROVAL_REQUIRED:
          setError("Por favor, espere a que el administrador apruebe su cuenta")
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
    if (isOk) router.push("/")
  }

  useEffect(() => {
    const isLoggedIn = wixClient.auth.loggedIn()
    if (isLoggedIn) router.push("/")
  }, [router, wixClient])

  return (
    <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        {message && (
          <p className="text-lg font-semibold text-green-600 gap-0">
            {message}
          </p>
        )}

        <h1 className="text-2xl font-semibold">{MODES.LOGIN.title}</h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm text-gray-700">
            {" "}
            Email
          </label>
          <input
            type="email"
            name="email"
            onChange={(e) =>
              setDataForm({ ...dataForm, email: e.target.value })
            }
            value={dataForm.email}
            placeholder="brayck@brayck.dev"
            className="ring-2 ring-gray-300 rounded-md p-4"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm text-gray-700">
            {" "}
            Password
          </label>
          <input
            type="password"
            onChange={(e) =>
              setDataForm({ ...dataForm, password: e.target.value })
            }
            value={dataForm.password}
            name="password"
            placeholder="********"
            className="ring-2 ring-gray-300 rounded-md p-4"
          />
        </div>

        <Link href={"/auth/reset-password"} className="text-sm underline">
          Forgot password?
        </Link>

        <button
          type="submit"
          className="px-6 py-2 self-center bg-lama text-white rounded-md w-max disabled:cursor-not-allowed disabled:bg-pink-200"
          disabled={loading}
        >
          {loading ? "Loading..." : MODES.LOGIN.submit}{" "}
        </button>

        {error && <p className="text-red-600">{error}</p>}

        <Link href={"/auth/register"} className="text-sm underline">
          Dont Have an account? Register
        </Link>
      </form>
    </div>
  )
}

export default LoginPage
