/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { Navigator, TabParamList } from "./Navigator"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"
import { LoginScreenProps } from "app/screens"
import { useAuth } from "app/services/auth/useAuth"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  WelcomeHealth: undefined
  WelcomeSearch: undefined
  WelcomeSignup: undefined
  WelcomeLogin: undefined
  Login: LoginScreenProps
  Demo: NavigatorScreenParams<TabParamList>
  HealthTracker: undefined
  AddDeck: undefined
  ViewDeck: undefined
  DeckList: undefined
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const { isAuthenticated } = useAuth()

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName={isAuthenticated ? "Demo" : "Welcome"}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Demo" component={Navigator} />
          <Stack.Screen name="AddDeck" component={Screens.AddDeckScreen} />
          <Stack.Screen name="ViewDeck" component={Screens.ViewDeckScreen} />
          <Stack.Screen name="DeckList" component={Screens.DeckListScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} />
          <Stack.Screen name="WelcomeHealth" component={Screens.WelcomeHealthScreen} />
          <Stack.Screen name="WelcomeSearch" component={Screens.WelcomeSearchScreen} />
          <Stack.Screen name="WelcomeLogin" component={Screens.WelcomeLoginScreen} />
          <Stack.Screen name="Login" component={Screens.LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
