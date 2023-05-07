import { FC } from 'react'
import { SafeAreaView, StatusBar } from 'react-native'

import { useTheme } from '@app/shared/theme'

export const Application: FC = () => {
  const { colorScheme } = useTheme()
  const isDarkColorScheme = colorScheme === 'dark'

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkColorScheme ? 'light-content' : 'dark-content'} />
    </SafeAreaView>
  )
}
