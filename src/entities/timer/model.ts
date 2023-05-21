import { attach, createEffect, createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/rn/async'
import BackgroundTimer, { IntervalId } from 'react-native-background-timer'
import { match } from 'ts-pattern'

interface TimerChangedPayload {
  timer: 'cycles' | 'focus' | 'longRest' | 'shortRest'
  value: number
}

export enum State {
  INITIAL = 'INITIAL',
  FOCUSED_RUN = 'FOCUSED_RUN',
  FOCUSED_END = 'FOCUSED_END',
  SHORT_REST_RUN = 'SHORT_REST_RUN',
  SHORT_REST_END = 'SHORT_REST_END',
  LONG_REST_RUN = 'LONG_REST_RUN',
  LONG_REST_END = 'LONG_REST_END',
}

const ONE_MINUTE = 60000

export const $$timer = (() => {
  const timerChanged = createEvent<TimerChangedPayload>()
  const startFocusPressed = createEvent()
  const startRestPressed = createEvent()
  const giveUpPressed = createEvent()
  const skipRestPressed = createEvent()

  const timerUpdated = createEvent<number>()
  const timerFinished = createEvent()
  const timerRefSetted = createEvent<IntervalId>()

  const $state = createStore(State.INITIAL)

  const $timers = createStore({
    cycles: 5,
    focus: 20,
    longRest: 10,
    shortRest: 5,
  })

  const $timer = createStore(0)
  const $timerRef = createStore<IntervalId>(0)

  const startTimerFx = createEffect(() => {
    const timerRef = BackgroundTimer.setInterval(() => {
      const timerValue = $timer.getState()

      if (timerValue > 0) {
        // TODO: Find better solution for run loop.
        timerUpdated(timerValue - 1000)
      } else {
        timerFinished()
      }
    }, 1000)

    timerRefSetted(timerRef)
  })

  const stopTimerFx = attach({
    source: $timerRef,
    effect: (timerRef) => {
      BackgroundTimer.clearInterval(timerRef)
    },
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
    clock: timerFinished,
    target: stopTimerFx,
  })

  sample({
    clock: timerFinished,
    source: $state,
    fn: (state) =>
      match(state)
        .with(State.FOCUSED_RUN, () => State.FOCUSED_END)
        .with(State.LONG_REST_RUN, () => State.LONG_REST_END)
        .with(State.SHORT_REST_RUN, () => State.SHORT_REST_END)
        .run(),
    target: $state,
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
    clock: timerRefSetted,
    target: $timerRef,
  })

  sample({
    clock: startFocusPressed,
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
    giveUpPressed,
    skipRestPressed,
    startFocusPressed,
    startRestPressed,
    timerChanged,
  }
})()
