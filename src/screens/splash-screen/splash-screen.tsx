import { FC, useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
} from 'react-native-reanimated'

import { MainLayout } from '@app/shared/layouts/main-layout'
import { createStyles } from '@app/shared/theme'

import { Logo } from './ui/logo'

const _SplashScreen: FC = () => {
  const styles = useStyles()

  const opacity = useSharedValue(1)
  const scale = useSharedValue(0)
  const rotate = useSharedValue(0)

  const logoStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
  }))

  useEffect(() => {
    scale.value = withSpring(1, {}, () => {
      rotate.value = withSpring(360, {}, () => {})
      scale.value = withDelay(500, withSequence(withSpring(0.5), withSpring(20)))
      opacity.value = withDelay(1250, withSpring(0))
    })
  }, [])

  return (
    <MainLayout>
      <View style={styles.root}>
        <Animated.View style={logoStyles}>
          <Logo />
        </Animated.View>
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
