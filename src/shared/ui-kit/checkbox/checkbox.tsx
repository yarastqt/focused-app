import { FC, ReactNode, useCallback, useEffect } from 'react'
import { Pressable, Text } from 'react-native'
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated'
import { Path, Svg } from 'react-native-svg'

import { createStyles, useTheme } from '@app/shared/theme'

const AnimatedPath = Animated.createAnimatedComponent(Path)

export interface CheckboxProps {
  children: ReactNode
  isSelected: boolean
  onChange: (isSelected: boolean) => void
}

export const Checkbox: FC<CheckboxProps> = (props) => {
  const { children, isSelected, onChange } = props

  const theme = useTheme()
  const styles = useStyles()

  const pressed = useSharedValue(0)
  const selected = useSharedValue(0)
  const checked = useSharedValue(0)

  const onPressIn = useCallback(() => {
    pressed.value = withSpring(1)
  }, [])

  const onPressOut = useCallback(() => {
    pressed.value = withSpring(0)
  }, [])

  const boxStyles = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      checked.value,
      [0, 1],
      [theme.color.lineNormal, theme.color.transparent],
    ),
    backgroundColor: interpolateColor(
      pressed.value,
      [0, 1],
      [theme.color.transparent, theme.color.surfaceSubmerged],
    ),
  }))

  const fillStyles = useAnimatedStyle(() => ({
    opacity: selected.value,
    transform: [{ scale: selected.value }],
    backgroundColor: interpolateColor(
      pressed.value,
      [0, 1],
      [theme.color.brandBgBase, theme.color.brandBgPressed],
    ),
  }))

  // @ts-expect-error
  const pathStyles = useAnimatedStyle(() => ({
    strokeDashoffset: interpolate(checked.value, [0, 1], [14, 0]),
  }))

  const onPressHandler = useCallback(() => {
    onChange(!isSelected)
  }, [onChange, isSelected])

  useEffect(() => {
    selected.value = withSpring(isSelected ? 1 : 0)
    checked.value = isSelected ? withDelay(150, withSpring(1)) : 0
  }, [isSelected])

  return (
    <Pressable
      onPress={onPressHandler}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.root}
    >
      <Animated.View style={[styles.box, boxStyles]}>
        <Svg fill="none" height="24" style={styles.check} viewBox="0 0 24 24" width="24">
          <AnimatedPath
            style={pathStyles}
            d="M8 12.72L10.5143 15.6L16.8 8.40002"
            stroke={theme.color.brandTextOn}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={14}
          />
        </Svg>

        <Animated.View style={[styles.fill, fillStyles]} />
      </Animated.View>

      <Text style={styles.label}>{children}</Text>
    </Pressable>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    height: 40,
  },

  box: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    height: 24,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 24,
  },

  fill: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 8,
  },

  check: {
    position: 'absolute',
    zIndex: 1,
  },

  label: {
    ...theme.typography.textM,
    color: theme.color.textPrimary,
  },
}))
