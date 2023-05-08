import { FC } from 'react'
import { Text, View } from 'react-native'

import { MainLayout } from '@app/shared/layouts/main-layout'
import { ScreenHeader } from '@app/shared/ui-kit'

export const StatisticsScreen: FC = () => {
  return (
    <MainLayout>
      <View>
        <ScreenHeader>Statistics</ScreenHeader>

        <Text>Statistics screen</Text>
      </View>
    </MainLayout>
  )
}
