import { FC } from 'react'
import { Path, Svg } from 'react-native-svg'

import { useTheme } from '@app/shared/theme'

export const ArrowLeft: FC = () => {
  const theme = useTheme()

  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <Path
        d="M19.1998 8.53333L12.7998 16L19.1998 23.4667"
        stroke={theme.color.textPrimary}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
