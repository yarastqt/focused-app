import { createEffect, createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/rn/async'
import BackgroundTimer from 'react-native-background-timer'
import { match } from 'ts-pattern'

interface TimerChangedPayload {
  timer: 'cycles' | 'focus' | 'longRest' | 'shortRest'
  value: number
}

export enum State {
  INITIAL,
  FOCUSED_RUN,
  FOCUSED_END,
  SHORT_REST_RUN,
  SHORT_REST_END,
  LONG_REST_RUN,
  LONG_REST_END,
}

const ONE_MINUTE = 60000

export const $$timer = (() => {
  const timerChanged = createEvent<TimerChangedPayload>()
  const startPressed = createEvent()
  const giveUpPressed = createEvent()

  const timerUpdated = createEvent<number>()

  const $state = createStore(State.INITIAL)

  const $timers = createStore({
    cycles: 5,
    focus: 20,
    longRest: 10,
    shortRest: 5,
  })

  const $timer = createStore(0)

  const startTimerFx = createEffect(() => {
    BackgroundTimer.runBackgroundTimer(() => {
      // TODO: Find better solution for run loop.
      timerUpdated($timer.getState() - 1000)
    }, 1000)
  })

  const stopTimerFx = createEffect(() => {
    BackgroundTimer.stopBackgroundTimer()
  })

  persist({ store: $timers, key: 'timers' })

  sample({
    clock: timerChanged,
    source: $timers,
    fn: (timers, payload) => ({
      ...timers,
      [payload.timer]: payload.value,
    }),
    target: $timers,
  })

  sample({
    clock: $state,
    source: $timers,
    fn: (timers, state) =>
      match(state)
        .with(State.FOCUSED_RUN, () => timers.focus * ONE_MINUTE)
        .with(State.SHORT_REST_RUN, () => timers.shortRest * ONE_MINUTE)
        .with(State.LONG_REST_RUN, () => timers.longRest * ONE_MINUTE)
        .otherwise(() => 0),
    target: timerUpdated,
  })

  sample({
    clock: timerUpdated,
    target: $timer,
  })

  sample({
    clock: startPressed,
    fn: () => State.FOCUSED_RUN,
    target: [$state, startTimerFx],
  })

  sample({
    clock: giveUpPressed,
    fn: () => State.INITIAL,
    target: [$state, stopTimerFx],
  })

  return {
    $state,
    $timer,
    $timers,
    timerChanged,
    startPressed,
    giveUpPressed,
  }
})()
