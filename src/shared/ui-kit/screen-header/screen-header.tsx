import { FC, ReactNode } from 'react'
import { View } from 'react-native'
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated'

import { ArrowLeft } from '@app/shared/icons'
import { useNavigation } from '@app/shared/navigation'
import { createStyles } from '@app/shared/theme'
import { IconButton } from '@app/shared/ui-kit/icon-button'

export interface ScreenHeaderProps {
  children: ReactNode
}

export const ScreenHeader: FC<ScreenHeaderProps> = (props) => {
  const { children } = props

  const navigation = useNavigation()
  const styles = useStyles()

  return (
    <View style={styles.root}>
      <Animated.View entering={FadeInRight.delay(150).springify()}>
        <IconButton onPress={() => navigation.goBack()}>
          <ArrowLeft />
        </IconButton>
      </Animated.View>

      <Animated.Text entering={FadeIn.delay(300).springify()} style={styles.title}>
        {children}
      </Animated.Text>
    </View>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    marginHorizontal: -8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    ...theme.typography.textXL,
    flex: 1,
    textAlign: 'center',
    marginRight: 32,
  },
}))
