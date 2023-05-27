import { FC } from 'react'

import { RemindSettings } from '@app/features/remind-settings'
import { ThemeSwitcher } from '@app/features/theme-switcher'
import { TimerSettings } from '@app/features/timer-settings'
import { Bolt, Clock, Light } from '@app/shared/icons'
import { MainLayout } from '@app/shared/layouts/main-layout'
import { ScreenHeader } from '@app/shared/ui-kit'

import { Footer } from './ui/footer'
import { Section } from './ui/section'
import { SectionStack } from './ui/section-stack'

export const SettingsScreen: FC = () => {
  return (
    <MainLayout>
      <ScreenHeader>Settings</ScreenHeader>

      <SectionStack>
        <Section icon={<Clock />} title="Timers">
          <TimerSettings />
        </Section>

        <Section icon={<Bolt />} title="Reminds">
          <RemindSettings />
        </Section>

        <Section icon={<Light />} title="Appearance">
          <ThemeSwitcher />
        </Section>
      </SectionStack>

      <Footer />
    </MainLayout>
  )
}
