import { createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/rn/async'

interface TimerChangedPayload {
  timer: 'cycles' | 'focus' | 'longRest' | 'shortRest'
  value: number
}

export const $$timer = (() => {
  const timerChanged = createEvent<TimerChangedPayload>()

  const $timers = createStore({
    cycles: 5,
    focus: 20,
    longRest: 10,
    shortRest: 5,
  })

  const $timer = createStore(10000)

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

  return {
    $timer,
    $timers,
    timerChanged,
  }
})()
