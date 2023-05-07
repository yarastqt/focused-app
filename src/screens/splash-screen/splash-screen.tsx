import { FC } from 'react'
import { View } from 'react-native'

import { MainLayout } from '@app/shared/layouts/main-layout'
import { createStyles } from '@app/shared/theme'

import { Logo } from './ui/logo'

const _SplashScreen: FC = () => {
  const styles = useStyles()

  return (
    <MainLayout>
      <View style={styles.root}>
        <Logo />
      </View>
    </MainLayout>
  )
}

const useStyles = createStyles(() => ({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export const SplashScreen = Object.assign(_SplashScreen, {
  path: 'splash',
})
