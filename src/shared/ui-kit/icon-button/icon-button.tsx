import { FC, ReactNode, useCallback } from 'react'
import { Pressable } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

export interface IconButtonProps {
  children: ReactNode
  onPress: () => void
}

export const IconButton: FC<IconButtonProps> = (props) => {
  const { children, onPress } = props

  const scale = useSharedValue(1)

  const onPressIn = useCallback(() => {
    scale.value = withSpring(0.9)
  }, [])

  const onPressOut = useCallback(() => {
    scale.value = withSpring(1)
  }, [])

  const rootStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={rootStyles}>{children}</Animated.View>
    </Pressable>
  )
}
