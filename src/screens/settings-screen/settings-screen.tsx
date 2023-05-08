import { FC } from 'react'
import { Text, View } from 'react-native'

import { MainLayout } from '@app/shared/layouts/main-layout'
import { ScreenHeader } from '@app/shared/ui-kit'

export const SettingsScreen: FC = () => {
  return (
    <MainLayout>
      <View>
        <ScreenHeader>Settings</ScreenHeader>

        <Text>Settings screen</Text>
      </View>
    </MainLayout>
  )
}
