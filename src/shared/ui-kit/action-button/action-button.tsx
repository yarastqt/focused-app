import { FC, ReactNode, useCallback } from 'react'
import { Pressable, Text } from 'react-native'
import { trigger } from 'react-native-haptic-feedback'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import { createStyles, useTheme } from '@app/shared/theme'

export interface ActionButtonProps {
  children: ReactNode
  onPress: () => void
}

export const ActionButton: FC<ActionButtonProps> = (props) => {
  const { children, onPress } = props

  const theme = useTheme()
  const styles = useStyles()

  const scale = useSharedValue(1)
  const backgroundColor = useSharedValue(0)

  const onPressIn = useCallback(() => {
    scale.value = withSpring(0.975)
    backgroundColor.value = withSpring(1)
  }, [])

  const onPressOut = useCallback(() => {
    scale.value = withSpring(1)
    backgroundColor.value = withSpring(0)
  }, [])

  const rootStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: interpolateColor(
      backgroundColor.value,
      [0, 1],
      [theme.color.brandBgBase, theme.color.brandBgPressed],
    ),
  }))

  const onPressHandler = useCallback(() => {
    trigger('impactLight')
    onPress()
  }, [onPress])

  return (
    <Pressable onPress={onPressHandler} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[styles.root, rootStyles]}>
        <Text style={styles.text}>{children}</Text>
      </Animated.View>
    </Pressable>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    height: 56,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  text: {
    ...theme.typography.textXL,
    color: theme.color.brandTextOn,
  },
}))
