import React from 'react'
import { StyleSheet } from 'react-native'

const colors = {
  green: '#A8E6CF',
  yellow: '#DCEDC1',
  orange: '#FFD3B6',
  pink: '#FFAAA5',
  red: '#FF8B94'
}

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  imageBackground: {
    resizeMode: 'cover'
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  chart: {
    width: 200,
    height: 200,
  },
})

export { colors }
