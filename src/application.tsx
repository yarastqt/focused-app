import { FC } from 'react'

import { MainScreen } from '@app/screens/main-screen'
import { SettingsScreen } from '@app/screens/settings-screen'
import { SplashScreen } from '@app/screens/splash-screen'
import { RootStackParamList, Route } from '@app/shared/navigation'
import { NavigationContainer } from '@react-navigation/native'
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

const RootStack = createNativeStackNavigator<RootStackParamList>()
const DEFAULT_SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerShown: false,
}

export const Application: FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={Route.splash}>
        <RootStack.Screen
          component={SplashScreen}
          name={Route.splash}
          options={DEFAULT_SCREEN_OPTIONS}
        />

        <RootStack.Screen
          component={MainScreen}
          name={Route.main}
          options={{ ...DEFAULT_SCREEN_OPTIONS, animation: 'none' }}
        />

        <RootStack.Screen
          component={SettingsScreen}
          name={Route.settings}
          options={DEFAULT_SCREEN_OPTIONS}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
