import { attach, createEffect, createEvent, createStore, restore, sample } from 'effector'
import { persist } from 'effector-storage/rn/async'
import { Appearance, NativeEventSubscription } from 'react-native'

import { ColorSchemeValue, ColorSchemeVariant } from './types'

export const $$theme = (() => {
  const colorSchemeVariantChanged = createEvent<ColorSchemeVariant>()
  const colorSchemeChanged = createEvent<ColorSchemeValue>()

  const appearanceListenerSetted = createEvent<NativeEventSubscription>()

  const $colorSchemeVariant = restore(colorSchemeVariantChanged, 'light')
  const $colorScheme = restore(colorSchemeChanged, 'light')

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
    clock: $colorSchemeVariant,
    filter: (variant) => variant === 'system',
    target: watchColorSchemeFx,
  })

  sample({
    clock: $colorSchemeVariant,
    filter: (variant) => variant !== 'system',
    target: unwatchColorSchemeFx,
  })

  sample({
    clock: $colorSchemeVariant,
    fn: (colorSchemeVariant) => {
      switch (colorSchemeVariant) {
        case 'dark':
          return 'dark'
        case 'light':
          return 'light'
        default:
          return Appearance.getColorScheme() ?? 'light'
      }
    },
    target: $colorScheme,
  })

  return {
    $colorScheme,
    $colorSchemeVariant,
    colorSchemeChanged: colorSchemeVariantChanged,
  }
})()
