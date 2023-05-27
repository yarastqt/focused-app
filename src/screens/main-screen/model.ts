import { sample } from 'effector'
import { match } from 'ts-pattern'

import { $$timer, State } from '@app/entities/timer'
import { $$notification } from '@app/shared/notification'

sample({
  clock: $$timer.timerFinished,
  source: $$timer.$state,
  filter: (state) =>
    state === State.FOCUSED_END || state === State.SHORT_REST_END || state === State.LONG_REST_RUN,
  fn: (state) =>
    match(state)
      .with(State.FOCUSED_END, () => ({ title: 'Break time is come' }))
      .with(State.SHORT_REST_END, State.LONG_REST_END, () => ({
        title: 'Break time is over',
        body: 'Start focusing again',
      }))
      .run(),
  target: $$notification.sendNotification,
})
