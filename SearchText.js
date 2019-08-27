import React from 'react';
import { TextInput, View, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
    textbox: {
        width: "100%"
    }, 
    container: {
        top: 50,
        width: "80%",
        height: "10%",
        backgroundColor: '#fff',
        elevation: 10
    }
});
 
class SearchText extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: 'Useless Placeholder' };
    }

    render() {
    return (
        <View style={styles.container}>
            <TextInput
            style={styles.textbox}
            onChangeText={(text) => this.setState({text})}
            hint={this.state.text}
            />
        </View>
    );
    }
}

export default SearchText;