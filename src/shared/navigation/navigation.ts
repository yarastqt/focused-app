export enum Route {
  splash = 'splash',
  main = 'main',
  settings = 'settings',
}

export type RootStackParamList = {
  splash: undefined
  main: undefined
  settings: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
