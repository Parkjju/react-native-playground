import { useState, useEffect } from 'react';
import MapView, { Polygon, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';
import polyData from './polyline';
import polyData2 from './poliyline2';
import * as TaskManager from 'expo-task-manager';

const TASK_NAME = 'BACKGROUND_LOCATION_TASK';

TaskManager.defineTask(TASK_NAME, async ({ data, error }) => {
    if (error) {
        console.error(error);
        return;
    }
    if (data) {
        const { locations } = data;
        const location = locations[0];

        if (location) {
            console.log(`New location : ${location}`);
        }
    }
});

export default function App() {
    const [location, setLocation] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrMsg('Permission to access denied');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setLoading(false);
        })();
        // foregroundSubscrition = Location.watchPositionAsync(
        //     {
        //         // Tracking options
        //         accuracy: Location.Accuracy.High,
        //         distanceInterval: 10,
        //     },
        //     (location) => {
        //         console.log(location);
        //     }
        // );
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Polyline
                        coordinates={polyData}
                        strokeColor='#000' // fallback for when `strokeColors` is not supported by the map-provider
                        strokeColors={[
                            '#7F0000',
                            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                            '#B24112',
                            '#E5845C',
                            '#238C23',
                            '#7F0000',
                        ]}
                        strokeWidth={6}
                    />

                    <Polyline
                        coordinates={polyData2}
                        strokeColor='#000' // fallback for when `strokeColors` is not supported by the map-provider
                        strokeColors={[
                            '#7F0000',
                            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                            '#B24112',
                            '#E5845C',
                            '#238C23',
                            '#7F0000',
                        ]}
                        strokeWidth={6}
                    />
                </MapView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
