import { FC } from 'react'
import { Path, Svg } from 'react-native-svg'

import { useTheme } from '@app/shared/theme'

export interface ArrowRightProps {
  color?: string
  size?: number
}

export const ArrowRight: FC<ArrowRightProps> = (props) => {
  const { color, size = 24 } = props

  const theme = useTheme()

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8.91003 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91003 4.08"
        stroke={color ?? theme.color.textPrimary}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
