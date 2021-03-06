import React, {Fragment} from 'react';
import { Text, Button, View, StyleSheet, Alert } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import SearchText from '../comps/SearchText'
import { db } from '../config';

let addItem = item => {
  db.ref('/items').push({
    name: item
  });
};

state = {
  name: 'dfrer'
};

handleChange = e => {
  this.setState({
    name: e.nativeEvent.text
  });
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }
});

class HomeScreen extends React.Component {
  // static navigationOptions = {
  //   header: { visible:false }
  // };
  render() {
  return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 6.927079,
            longitude: 79.861244,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showsMyLocationButton={true}
        >
        </MapView>
        {/* <SearchText/> */}
        <Button
          onPress={() => {
            console.debug("bcgfghf"); 
            var item = addItem("fgdgfdgfd");
            alert(GeoFire(db));
          }}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
  )
      }
}

export default HomeScreen;