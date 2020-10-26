import React from 'react';
import { YellowBox, View, Text, StyleSheet } from 'react-native'; // view = caixa sem estilização (como uma div). Não é possível usar tags HTML aqui

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

import Routes from './routes';

export default function App() {
  return (
    <Routes />
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#7159c1',
//     flexDirection: 'row', // column = comportamento padrão -> elementos um ao lado do outro
//     justifyContent: 'center', // alinha itens verticalmente
//     alignItems: 'center' // alinha itens horizontalmente
//   },
//   text: {
//     fontWeight: 'bold',
//     color: '#FFF',
//     fontSize: 20 // Todo lugar que seria usado hífen, usa-se letra maiúscula
//   },
// });
