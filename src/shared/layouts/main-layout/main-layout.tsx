import { FC, ReactNode } from 'react'
import { SafeAreaView, StatusBar, View } from 'react-native'

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

      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.color.surface0,
  },

  content: {
    flex: 1,
    padding: 24,
  },
}))
