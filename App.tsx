import "@expo/metro-runtime"
import React from "react"
import * as SplashScreen from "expo-splash-screen"
import App from "./app/app"
import "react-native-polyfill-globals/auto"
import "@azure/core-asynciterator-polyfill"
import { AuthProvider } from "app/services/auth/useAuth"

SplashScreen.preventAutoHideAsync()

function CodexApp() {
  return (
    <AuthProvider>
      <App hideSplashScreen={SplashScreen.hideAsync} />
    </AuthProvider>
  )
}

export default CodexApp
