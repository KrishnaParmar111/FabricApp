import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Curate = () => {
  return (
    <View style={styles.container}>
      <Text>Curate</Text>
    </View>
  )
}

export default Curate

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  }
})