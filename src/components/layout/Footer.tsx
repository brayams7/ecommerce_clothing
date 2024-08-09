import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 bg-gray-100 text-sm mt-24">
      {/* SUPERIOR */}
      <div className="flex flex-col md:flex-row justify-between gap-24">
        {/* IZQUIERDA */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/">
            <div className="text-2xl tracking-wide">BRAYCK</div>
          </Link>
          <p>Guatemala, Quetzaltenango</p>
          <span className="font-semibold">test@brayck.dev</span>
          <span className="font-semibold">+502 12345645</span>
          <div className="flex gap-6">
            <Image src="/facebook.png" alt="Facebook" width={16} height={16} />
            <Image
              src="/instagram.png"
              alt="Instagram"
              width={16}
              height={16}
            />
            <Image src="/youtube.png" alt="YouTube" width={16} height={16} />
            <Image
              src="/pinterest.png"
              alt="Pinterest"
              width={16}
              height={16}
            />
            <Image src="/x.png" alt="X" width={16} height={16} />
          </div>
        </div>
        {/* CENTRO */}
        <div className="hidden lg:flex justify-between w-1/2">
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">EMPRESA</h1>
            <div className="flex flex-col gap-6">
              <Link href="">Sobre Nosotros</Link>
              <Link href="">Carreras</Link>
              <Link href="">Afiliados</Link>
              <Link href="">Blog</Link>
              <Link href="">Contáctanos</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">TIENDA</h1>
            <div className="flex flex-col gap-6">
              <Link href="">Nuevas Llegadas</Link>
              <Link href="">Accesorios</Link>
              <Link href="">Hombres</Link>
              <Link href="">Mujeres</Link>
              <Link href="">Todos los Productos</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">AYUDA</h1>
            <div className="flex flex-col gap-6">
              <Link href="">Servicio al Cliente</Link>
              <Link href="">Mi Cuenta</Link>
              <Link href="">Encontrar una Tienda</Link>
              <Link href="">Legal y Privacidad</Link>
              <Link href="">Tarjeta de Regalo</Link>
            </div>
          </div>
        </div>
        {/* DERECHA */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          {/* <h1 className="font-medium text-lg">SUSCRÍBETE</h1>
      <p>
        ¡Sé el primero en recibir las últimas noticias sobre tendencias, promociones y mucho más!
      </p>
      <div className="flex">
        <input
          type="text"
          placeholder="Dirección de correo electrónico"
          className="p-4 w-3/4"
        />
        <button className="w-1/4 bg-lama text-white">UNIRSE</button>
      </div> */}
          <span className="font-semibold">Pagos Seguros</span>
          <div className="flex justify-start gap-x-2">
            <Image src="/paypal.png" alt="PayPal" width={40} height={20} />
            {/* <Image src="/mastercard.png" alt="MasterCard" width={40} height={20} /> */}
            <Image src="/visa.png" alt="Visa" width={40} height={20} />
          </div>
        </div>
      </div>
      {/* INFERIOR */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        <div className="">© 2024 Brayck shop</div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="">
            <span className="text-gray-500 mr-4">Idioma</span>
            <span className="font-medium">Español</span>
          </div>
          <div className="">
            <span className="text-gray-500 mr-4">Moneda</span>
            <span className="font-medium">Q Quetzal</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
