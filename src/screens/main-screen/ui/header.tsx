import { View } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'

import { Cup, Settings } from '@app/shared/icons'
import { createStyles } from '@app/shared/theme'
import { IconButton } from '@app/shared/ui-kit'

import { Logo } from './logo'

export const Header = () => {
  const styles = useStyles()

  return (
    <Animated.View entering={FadeInUp.springify()} style={styles.root}>
      <Logo />

      <View style={styles.actions}>
        <IconButton onPress={() => null}>
          <Cup />
        </IconButton>

        <IconButton onPress={() => null}>
          <Settings />
        </IconButton>
      </View>
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
