import Animated, { FadeInUp } from 'react-native-reanimated'

import { Logo } from './logo'

export const Header = () => {
  return (
    <Animated.View entering={FadeInUp.springify()}>
      <Logo />
    </Animated.View>
  )
}
