import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { Session, supabase } from "./supabase"
import { AuthResponse, AuthTokenResponsePassword } from "@supabase/supabase-js"

type AuthState = {
  isAuthenticated: boolean
  token?: Session["access_token"]
}

type SignInProps = {
  email: string
  password: string
}

type SignUpProps = {
  email: string
  password: string
}

type AuthContextType = {
  signIn: (props: SignInProps) => Promise<AuthTokenResponsePassword>
  signUp: (props: SignUpProps) => Promise<AuthResponse>
  logout: () => void
} & AuthState

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: undefined,
  signIn: () => new Promise(() => ({})),
  signUp: () => new Promise(() => ({})),
  logout: () => {},
})

export function useAuth() {
  const value = useContext(AuthContext)

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAuth must be used within an AuthProvider")
    }
  }

  return value
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<AuthState["token"]>(undefined)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "SIGNED_OUT":
          setToken(undefined)
          break
        case "INITIAL_SESSION":
        case "SIGNED_IN":
        case "TOKEN_REFRESHED":
          setToken(session?.access_token)
          break
        default:
        // no-op
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const signIn = useCallback(
    async ({ email, password }: SignInProps) => {
      const result = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (result.data?.session?.access_token) {
        setToken(result.data.session.access_token)
      }

      return result
    },
    [supabase],
  )

  const signUp = useCallback(
    async ({ email, password }: SignUpProps) => {
      const result = await supabase.auth.signUp({
        email,
        password,
      })

      if (result.data?.session?.access_token) {
        setToken(result.data.session.access_token)
      }

      return result
    },
    [supabase],
  )

  const logout = useCallback(async () => {
    const result = await supabase.auth.signOut()

    if (!result.error) {
      setToken(undefined)
    }
  }, [supabase])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        token,
        signIn,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
