export enum Route {
  splash = 'splash',
  main = 'main',
  settings = 'settings',
  statistics = 'statistics',
}

export type RootStackParamList = {
  splash: undefined
  main: undefined
  settings: undefined
  statistics: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
