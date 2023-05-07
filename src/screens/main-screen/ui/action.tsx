import { FC, useEffect } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated'

import { ActionButton } from '@app/shared/ui-kit'

export const Action: FC = () => {
  const transform = useSharedValue(100)
  const opacity = useSharedValue(0)

  const rootStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: transform.value }],
  }))

  useEffect(() => {
    opacity.value = withDelay(150, withSpring(1))
    transform.value = withDelay(150, withSpring(0))
  }, [])

  return (
    <Animated.View style={rootStyles}>
      <ActionButton onPress={() => null}>Start</ActionButton>
    </Animated.View>
  )
}
