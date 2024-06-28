import FacebookIcon from "app/components/FacebookIcon"
import GoogleIcon from "app/components/GoogleIcon"
import TiktokIcon from "app/components/TiktokIcon"
import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextFieldAccessoryProps, WelcomeHeader } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

export enum LoginMode {
  login = "Login",
  register = "Register",
}

export interface LoginScreenProps extends AppStackScreenProps<"Login"> {
  mode: LoginMode
}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores()

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthEmail("ignite@infinite.red")
    setAuthPassword("ign1teIsAwes0m3")

    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  const error = isSubmitted ? validationError : ""

  function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")

    // We'll mock this with a fake token.
    setAuthToken(String(Date.now()))
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <WelcomeHeader progress={100} isReversed />
      <Text preset="heading" style={$signIn}>
        {_props.route.params.mode}
      </Text>
      {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}

      {/*<TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen.emailFieldLabel"
        placeholderTx="loginScreen.emailFieldPlaceholder"
        helper={error}
        status={error ? "error" : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="loginScreen.passwordFieldLabel"
        placeholderTx="loginScreen.passwordFieldPlaceholder"
        onSubmitEditing={login}
        RightAccessory={PasswordRightAccessory}
      />*/}

      <Button testID="login-button" style={$tapButton} onPress={() => {}}>
        <View style={$tapButtonContent}>
          <GoogleIcon />
          <Text>Continue with Google</Text>
        </View>
      </Button>

      <Button testID="login-button" style={$tapButton} onPress={() => {}}>
        <View style={$tapButtonContent}>
          <FacebookIcon />
          <Text>Continue with Facebook</Text>
        </View>
      </Button>

      <Button testID="login-button" style={$tapButton} onPress={() => {}}>
        <View style={$tapButtonContent}>
          <TiktokIcon />
          <Text>Continue with Tiktok</Text>
        </View>
      </Button>

      <View style={$dividerWrapper}>
        <View style={$dividerContainer}>
          <Text style={$dividerText}>
            Or {_props.route.params.mode === LoginMode.login ? LoginMode.register : LoginMode.login}{" "}
            With
          </Text>
        </View>
      </View>

      <Button testID="login-button" style={[$tapButton, { marginTop: 0 }]} onPress={() => {}}>
        <View style={$tapButtonContent}>
          <GoogleIcon />
          <Text>
            {_props.route.params.mode === LoginMode.login ? LoginMode.register : LoginMode.login}{" "}
            with Google
          </Text>
        </View>
      </Button>

      <Button testID="login-button" style={$tapButton} onPress={() => {}}>
        <View style={$tapButtonContent}>
          <FacebookIcon />
          <Text>
            {_props.route.params.mode === LoginMode.login ? LoginMode.register : LoginMode.login}{" "}
            with Facebook
          </Text>
        </View>
      </Button>

      <Button testID="login-button" style={$tapButton} onPress={() => {}}>
        <View style={$tapButtonContent}>
          <TiktokIcon />
          <Text>
            {_props.route.params.mode === LoginMode.login ? LoginMode.register : LoginMode.login}{" "}
            with Tiktok
          </Text>
        </View>
      </Button>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $tapButton: ViewStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: spacing.xs,
}

const $tapButtonContent: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "center",
  alignContent: "center",
  gap: 8,
}

const $dividerWrapper: ViewStyle = {
  height: 2,
  width: "auto",
  backgroundColor: colors.separator,
  marginVertical: spacing.lg,
}

const $dividerContainer: ViewStyle = {
  position: "absolute",
  top: -12,
  width: "100%",
  display: "flex",
  alignItems: "center",
}

const $dividerText: TextStyle = {
  width: "40%",
  backgroundColor: colors.background,
  textAlign: "center",
}
