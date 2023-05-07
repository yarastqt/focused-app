export type ColorSchemeVariant = 'light' | 'dark' | 'system'
export type ColorSchemeValue = 'light' | 'dark'

export type Theme = {
  colorScheme: ColorSchemeValue

  color: {
    brandBgBase: string
    brandBgPressed: string
    brandTextOn: string

    lineNormal: string

    surface0: string

    textPrimary: string
    textSecondary: string
  }

  typography: {
    textL: {
      fontFamily: string
      fontSize: number
    }
  }

  shadow: {}
}
