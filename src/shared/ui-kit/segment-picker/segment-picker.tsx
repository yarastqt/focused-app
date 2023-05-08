import {
  Children,
  FC,
  ReactNode,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { LayoutChangeEvent, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

import { createStyles } from '@app/shared/theme'

import { SegmentPickerContext } from './context'
import { Option } from './option'

export interface SegmentPickerProps {
  children: ReactNode
  onChange: (value: string) => void
  value: string
}

const _SegmentPicker: FC<SegmentPickerProps> = (props) => {
  const { children, onChange, value } = props

  const styles = useStyles()

  const [rootWidth, setRootWidth] = useState(0)
  const translateX = useSharedValue(0)

  const currentIndex = useMemo(() => {
    return Children.toArray(children).findIndex((child) => {
      if (!isValidElement(child)) {
        return false
      }

      return child.props.value === value
    })
  }, [children, value])

  const onLayoutHandler = useCallback((event: LayoutChangeEvent) => {
    setRootWidth(event.nativeEvent.layout.width - 4)
  }, [])

  const optionWidth = rootWidth / Children.count(children)

  const plateStyles = useAnimatedStyle(() => ({
    width: optionWidth,
    transform: [{ translateX: translateX.value }],
  }))

  useEffect(() => {
    translateX.value = withSpring(optionWidth * currentIndex, {
      stiffness: 180,
      damping: 25,
      mass: 1,
    })
  }, [optionWidth, currentIndex])

  return (
    <View onLayout={onLayoutHandler} style={styles.root}>
      <Animated.View style={[styles.plate, plateStyles]} />

      <SegmentPickerContext.Provider value={{ onChange, value }}>
        {children}
      </SegmentPickerContext.Provider>
    </View>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    height: 56,
    backgroundColor: theme.color.surfaceSubmerged,
    borderRadius: 20,
    flexDirection: 'row',
  },

  plate: {
    ...theme.shadow.elevated50,
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: theme.color.surface0,
    borderRadius: 18,
    margin: 2,
  },
}))

export const SegmentPicker = Object.assign(_SegmentPicker, { Option })
