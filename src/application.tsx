import { FC } from 'react'

import { MainScreen } from '@app/screens/main-screen'
import { SplashScreen } from '@app/screens/splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()
const DEFAULT_SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerShown: false,
}

export const Application: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SplashScreen.path}>
        <Stack.Screen
          component={SplashScreen}
          name={SplashScreen.path}
          options={DEFAULT_SCREEN_OPTIONS}
        />

        <Stack.Screen
          component={MainScreen}
          name={MainScreen.path}
          options={DEFAULT_SCREEN_OPTIONS}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
