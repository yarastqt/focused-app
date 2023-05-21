import { FC } from 'react'
import { Text, View } from 'react-native'

import { createStyles } from '@app/shared/theme'

import { version } from '../../../../package.json'

export const Footer: FC = () => {
  const styles = useStyles()

  return (
    <View style={styles.root}>
      <Text style={styles.version}>Stay Focused v{version}</Text>
    </View>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    marginTop: 'auto',
    alignItems: 'center',
  },

  version: {
    ...theme.typography.textS,
    color: theme.color.textSecondary,
  },
}))
