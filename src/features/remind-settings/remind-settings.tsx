import { useUnit } from 'effector-react'
import { FC } from 'react'
import { View } from 'react-native'

import { $$notification } from '@app/shared/notification'
import { Checkbox } from '@app/shared/ui-kit'

export const RemindSettings: FC = () => {
  const [isEnabledNotification, changeEnableNotification] = useUnit([
    $$notification.$isEnabled,
    $$notification.enableChanged,
  ])

  return (
    <View>
      <Checkbox isSelected={isEnabledNotification} onChange={changeEnableNotification}>
        Notification
      </Checkbox>
    </View>
  )
}
