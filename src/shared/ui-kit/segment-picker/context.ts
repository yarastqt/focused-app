import { createContext, useContext } from 'react'

export interface SegmentPickerContextProps {
  onChange: (value: string) => void
  value: string
}

export const SegmentPickerContext = createContext<SegmentPickerContextProps | null>(null)

export function useSegmentPickerContext() {
  const context = useContext(SegmentPickerContext)

  if (!context) {
    throw new Error('SegmentPicker context not found')
  }

  return context
}
