import { FC, ReactNode, useCallback, useEffect } from 'react'
import { Pressable } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated'

import { createStyles, useTheme } from '@app/shared/theme'

import { useSegmentPickerContext } from './context'

export interface OptionProps {
  children: ReactNode
  value: string
}

export const Option: FC<OptionProps> = (props) => {
  const { children, value } = props

  const context = useSegmentPickerContext()

  const theme = useTheme()
  const styles = useStyles()

  const color = useSharedValue(0)

  const textStyles = useAnimatedStyle(() => ({
    color: interpolateColor(
      color.value,
      [0, 1],
      [theme.color.textSecondary, theme.color.textPrimary],
    ),
  }))

  const onPressHandler = useCallback(() => {
    context.onChange(value)
  }, [context, value])

  useEffect(() => {
    color.value = withDelay(150, withSpring(context.value === value ? 1 : 0))
  }, [context, value])

  return (
    <Pressable onPress={onPressHandler} style={styles.option}>
      <Animated.Text style={[styles.text, textStyles]}>{children}</Animated.Text>
    </Pressable>
  )
}

const useStyles = createStyles((theme) => ({
  option: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    ...theme.typography.textM,
    fontWeight: '400',
  },
}))
