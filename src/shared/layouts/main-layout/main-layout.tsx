import { FC, ReactNode } from 'react'
import { SafeAreaView, StatusBar } from 'react-native'

import { useTheme } from '@app/shared/theme'

export interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
  const { children } = props

  const { colorScheme } = useTheme()

  return (
    <SafeAreaView>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      {children}
    </SafeAreaView>
  )
}