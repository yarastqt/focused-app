import { FC } from 'react'
import { Path, Svg } from 'react-native-svg'

import { useTheme } from '@app/shared/theme'

export const Light: FC = () => {
  const theme = useTheme()

  return (
    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none">
      <Path
        d="M6 10.5C6 7.18629 8.68629 4.5 12 4.5C15.3137 4.5 18 7.18629 18 10.5C18 12.2765 17.2279 13.8727 16.001 14.9713C15.1044 15.7741 14.6561 16.1756 14.5353 16.3246C14.1459 16.8052 14.1287 16.8436 14.0305 17.4544C14 17.6438 14 17.9292 14 18.5C14 19.2477 14 19.6215 13.8392 19.9C13.7339 20.0824 13.5824 20.2339 13.4 20.3392C13.1215 20.5 12.7477 20.5 12 20.5C11.2523 20.5 10.8785 20.5 10.6 20.3392C10.4176 20.2339 10.2661 20.0824 10.1608 19.9C10 19.6215 10 19.2477 10 18.5C10 17.9292 10 17.6438 9.96953 17.4544C9.87128 16.8436 9.8541 16.8052 9.46466 16.3246C9.34389 16.1756 8.89556 15.7741 7.999 14.9713C6.77208 13.8727 6 12.2765 6 10.5Z"
        stroke={theme.color.textPrimary}
        strokeWidth="1.5"
      />
      <Path opacity="0.5" d="M14 18.5H10" stroke={theme.color.textPrimary} strokeWidth="1.5" />
      <Path
        d="M12.0002 16.5V14.9M12.0002 14.9C12.5924 14.9 13.1095 14.5782 13.3862 14.1M12.0002 14.9C11.408 14.9 10.8909 14.5782 10.6143 14.1"
        stroke={theme.color.textSecondary}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  )
}
