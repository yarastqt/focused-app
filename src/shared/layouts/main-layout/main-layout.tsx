import { FC, ReactNode } from 'react'
import { SafeAreaView, StatusBar } from 'react-native'

import { createStyles, useTheme } from '@app/shared/theme'

export interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
  const { children } = props

  const { colorScheme } = useTheme()
  const styles = useStyles()

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      {children}
    </SafeAreaView>
  )
}

const useStyles = createStyles(() => ({
  root: {
    flex: 1,
  },
}))
