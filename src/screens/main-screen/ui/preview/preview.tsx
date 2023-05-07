import Lottie from 'lottie-react-native'
import { FC, useEffect } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated'

import { createStyles, useTheme } from '@app/shared/theme'

export const Preview: FC = () => {
  const theme = useTheme()
  const styles = useStyles()

  const opacity = useSharedValue(0)

  const rootStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  useEffect(() => {
    opacity.value = withDelay(500, withSpring(1))
  }, [])

  const source =
    theme.colorScheme === 'light' ? require('./light-preview.json') : require('./dark-preview.json')

  return (
    <Animated.View style={rootStyles}>
      <Lottie autoPlay loop source={source} style={styles.preview} />
    </Animated.View>
  )
}

const useStyles = createStyles(() => ({
  preview: {
    width: '100%',
  },
}))
