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
    backgroundColor: colors.yellow,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
