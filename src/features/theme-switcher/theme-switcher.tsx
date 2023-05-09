import { useUnit } from 'effector-react'
import { FC } from 'react'

import { $$theme } from '@app/shared/theme'
import { SegmentPicker } from '@app/shared/ui-kit'

export const ThemeSwitcher: FC = () => {
  const [colorScheme, onChangeColorScheme] = useUnit([
    $$theme.$colorSchemeVariant,
    $$theme.colorSchemeChanged,
  ])

  return (
    <SegmentPicker value={colorScheme} onChange={onChangeColorScheme}>
      <SegmentPicker.Option value="light">Light</SegmentPicker.Option>
      <SegmentPicker.Option value="dark">Dark</SegmentPicker.Option>
      <SegmentPicker.Option value="system">System</SegmentPicker.Option>
    </SegmentPicker>
  )
}
