import { FC } from 'react'
import { View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

import { MainLayout } from '@app/shared/layouts/main-layout'
import { createStyles } from '@app/shared/theme'
import { ActionButton } from '@app/shared/ui-kit'

import { Header } from './ui/header'

export const MainScreen: FC = () => {
  const styles = useStyles()

  return (
    <MainLayout>
      <View style={styles.root}>
        <Header />

        <Animated.View entering={FadeInDown.springify()}>
          <ActionButton>Start</ActionButton>
        </Animated.View>
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
