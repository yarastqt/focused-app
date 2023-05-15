import { FC, useCallback, useEffect, useState } from 'react'
import { LayoutChangeEvent, Text, View } from 'react-native'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { createStyles } from '@app/shared/theme'

export interface SliderProps {
  label: string
  max?: number
  min?: number
  onChange: (value: number) => void
  step?: number
  value: number
}

type GestureContext = {
  startX: number
}

export const Slider: FC<SliderProps> = (props) => {
  const { label, max = 100, min = 1, onChange, step = 1, value } = props

  const styles = useStyles()

  const [rootWidth, setRootWidth] = useState(0)
  const [thumbWidth, setThumbWidth] = useState(0)
  const position = useSharedValue(0)
  const progress = useSharedValue(0)

  const onRootLayoutHandler = useCallback((event: LayoutChangeEvent) => {
    setRootWidth(event.nativeEvent.layout.width)
  }, [])

  const onThumbLayoutHandler = useCallback((event: LayoutChangeEvent) => {
    setThumbWidth(event.nativeEvent.layout.width)
  }, [])

  const updateValuePosition = (value: number) => {
    const valuePosition = ((rootWidth - thumbWidth) / (max - min)) * (value - min)

    position.value = withTiming(valuePosition, {
      duration: 100,
      easing: Easing.linear,
    })
    progress.value = withTiming(valuePosition + thumbWidth / 2, {
      duration: 100,
      easing: Easing.linear,
    })
  }

  const onGestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, GestureContext>(
    {
      onStart: (_, context) => {
        context.startX = position.value
      },
      onActive: (event, context) => {
        const nextPosition = Math.min(Math.max(context.startX + event.translationX, 0), rootWidth)
        const nextValue = Math.round((min + (nextPosition / rootWidth) * (max - min)) / step) * step

        runOnJS(onChange)(nextValue)
      },
    },
  )

  const thumbStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }))

  const progressStyles = useAnimatedStyle(() => ({
    width: progress.value,
  }))

  useEffect(() => {
    updateValuePosition(value)
  }, [value, rootWidth, thumbWidth])

  return (
    <View style={styles.root} onLayout={onRootLayoutHandler}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.group}>
        <PanGestureHandler onGestureEvent={onGestureHandler}>
          <Animated.View onLayout={onThumbLayoutHandler} style={[styles.thumb, thumbStyles]}>
            <View style={styles.thumbOverlay} />
          </Animated.View>
        </PanGestureHandler>

        <View style={styles.track}>
          <Animated.View style={[styles.progress, progressStyles]} />
        </View>
      </View>
    </View>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    gap: 8,
  },

  label: {
    ...theme.typography.textM,
    color: theme.color.textPrimary,
  },

  group: {
    height: 40,
    justifyContent: 'center',
  },

  thumbOverlay: {
    height: 40,
    position: 'absolute',
    width: 40,
    zIndex: 1,
  },

  thumb: {
    ...theme.shadow.elevated50,
    alignItems: 'center',
    backgroundColor: theme.color.brandBgBase,
    borderRadius: 12,
    height: 24,
    justifyContent: 'center',
    position: 'absolute',
    width: 24,
    zIndex: 1,
  },

  progress: {
    backgroundColor: theme.color.brandBgBase,
    borderRadius: 2,
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 0,
  },

  track: {
    backgroundColor: theme.color.lineNormal,
    borderRadius: 2,
    height: 4,
  },
}))
