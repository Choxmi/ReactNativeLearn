import React, {Fragment} from 'react';
import { Text, Button, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

class HomeScreen extends React.Component {
  render() {
  return (
      <View>
        <Text>
        Sample Message ghdfhd
        </Text>
        <Button
        title="Add some friends"
        onPress={() =>
          this.props.navigation.navigate('Friends')
        }
        />
      </View>
  )
      }
}

export default HomeScreen;