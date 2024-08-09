import { wixClientServer } from "@/lib"
import { orders } from "@wix/ecom"
import Link from "next/link"
import { notFound } from "next/navigation"

const OrderPage = async ({ params }: { params: { id: string } }) => {
  const id = params?.id ?? ""

  const wixClient = await wixClientServer()

  let order:orders.Order & orders.OrderNonNullableFields | null = null;
  try {
    order = await wixClient.orders.getOrder(id)
    console.log(order)
  } catch (error) {
    console.log(error)
    return notFound()
  }

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] items-center justify-center ">
      <div className="shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] px-40 py-20">
        <h1 className="text-xl">Detalle del pedido</h1>
        {order && (
          <div className="mt-12 flex flex-col gap-6">
            <div className="">
              <span className="font-medium">ID del pedido: </span>
              <span>{order._id}</span>
            </div>
            <div className="">
              <span className="font-medium">Nombre del receptor: </span>
              <span>
                {order.billingInfo?.contactDetails?.firstName + " "}
                {order.billingInfo?.contactDetails?.lastName}
              </span>
            </div>
            <div className="">
              <span className="font-medium">Correo del receptor: </span>
              <span>{order.buyerInfo?.email}</span>
            </div>
            <div className="">
              <span className="font-medium">Precio: </span>
              <span>{order.priceSummary?.subtotal?.amount}</span>
            </div>
            <div className="">
              <span className="font-medium">Estado del pago: </span>
              <span>{order.paymentStatus}</span>
            </div>
            <div className="">
              <span className="font-medium">Estado del pedido: </span>
              <span>{order.status}</span>
            </div>
            <div className="">
              <span className="font-medium">Dirección de entrega: </span>
              <span>
                {order.billingInfo?.address?.addressLine1 + " "}
                {order.billingInfo?.address?.city}
              </span>
            </div>
          </div>
        )}
      </div>
      <Link href="/" className="underline mt-6">
        Have a problem? Contact us
      </Link>
    </div>
  )
}

export default OrderPage
