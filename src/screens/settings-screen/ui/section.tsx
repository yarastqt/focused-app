import { FC, ReactNode } from 'react'
import { Text, View } from 'react-native'

import { createStyles } from '@app/shared/theme'

export interface SectionProps {
  children: ReactNode
  icon: ReactNode
  title: string
}

export const Section: FC<SectionProps> = (props) => {
  const { children, icon, title } = props

  const styles = useStyles()

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>

      {children}
    </View>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    gap: 12,
  },

  header: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    ...theme.typography.textL,
    color: theme.color.textPrimary,
  },
}))
