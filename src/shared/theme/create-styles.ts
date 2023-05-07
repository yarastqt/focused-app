import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import type { Theme } from './types'

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }

export function createStyles<T extends NamedStyles<T> | NamedStyles<any>>(
  creator: (theme: Theme) => T | NamedStyles<T>,
) {
  return (theme: Theme): T => {
    return StyleSheet.create(creator(theme))
  }
}
