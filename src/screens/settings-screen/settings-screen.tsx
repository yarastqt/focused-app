import { FC } from 'react'

import { ThemeSwitcher } from '@app/features/theme-switcher'
import { Light } from '@app/shared/icons'
import { MainLayout } from '@app/shared/layouts/main-layout'
import { ScreenHeader } from '@app/shared/ui-kit'

import { Section } from './ui/section'
import { SectionStack } from './ui/section-stack'

export const SettingsScreen: FC = () => {
  return (
    <MainLayout>
      <ScreenHeader>Settings</ScreenHeader>

      <SectionStack>
        <Section icon={<Light />} title="Appearance">
          <ThemeSwitcher />
        </Section>
      </SectionStack>
    </MainLayout>
  )
}
