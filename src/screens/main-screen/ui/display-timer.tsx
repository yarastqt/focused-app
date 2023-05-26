import { useUnit } from 'effector-react'
import { FC } from 'react'
import { View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { match } from 'ts-pattern'

import { $$timer, State, Timer } from '@app/entities/timer'
import { createStyles } from '@app/shared/theme'

export const DisplayTimer: FC = () => {
  const [state, timer] = useUnit([$$timer.$state, $$timer.$timer])
  const styles = useStyles()

  return (
    <View style={styles.root}>
      <Animated.Text
        entering={FadeIn.delay(150).springify()}
        exiting={FadeOut}
        style={styles.title}
      >
        {match(state)
          .with(State.FOCUSED_RUN, () => 'Stay focused')
          .with(State.SHORT_REST_RUN, State.LONG_REST_RUN, () => "Let's continue to have a rest")
          .otherwise(() => null)}
      </Animated.Text>

      <Timer>{timer}</Timer>
    </View>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    alignItems: 'center',
    gap: 24,
  },

  title: {
    ...theme.typography.textL,
    color: theme.color.textSecondary,
  },
}))
