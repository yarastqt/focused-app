import { attach, createEffect, createEvent, restore, sample } from 'effector'
import { persist } from 'effector-storage/rn/async'
import { Appearance, NativeEventSubscription } from 'react-native'

import type { ColorSchemeVariant } from './types'

export const $$theme = (() => {
  const colorSchemeChanged = createEvent<ColorSchemeVariant>()
  const appearanceListenerSetted = createEvent<NativeEventSubscription>()

  const $colorSchemeVariant = restore(colorSchemeChanged, 'light')
  const $colorScheme = $colorSchemeVariant.map((colorSchemeVariant) => {
    switch (colorSchemeVariant) {
      case 'dark':
        return 'dark'
      case 'light':
        return 'light'
      default:
        return Appearance.getColorScheme() ?? 'light'
    }
  })

  const $appearanceListener = restore(appearanceListenerSetted, null)

  const watchColorSchemeFx = createEffect(() => {
    const listener = Appearance.addChangeListener((preferences) => {
      if (preferences.colorScheme) {
        colorSchemeChanged(preferences.colorScheme)
      }
    })

    appearanceListenerSetted(listener)
  })

  const unwatchColorSchemeFx = attach({
    source: $appearanceListener,
    effect: (listener) => {
      listener?.remove()
    },
  })

  persist({ store: $colorSchemeVariant, key: 'colorSchemeVariant' })

  sample({
    clock: colorSchemeChanged,
    filter: (variant) => variant === 'system',
    target: watchColorSchemeFx,
  })

  sample({
    clock: colorSchemeChanged,
    filter: (variant) => variant !== 'system',
    target: unwatchColorSchemeFx,
  })

  return {
    $colorScheme,
    $colorSchemeVariant,
    colorSchemeChanged,
  }
})()
