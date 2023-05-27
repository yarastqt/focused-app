import { createEffect, createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/rn/async'

import notifee, { Notification } from '@notifee/react-native'

notifee.onBackgroundEvent(() => {
  return Promise.resolve()
})

export const $$notification = (() => {
  const sendNotification = createEvent<Notification>()
  const enableChanged = createEvent<boolean>()

  const $isEnabled = createStore(false)

  const requestPermissionFx = createEffect(() => {
    return notifee.requestPermission()
  })

  const sendNotificationFx = createEffect((payload: Notification) => {
    return notifee.displayNotification(payload)
  })

  persist({ store: $isEnabled, key: 'notification-is-enabled' })

  sample({
    clock: enableChanged,
    filter: (isEnabled) => isEnabled,
    target: requestPermissionFx,
  })

  sample({
    clock: requestPermissionFx.done,
    fn: () => true,
    target: $isEnabled,
  })

  sample({
    clock: enableChanged,
    filter: (isEnabled) => !isEnabled,
    target: $isEnabled,
  })

  sample({
    clock: sendNotification,
    source: $isEnabled,
    filter: (isEnabled) => isEnabled,
    fn: (_, payload) => payload,
    target: sendNotificationFx,
  })

  return {
    $isEnabled,
    enableChanged,
    sendNotification,
  }
})()
