import { useMemo } from 'react'

import type { Theme } from './types'
import { useTheme } from './use-theme'

export function useStyles<T>(creator: (theme: Theme) => T) {
  const theme = useTheme()
  const styles = useMemo(() => creator(theme), [theme])

  return styles
}
