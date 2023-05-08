import { FC } from 'react'
import { Path, Svg } from 'react-native-svg'

import { useTheme } from '@app/shared/theme'

export const Cup: FC = () => {
  const theme = useTheme()

  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <Path
        d="M16.0001 20.2667C9.8562 20.2667 8.76779 14.1435 8.57497 9.28691C8.52134 7.93598 8.49452 7.26052 9.00196 6.63556C9.50939 6.01061 10.1167 5.90814 11.3314 5.7032C12.5304 5.5009 14.0977 5.33334 16.0001 5.33334C17.9026 5.33334 19.4699 5.5009 20.6689 5.7032C21.8835 5.90814 22.4909 6.01061 22.9983 6.63556C23.5057 7.26052 23.4789 7.93598 23.4253 9.28691C23.2325 14.1435 22.1441 20.2667 16.0001 20.2667Z"
        stroke={theme.color.textPrimary}
        strokeWidth="1.5"
      />
      <Path
        opacity="0.5"
        d="M23.4667 8.53333L24.4786 8.87061C25.5346 9.22263 26.0627 9.39864 26.3647 9.81768C26.6667 10.2367 26.6667 10.7933 26.6666 11.9065L26.6666 11.9838C26.6666 12.902 26.6666 13.361 26.4456 13.7366C26.2246 14.1122 25.8233 14.3352 25.0207 14.781L21.8667 16.5333"
        stroke={theme.color.textPrimary}
        strokeWidth="1.5"
      />
      <Path
        opacity="0.5"
        d="M8.53343 8.53333L7.52157 8.87061C6.46551 9.22263 5.93748 9.39864 5.63547 9.81768C5.33345 10.2367 5.33347 10.7933 5.3335 11.9065L5.3335 11.9838C5.33352 12.902 5.33354 13.361 5.55454 13.7366C5.77554 14.1122 6.17683 14.3352 6.97941 14.781L10.1334 16.5333"
        stroke={theme.color.textPrimary}
        strokeWidth="1.5"
      />
      <Path
        opacity="0.5"
        d="M16 21.3333V23.4667"
        stroke={theme.color.textPrimary}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M19.7333 26.6667H12.2666L12.6284 24.8575C12.7282 24.3589 13.1659 24 13.6744 24H18.3255C18.8339 24 19.2717 24.3589 19.3714 24.8575L19.7333 26.6667Z"
        stroke={theme.color.textPrimary}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity="0.5"
        d="M22.4001 26.6667H9.6001"
        stroke={theme.color.textPrimary}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  )
}
