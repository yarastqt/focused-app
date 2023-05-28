import { FC, ReactNode, useCallback, useState } from 'react'
import { LayoutChangeEvent, View } from 'react-native'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { trigger } from 'react-native-haptic-feedback'
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import { ArrowRight } from '@app/shared/icons'
import { createStyles, useTheme } from '@app/shared/theme'

export interface SlideButtonProps {
  children: ReactNode
  onAction: () => void
}

type GestureContext = {
  isFinished: boolean
  startX: number
}

export const SlideButton: FC<SlideButtonProps> = (props) => {
  const { children, onAction } = props

  const theme = useTheme()
  const styles = useStyles()

  const [rootWidth, setRootWidth] = useState(0)
  const [thumbWidth, setThumbWidth] = useState(0)

  const pressed = useSharedValue(0)
  const position = useSharedValue(0)
  const progress = useSharedValue(0)

  const onActionHandler = useCallback(() => {
    trigger('impactLight')
    onAction()
  }, [onAction])

  const onRootLayoutHandler = useCallback((event: LayoutChangeEvent) => {
    setRootWidth(event.nativeEvent.layout.width)
  }, [])

  const onThumbLayoutHandler = useCallback((event: LayoutChangeEvent) => {
    setThumbWidth(event.nativeEvent.layout.width)
  }, [])

  const onGestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, GestureContext>(
    {
      onStart: (_, context) => {
        context.startX = position.value
        pressed.value = withSpring(1)
      },
      onActive: (event, context) => {
        const nextPosition = Math.min(
          Math.max(context.startX + event.translationX, 0),
          rootWidth - thumbWidth,
        )

        position.value = nextPosition
        progress.value = nextPosition + thumbWidth
      },
      onEnd: (event, context) => {
        if (event.translationX < rootWidth - thumbWidth) {
          position.value = withSpring(0, {
            stiffness: 180,
            damping: 25,
            mass: 1,
          })
          progress.value = withSpring(0, {
            stiffness: 180,
            damping: 25,
            mass: 1,
          })
          context.isFinished = false
        } else {
          context.isFinished = true
        }
      },
      onFinish: (_, context) => {
        if (context.isFinished) {
          runOnJS(onActionHandler)()
        } else {
          pressed.value = withSpring(0)
        }
      },
    },
  )

  const thumbStyles = useAnimatedStyle(() => ({
    left: interpolate(pressed.value, [0, 1], [4, 0]),
    borderRadius: interpolate(pressed.value, [0, 1], [16, 20]),
    width: interpolate(pressed.value, [0, 1], [48, 56]),
    height: interpolate(pressed.value, [0, 1], [48, 56]),
    transform: [{ translateX: position.value }],
  }))

  const progressStyles = useAnimatedStyle(() => ({
    opacity: pressed.value,
    width: progress.value,
  }))

  const textStyles = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [rootWidth / 2, rootWidth - thumbWidth],
      [theme.color.textSecondary, theme.color.brandTextOn],
    ),
  }))

  return (
    <View onLayout={onRootLayoutHandler} style={styles.root}>
      <PanGestureHandler onGestureEvent={onGestureHandler}>
        <Animated.View onLayout={onThumbLayoutHandler} style={[styles.thumb, thumbStyles]}>
          <ArrowRight color={theme.color.brandTextOn} size={24} />
        </Animated.View>
      </PanGestureHandler>

      <Animated.View style={[styles.progress, progressStyles]} />

      <Animated.Text style={[styles.text, textStyles]}>{children}</Animated.Text>
    </View>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.color.surfaceSubmerged,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    overflow: 'hidden',
  },

  thumb: {
    alignItems: 'center',
    backgroundColor: theme.color.brandBgBase,
    height: 44,
    justifyContent: 'center',
    position: 'absolute',
    width: 44,
    zIndex: 2,
  },

  progress: {
    backgroundColor: theme.color.brandBgBase,
    borderRadius: 20,
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 0,
    width: 0,
  },

  text: {
    ...theme.typography.textL,
    position: 'absolute',
    zIndex: 1,
  },
}))
