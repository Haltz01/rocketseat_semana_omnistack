/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src'; // pega index.js por padrão 
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
