
export const publicRoutes ={
  LOGIN: {
    path: "/auth/login",
    name: "Login",
  },
  HOME: {
    path: "/",
    name: "Home",
  },
  ABOUT: {
    path: "/about",
    name: "About",
  },
  CONTACT: {
    path: "/contact",
    name: "Contact",
  },
  SHOP: {
    path: "/shop",
    name: "Shop",
  },
  CART: {
    path: "/cart",
    name: "Cart",
  },
}

export const privateRoutes = {
  ADMIN: {
    path: "/admin",
    name: "Admin",
  },
  LOGOUT: {
    path: "/auth/logout",
    name: "Logout",
  },
} 