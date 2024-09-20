import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Sale = () => {
  return (
    <View style={styles.container}>
      <Text>Sale</Text>
    </View>
  )
}

export default Sale

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  }
})