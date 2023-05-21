import { useUnit } from 'effector-react'
import { FC } from 'react'

import { $$timer, Timer } from '@app/entities/timer'

export const DisplayTimer: FC = () => {
  const [timer] = useUnit([$$timer.$timer])

  return <Timer>{timer}</Timer>
}
