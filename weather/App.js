import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

export default function App() {
    const [city, setCity] = useState('Loading...');
    const [days, setDays] = useState([]);
    const [ok, setOk] = useState(true);

    const icons = {
        Clouds: 'cloudy-outline',
        Rains: 'ios-rainy-outline',
    };

    const getWeather = async () => {
        const { granted } = await Location.requestForegroundPermissionsAsync();

        if (!granted) {
            setOk(false);
        }
        const {
            coords: { longitude, latitude },
        } = await Location.getCurrentPositionAsync({ accuracy: 5 });

        const location = await Location.reverseGeocodeAsync(
            { latitude, longitude },
            { useGoogleMaps: false }
        );
        setCity(location[0].city);
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
        );
        const json = await response.json();
        setDays(json.daily);
    };

    useEffect(() => {
        getWeather();
    });

    return (
        <View style={styles.container}>
            <View style={styles.city}>
                <Text style={styles.cityName}>{city}</Text>
            </View>
            <ScrollView
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.weather}
            >
                {days.length === 0 ? (
                    <View style={styles.day}>
                        <ActivityIndicator color='white' size='large' />
                    </View>
                ) : (
                    days.map((day, index) => (
                        <View key={index} style={styles.day}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignContent: 'center',
                                }}
                            >
                                <Text style={styles.temp}>
                                    {parseFloat(day.temp.day).toFixed(1)}
                                </Text>
                                <Ionicons
                                    name={icons[day.weather[0].main]}
                                    size={24}
                                    color='white'
                                />
                            </View>
                            <Text style={styles.description}>
                                {day.weather[0].main}
                            </Text>
                            <Text style={styles.tinyText}>
                                {day.weather[0].description}
                            </Text>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'tomato',
        color: 'white',
    },
    city: {
        flex: 1.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cityName: {
        fontSize: 68,
        fontWeight: '500',
        color: 'white',
    },
    weather: {},
    day: {
        width: Dimensions.get('window').width,
        alignItems: 'flex-start',
        marginLeft: 20,
    },
    temp: {
        fontSize: 80,
        color: 'white',
        fontWeight: '500',
    },
    description: {
        marginTop: 0,
        fontSize: 40,
        color: 'white',
    },
    tinyText: {
        fontSize: 20,
        color: 'white',
    },
});
