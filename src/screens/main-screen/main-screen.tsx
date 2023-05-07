import { FC } from 'react'
import { View } from 'react-native'

import { MainLayout } from '@app/shared/layouts/main-layout'
import { createStyles } from '@app/shared/theme'

import { Action } from './ui/action'
import { Header } from './ui/header'
import { Preview } from './ui/preview'

export const MainScreen: FC = () => {
  const styles = useStyles()

  return (
    <MainLayout>
      <View style={styles.root}>
        <Header />
        <Preview />
        <Action />
      </View>
    </MainLayout>
  )
}

const useStyles = createStyles(() => ({
  root: {
    flex: 1,
    justifyContent: 'space-between',
  },
}))
