import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';
import { theme } from './colors';

export default function App() {
    const [clicked, setClicked] = useState(false);
    const onClick = () => {
        console.log('Hello');
    };
    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <View style={styles.header}>
                <TouchableOpacity>
                    <Text
                        style={{
                            ...styles.btnText,
                            color: clicked ? 'white' : theme.grey,
                        }}
                    >
                        Work
                    </Text>
                </TouchableOpacity>
                <TouchableHighlight onPress={onClick}>
                    <Text
                        style={{
                            ...styles.btnText,
                            color: clicked ? theme.grey : 'white',
                        }}
                    >
                        Travel
                    </Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    header: {
        width: Dimensions.get('window').width,
        height: 100,
        backgroundColor: 'black',
        marginTop: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 12,
    },
    btnText: {
        color: 'white',
        fontSize: 38,
        fontWeight: '600',
    },
});
