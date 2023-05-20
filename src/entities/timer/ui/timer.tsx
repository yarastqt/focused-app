import { FC } from 'react'
import { View } from 'react-native'
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated'

import { createStyles } from '@app/shared/theme'

import { getChunkedTime } from '../lib/chunked-time'

export interface TimerProps {
  children: number
}

export const Timer: FC<TimerProps> = (props) => {
  const { children } = props

  const styles = useStyles()
  const chunks = getChunkedTime(children)

  return (
    <View style={styles.root}>
      {chunks.map((chunk, index) => (
        <Animated.Text
          key={index + chunk}
          entering={FadeInUp}
          exiting={FadeOutDown}
          style={styles.text}
        >
          {chunk}
        </Animated.Text>
      ))}
    </View>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  text: {
    ...theme.typography.displayL,
    textAlign: 'center',
    color: theme.color.textPrimary,
    fontVariant: ['tabular-nums'],
  },
}))
