import { useUnit } from 'effector-react'
import { FC } from 'react'
import { View } from 'react-native'
import { match } from 'ts-pattern'

import { $$timer, State } from '@app/entities/timer'
import { MainLayout } from '@app/shared/layouts/main-layout'
import { createStyles } from '@app/shared/theme'

import { Action } from './ui/action'
import { DisplayTimer } from './ui/display-timer'
import { Header } from './ui/header'
import { Preview } from './ui/preview'

export const MainScreen: FC = () => {
  const state = useUnit($$timer.$state)
  const styles = useStyles()

  return (
    <MainLayout>
      <View style={styles.root}>
        <Header />

        {match(state)
          .with(State.INITIAL, () => <Preview />)
          .otherwise(() => (
            <DisplayTimer />
          ))}

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
