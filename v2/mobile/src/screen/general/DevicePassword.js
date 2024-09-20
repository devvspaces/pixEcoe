import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/CustomHeader';

const DevicePassword = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* top bar and page title */}
      <CustomHeader
        title="Device Password"
        onBackPress={() => navigation.goBack()}
      />

      {/* screen content */}
      <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
        
      </View>
    </View>
  );
}

export default DevicePassword

const styles = StyleSheet.create({})