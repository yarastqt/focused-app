import { FC, useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
} from 'react-native-reanimated'

import { MainLayout } from '@app/shared/layouts/main-layout'
import { Route, useNavigation } from '@app/shared/navigation'
import { createStyles } from '@app/shared/theme'

import { Logo } from './ui/logo'

export const SplashScreen: FC = () => {
  const navigation = useNavigation()

  const styles = useStyles()

  const opacity = useSharedValue(1)
  const scale = useSharedValue(0)
  const rotate = useSharedValue(0)

  const logoStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
  }))

  const navigateToMainScreen = () => {
    navigation.navigate(Route.main)
  }

  useEffect(() => {
    scale.value = withSpring(1, {}, () => {
      rotate.value = withSpring(360, {}, () => {})
      scale.value = withDelay(500, withSequence(withSpring(0.5), withSpring(20)))
      opacity.value = withDelay(
        1250,
        withSpring(0, {}, () => {
          runOnJS(navigateToMainScreen)()
        }),
      )
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
