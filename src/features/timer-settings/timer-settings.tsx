import { useUnit } from 'effector-react'
import { FC } from 'react'
import { View } from 'react-native'

import { $$timer } from '@app/entities/timer'
import { Slider } from '@app/shared/ui-kit'

export const TimerSettings: FC = () => {
  const [timers, onChangeTimer] = useUnit([$$timer.$timers, $$timer.timerChanged])

  return (
    <View>
      <Slider
        label={`Focus duration: ${timers.focus} min`}
        min={10}
        max={60}
        value={timers.focus}
        onChange={(value) => onChangeTimer({ timer: 'focus', value })}
      />
      <Slider
        label={`Short rest duration: ${timers.shortRest} min`}
        min={5}
        max={30}
        value={timers.shortRest}
        onChange={(value) => onChangeTimer({ timer: 'shortRest', value })}
      />
      <Slider
        label={`Long duration: ${timers.longRest} min`}
        min={10}
        max={60}
        value={timers.longRest}
        onChange={(value) => onChangeTimer({ timer: 'longRest', value })}
      />
      <Slider
        label={`Number of cycles: ${timers.cycles}`}
        min={1}
        max={10}
        value={timers.cycles}
        onChange={(value) => onChangeTimer({ timer: 'cycles', value })}
      />
    </View>
  )
}
