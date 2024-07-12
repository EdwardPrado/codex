import { useAuth } from "app/services/auth/useAuth"
import { observer } from "mobx-react-lite"
import React from "react"
import { View } from "react-native"
import { Button } from "./Button"

type SignOutButtonProps = {}

export const SignOutButton = observer(function SignOutButton(props: SignOutButtonProps) {
  const { logout } = useAuth()

  const handleSignOut = async () => {
    // make this async
    await logout()
  }

  return (
    <View>
      <Button text="Sign Out" onPress={handleSignOut}>
        Sign Out
      </Button>
    </View>
  )
})
