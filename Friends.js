import React, {Fragment} from 'react';
import { Text, Button, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

const Friends = () => {
  return (
    <View>
    <Text>
    Go Home
    </Text>
    <Button
    title="Need to go home"
    onPress={() =>
      this.props.navigation.navigate('Home')
    }
    />
  </View>
  );
};

export default Friends;