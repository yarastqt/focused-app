import { FC } from 'react'

import { MainScreen } from '@app/screens/main-screen'
import { SplashScreen } from '@app/screens/splash-screen'
import { paths } from '@app/shared/paths'
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
      <Stack.Navigator initialRouteName={paths.splash}>
        <Stack.Screen
          component={SplashScreen}
          name={paths.splash}
          options={DEFAULT_SCREEN_OPTIONS}
        />

        <Stack.Screen
          component={MainScreen}
          name={paths.main}
          options={{ ...DEFAULT_SCREEN_OPTIONS, animation: 'none' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
