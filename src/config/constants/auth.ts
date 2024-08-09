export const MODES = {
  LOGIN: {
    title: "Log in",
    submit: "Login",
    redirect: "/auth/register",
  },
  REGISTER: {
    title: "Register",
    submit: "Register",
    redirect: "/auth/login",
  },
  RESET_PASSWORD: {
    title: "Reset your password",
    submit: "Reset",
    redirect: "/auth/login",
  },
  EMAIL_VERIFICATION: {
    title: "Verify your email",
    submit: "Verify",
    redirect: "/auth/login",
  },
} as const