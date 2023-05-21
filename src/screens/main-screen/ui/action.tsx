import { useUnit } from 'effector-react'
import { FC, useEffect } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated'
import { match } from 'ts-pattern'

import { $$timer, State } from '@app/entities/timer'
import { ActionButton, SlideButton } from '@app/shared/ui-kit'

export const Action: FC = () => {
  const [state, onStartFocusPress, onGiveUpPress, onStartRestPress, onSkipRestPress] = useUnit([
    $$timer.$state,
    $$timer.startFocusPressed,
    $$timer.giveUpPressed,
    $$timer.startFocusPressed,
    $$timer.skipRestPressed,
  ])

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
      {match(state)
        .with(State.INITIAL, () => <ActionButton onPress={onStartFocusPress}>Start</ActionButton>)
        .with(State.FOCUSED_RUN, () => (
          <SlideButton onAction={onGiveUpPress}>Slide to give up</SlideButton>
        ))
        .with(State.FOCUSED_END, () => (
          <ActionButton onPress={onStartRestPress}>Have a rest</ActionButton>
        ))
        .with(State.SHORT_REST_RUN, State.LONG_REST_RUN, () => (
          <SlideButton onAction={onSkipRestPress}>Slide to skip</SlideButton>
        ))
        .with(State.SHORT_REST_END, State.SHORT_REST_END, () => (
          <ActionButton onPress={onStartRestPress}>Stay focused</ActionButton>
        ))
        .run()}
    </Animated.View>
  )
}
