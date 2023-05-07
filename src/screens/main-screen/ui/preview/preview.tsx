import Lottie from 'lottie-react-native'
import { FC } from 'react'
import Animated, { ZoomIn } from 'react-native-reanimated'

import { createStyles, useTheme } from '@app/shared/theme'

export const Preview: FC = () => {
  const theme = useTheme()
  const styles = useStyles()

  const source =
    theme.colorScheme === 'light' ? require('./light-preview.json') : require('./dark-preview.json')

  return (
    <Animated.View entering={ZoomIn.springify()}>
      <Lottie autoPlay loop source={source} style={styles.root} />
    </Animated.View>
  )
}

const useStyles = createStyles(() => ({
  root: {
    width: '100%',
  },
}))
