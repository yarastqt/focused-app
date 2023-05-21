import { FC, useEffect } from 'react'
import { Text } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated'

import { createStyles } from '@app/shared/theme'

import { displayName } from '../../../../app.json'
import { version } from '../../../../package.json'

export const Footer: FC = () => {
  const styles = useStyles()

  const transform = useSharedValue(100)
  const opacity = useSharedValue(0)

  const rootStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: transform.value }],
  }))

  useEffect(() => {
    opacity.value = withDelay(
      750,
      withSpring(1, {
        stiffness: 180,
        damping: 25,
        mass: 1,
      }),
    )
    transform.value = withDelay(
      750,
      withSpring(0, {
        stiffness: 180,
        damping: 25,
        mass: 1,
      }),
    )
  }, [])

  return (
    <Animated.View style={[styles.root, rootStyles]}>
      <Text style={styles.version}>
        {displayName} v{version}
      </Text>
    </Animated.View>
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
