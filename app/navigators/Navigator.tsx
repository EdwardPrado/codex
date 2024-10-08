import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { Book, Home, Search, Swords } from "@tamagui/lucide-icons"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { translate } from "../i18n"
import {
  DemoDebugScreen,
  HealthTrackerScreen,
  CardSearchScreen,
  DeckScreen,
  HomeScreen,
} from "../screens"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

export type TabParamList = {
  DemoDebug: undefined
  HealthTracker: undefined
  Search: undefined
  Decklist: undefined
  Home: undefined
  ViewDeck: {
    deck: {
      id: string
      created_at: string
      name: string
      formats: {
        id: string
        name: string
        abbreviation: string
      }
      art_crops: {
        id: string
        crop_url: string
        banner_url: string
      }
    }
  }
  DeckList: {
    id: string
  }
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<TabParamList>()

/**
 * This is the main navigator for the demo screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `DemoNavigator`.
 */
export function Navigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => <Home color={focused ? colors.tint : undefined} size={30} />,
        }}
      />

      <Tab.Screen
        name="HealthTracker"
        component={HealthTrackerScreen}
        options={{
          tabBarLabel: "Combat",
          tabBarIcon: ({ focused }) => (
            <Swords color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={CardSearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ focused }) => (
            <Search size={30} color={focused ? colors.tint : undefined} />
          ),
        }}
      />

      <Tab.Group>
        <Tab.Screen
          name="Decklist"
          component={DeckScreen}
          options={{
            tabBarLabel: "Decks",
            tabBarIcon: ({ focused }) => (
              <Book size={30} color={focused ? colors.tint : undefined} />
            ),
          }}
        />
      </Tab.Group>

      {process.env.IS_DEV_ENVIRONMENT && (
        <Tab.Screen
          name="DemoDebug"
          component={DemoDebugScreen}
          options={{
            tabBarLabel: translate("navigator.debugTab"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="debug" color={focused ? colors.tint : undefined} size={30} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
}
