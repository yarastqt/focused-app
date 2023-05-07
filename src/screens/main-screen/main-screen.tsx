import { FC } from 'react'
import { Text, View } from 'react-native'
import Animated, { SlideInDown, SlideInUp } from 'react-native-reanimated'

import { MainLayout } from '@app/shared/layouts/main-layout'
import { createStyles } from '@app/shared/theme'
import { ActionButton } from '@app/shared/ui-kit'

export const MainScreen: FC = () => {
  const styles = useStyles()

  return (
    <MainLayout>
      <View style={styles.root}>
        <Animated.View entering={SlideInUp.springify()}>
          <Text style={{ height: 80 }}>Main screen</Text>
        </Animated.View>

        <Animated.View entering={SlideInDown.springify()}>
          <ActionButton>Button</ActionButton>
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
