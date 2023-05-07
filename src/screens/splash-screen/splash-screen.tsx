import { FC } from 'react'
import { Text, View } from 'react-native'

import { MainLayout } from '@app/shared/layouts/main-layout'

const _SplashScreen: FC = () => {
  return (
    <MainLayout>
      <View>
        <Text>Splash screen</Text>
      </View>
    </MainLayout>
  )
}

export const SplashScreen = Object.assign(_SplashScreen, {
  path: 'splash',
})
