import { useUnit } from 'effector-react'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'

import { $$timer, State } from '@app/entities/timer'
import { Cup, Settings } from '@app/shared/icons'
import { Route, useNavigation } from '@app/shared/navigation'
import { createStyles } from '@app/shared/theme'
import { IconButton } from '@app/shared/ui-kit'

import { Logo } from './logo'

export const Header = () => {
  const navigation = useNavigation()
  const styles = useStyles()

  const state = useUnit($$timer.$state)

  const shouldRenderActions = state === State.INITIAL

  return (
    <Animated.View entering={FadeInUp.springify()} style={styles.root}>
      <Logo />

      {shouldRenderActions && (
        <Animated.View
          entering={FadeInUp.springify()}
          exiting={FadeOutUp.springify()}
          style={styles.actions}
        >
          <IconButton onPress={() => navigation.navigate(Route.statistics)}>
            <Cup />
          </IconButton>

          <IconButton onPress={() => navigation.navigate(Route.settings)}>
            <Settings />
          </IconButton>
        </Animated.View>
      )}
    </Animated.View>
  )
}

const useStyles = createStyles(() => ({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  actions: {
    gap: 16,
    flexDirection: 'row',
  },
}))
