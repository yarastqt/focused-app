import { useUnit } from 'effector-react'
import { FC } from 'react'
import { View } from 'react-native'
import { match } from 'ts-pattern'

import { $$timer, State } from '@app/entities/timer'
import { MainLayout } from '@app/shared/layouts/main-layout'
import { createStyles } from '@app/shared/theme'

import './model'
import { Action } from './ui/action'
import { DisplayTimer } from './ui/display-timer'
import { Header } from './ui/header'
import { Preview } from './ui/preview'

export const MainScreen: FC = () => {
  const state = useUnit($$timer.$state)
  const styles = useStyles()

  const content = match(state)
    .with(State.FOCUSED_RUN, State.SHORT_REST_RUN, State.LONG_REST_RUN, () => <DisplayTimer />)
    .otherwise(() => <Preview />)

  return (
    <MainLayout>
      <View style={styles.root}>
        <Header />
        {content}
        <Action />
      </View>
    </MainLayout>
  )
}

const useStyles = createStyles(() => ({
  root: {
    flex: 1,
    justifyContent: 'space-between',
  },
}))
