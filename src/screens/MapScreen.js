import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const MapScreen = ({ route }) => {
  //console.log(route.params.latitude)
  const latitude = route.params.latitude
  const longitude = route.params.longitude

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        //showsTraffic={true}
      >
        <MapView.Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          pinColor={"red"}
          title={"title"}
          description={"description"}
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: "100%",
      width: 400,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });
  

export default MapScreen