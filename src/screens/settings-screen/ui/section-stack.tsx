import { Children, FC, ReactNode } from 'react'
import { View } from 'react-native'
import Animated, { FadeInRight } from 'react-native-reanimated'

import { createStyles } from '@app/shared/theme'

export interface SectionStackProps {
  children: ReactNode
}

export const SectionStack: FC<SectionStackProps> = (props) => {
  const { children } = props

  const styles = useStyles()

  return (
    <View style={styles.root}>
      {Children.map(children, (child, index) => (
        <Animated.View entering={FadeInRight.delay(250 * index + 1).springify()}>
          {child}
        </Animated.View>
      ))}
    </View>
  )
}

const useStyles = createStyles(() => ({
  root: {
    gap: 24,
  },
}))
