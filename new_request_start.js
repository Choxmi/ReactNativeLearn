import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geocoder from 'react-native-geocoding';
import RNGooglePlaces from 'react-native-google-places';

import { connect } from "react-redux";
import {  
    requestCurrentLocation, 
    updateCurrentLocation, 
    changeAddressStart, 
    updateUserStartLocation,
    updateUserStartPoint 
} from "../store/actions/index";

import KEYS from '../config/keys';

import BottomButtonComponent from "../components/bottom_button";
import SearchBarStartCompenent from "../components/search_bar_start";
import PinComponent from "../components/pin";
import BottomLocateButton from "../components/bottom_locate_button";
import appcolors from "../config/appcolors";

class NewRequestStart extends Component {
    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.state = {};
        Geocoder.init(KEYS.MAP_KEY);
    }

    componentDidMount() {
        this.getCurrentLocationByDevice();
    }

    //GET CURRENT LOCATION BY DEVICE
    getCurrentLocationByDevice(){
        this.props.getCurrentLocation()
        .then(() => {
            this.navigateToCurrentLocation();
        })
        .catch(() => {
            this.navigateToCurrentLocation();
        });
    }

    //GET CURRENT LOCATION BY RN AND UPDATE TO STORE
    // getCurrentLocationByRNPlaces() {
    //     RNGooglePlaces.getCurrentPlace()
    //         .then((results) => {
    //             this.props.updateCurrentLocation(results[0].latitude, results[0].longitude);
    //             this.navigateToCurrentLocation();
    //         })
    //         .catch((error) => {
    //             console.log(error.message);
    //             this.navigateToCurrentLocation();
    //         });
    // }

    //NAVIGATE TO CURRENT LOCATION
    navigateToCurrentLocation() {
        let temp = {
            latitude: this.props.currentLat,
            longitude: this.props.currentLon,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
        };
        this.MAP_REF.animateToRegion(temp, 1000);
    }

    //NAVIGATE TO SPECIFIC LOCATION
    navigateToSpecificLocation(latitude, longitude) {
        let temp = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
        };
        this.MAP_REF.animateToRegion(temp, 1000);
    }

    //WHEN TYPE ON SEARCH BAR
    searchOnTextChange(text) {
        console.log("TEXT CHANGED");
    }

    //WHEN SELECT SEARCH BAR
    searchOnFocus() {
        console.log("FOCUS CHANGED");
    }

    //TRIGER ON CHANGING MAP
    onMapChange(region) {
        this.props.updateUserStartLocation({latitude: region.latitude, longitude: region.longitude});
        this.props.changeStartAddress('Fetching Address...');
        Geocoder.from(region.latitude, region.longitude)
            .then(json => {
                var address = json.results[0].formatted_address;
                var placeId = json.results[0].place_id;
                this.props.changeStartAddress(address);
                this.props.updateUserStartPoint(placeId);
            })
            .catch(error => {
                console.log(error);
                this.props.changeStartAddress('Error In Fetching Address...');
                this.props.updateUserStartPoint("");
            });
    }

    openSearchModal() {
        RNGooglePlaces.openAutocompleteModal({
            country: 'LK'
        })
        .then((place) => {
            console.log(place);
            this.props.updateUserStartLocation({latitude: place.location.latitude, longitude: place.location.longitude});
            this.navigateToSpecificLocation(place.location.latitude, place.location.longitude);        
        })
        .catch(error => {
            console.log(error.message)
        });
    }

    handleLocationSelection(item){
        if(item.lng != null && item.lat != null){

            var lat = parseFloat(item.lat.trim());
            var lon = parseFloat(item.lng.trim());

            this.props.updateUserStartLocation({latitude: lat, longitude: lon});
            this.navigateToSpecificLocation(lat, lon);
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <View style={styles.container}>
                    <MapView
                        ref={component => (this.MAP_REF = component)}
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        zoomEnabled={true}
                        pitchEnabled={true}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        showsBuildings={true}
                        showsCompass={false}
                        showsMyLocationButton={false}
                        onRegionChangeComplete={(region) => this.onMapChange(region)}
                        loadingEnabled={true}
                        initialRegion={{
                            latitude: 6.9201804113259415,
                            longitude: 79.86039010807872,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}>

                    </MapView>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>PICK-UP LOCATION</Text>
                </View>

                <SearchBarStartCompenent
                    placeholder="PICK-UP LOCATION"
                    onTextChange={(text) => { this.searchOnTextChange(text) }}
                    onFocusText={() => { this.searchOnFocus() }}
                    onSearchPress={() => this.openSearchModal() }
                    onSelectLocationItem={ (item) => this.handleLocationSelection(item)}/>

                <PinComponent />

                <BottomButtonComponent
                    onBottomPress={() => { this.props.navigation.navigate("NewRequestEnd") }}/>

                <BottomLocateButton
                    onLocatePress={() => {
                        this.getCurrentLocationByDevice();
                    }}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: "100%",
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    textContainer:{ 
        position: "absolute",
        justifyContent: 'center', 
        top: 0,
        width:'100%', 
        height: 40,
        backgroundColor: appcolors.transparentWhiteColor
    },
    text:{ 
        alignSelf: "center",
        fontWeight: "bold", 
        color: appcolors.appcolors
    }
});

const mapStateToProps = state => {
    return {
        currentLat: state.location.currentLat,
        currentLon: state.location.currentLon,
        startAddress: state.userData.startAddress,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCurrentLocation: () => dispatch(requestCurrentLocation()),
        changeStartAddress: (address) => dispatch(changeAddressStart(address)),
        updateCurrentLocation: (latitude, longitude) => dispatch(updateCurrentLocation(latitude, longitude)),
        updateUserStartLocation: (data) => dispatch(updateUserStartLocation(data)),
        updateUserStartPoint: (data) => dispatch(updateUserStartPoint(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewRequestStart);

