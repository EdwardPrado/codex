import { yupResolver } from "@hookform/resolvers/yup"
import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useMemo, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { loginYupSchema } from "schemas"
import {
  Button,
  Icon,
  LoadingOverlay,
  Screen,
  StackNavbar,
  Text,
  TextField,
  TextFieldAccessoryProps,
} from "../components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useForm, Controller } from "react-hook-form"
import { useAuth } from "app/services/auth/useAuth"
import { useStores } from "app/models"

const LOGIN_ERROR_MESSAGE = "Unable to login with provided credentials"
const REGISTER_ERROR_MESSAGE = "Unable to register with provided credentials"

export enum LoginMode {
  login = "Login",
  register = "Register",
}

type FormResults = {
  email: string
  password: string
}

export interface LoginScreenProps extends AppStackScreenProps<"Login"> {
  mode: LoginMode
}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const { signIn, signUp } = useAuth()
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const {
    authenticationStore: { setAuthEmail, setAuthToken },
  } = useStores()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginYupSchema),
  })

  const isRegister = useMemo(() => {
    return _props?.route?.params?.mode === LoginMode.register
  }, [_props?.route.params])

  //  const error = isSubmitted ? validationError : ""

  const onSubmit = async (input: FormResults) => {
    setIsLoading(true)

    try {
      if (isRegister) {
        const { data, error } = await signUp(input)

        if (error) {
          setAuthToken("")
          setAuthEmail("")
        } else {
          setAuthToken(data.session?.access_token)
          setAuthEmail(data.session?.user.email || "")
        }

        if (error) {
          console.log(error)
          setLoginError(true)
        } else console.log(data)
      } else {
        const { data, error } = await signIn(input)
        if (error) {
          console.log(error)
          setLoginError(true)
        } else console.log(data)
      }
    } finally {
      setIsLoading(false)
    }
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
      {isLoading && <LoadingOverlay />}
      <StackNavbar text={isRegister ? LoginMode.register : LoginMode.login} />
      {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}

      <View style={$inputField}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              labelTx="loginScreen.emailFieldLabel"
              placeholder="example@gmail.com"
              status={errors.email ? "error" : undefined}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
          name="email"
        />
        {errors.email && <Text style={$errorText}>{errors.email.message}</Text>}
      </View>

      <View style={$inputField}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              secureTextEntry={isAuthPasswordHidden}
              labelTx="loginScreen.passwordFieldLabel"
              placeholder="Password"
              onSubmitEditing={handleSubmit(onSubmit)}
              status={errors.password ? "error" : undefined}
              onChangeText={onChange}
              onBlur={onBlur}
              RightAccessory={PasswordRightAccessory}
            />
          )}
          name="password"
        />
        {errors.password && <Text style={$errorText}>{errors.password.message}</Text>}
      </View>
      {loginError && (
        <Text style={$errorText}>
          {_props?.route?.params?.mode === LoginMode.login
            ? LOGIN_ERROR_MESSAGE
            : REGISTER_ERROR_MESSAGE}
        </Text>
      )}

      <Button
        testID="login-button"
        style={$tapButton}
        preset="reversed"
        onPress={handleSubmit(onSubmit)}
      >
        {isRegister ? "Register" : "Login"}
      </Button>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $inputField: ViewStyle = {
  marginBottom: spacing.md,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $tapButton: ViewStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: spacing.md,
}

const $errorText: TextStyle = {
  color: colors.error,
}
