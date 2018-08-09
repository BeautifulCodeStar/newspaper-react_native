import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  ActivityIndicator
} from 'react-native';
const Loader = props => {
  const {
    loading,
    ...attributes
  } = props;
return (
    <Modal
        transparent={true}
        animationType={'none'}
        visible={loading}>
        <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
                <ActivityIndicator style={styles.activity_indicator} animating={loading} />
                <Text>Please wait!!!</Text>
            </View>
        </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 50,
        width: 300,
        borderRadius: 10,
        flexDirection:'row',
        alignItems: 'center',
    },
    activity_indicator:{
        margin:15
    }
});
export default Loader;