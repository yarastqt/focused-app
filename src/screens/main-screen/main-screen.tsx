import { FC } from 'react'
import { Text, View } from 'react-native'

import { MainLayout } from '@app/shared/layouts/main-layout'
import { createStyles } from '@app/shared/theme'

export const MainScreen: FC = () => {
  const styles = useStyles()

  return (
    <MainLayout>
      <View style={styles.root}>
        <Text>Main screen</Text>
      </View>
    </MainLayout>
  )
}

const useStyles = createStyles(() => ({
  root: {
    flex: 1,
  },
}))
