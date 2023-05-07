import { AppRegistry } from 'react-native'

import { name } from './app.json'
import { Application } from './src/application'

AppRegistry.registerComponent(name, () => Application)
