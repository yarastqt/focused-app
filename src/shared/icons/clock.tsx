import { FC } from 'react'
import { Circle, Path, Svg } from 'react-native-svg'

import { useTheme } from '@app/shared/theme'

export const Clock: FC = () => {
  const theme = useTheme()

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="8" stroke={theme.color.textSecondary} strokeWidth="1.5" />
      <Path
        d="M12 8.80005V12L14 14"
        stroke={theme.color.textPrimary}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
