import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { theme } from './colors';

export default function App() {
    const [working, setWorking] = useState(false);
    const [text, setText] = useState('');

    const work = () => {
        setWorking(true);
    };

    const travel = () => {
        setWorking(false);
    };

    const onChangeText = (payload) => {
        setText(payload);
    };

    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <View style={styles.header}>
                <TouchableOpacity onPress={work}>
                    <Text
                        style={{
                            ...styles.btnText,
                            color: working ? 'white' : theme.grey,
                        }}
                    >
                        Work
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={travel}>
                    <Text
                        style={{
                            ...styles.btnText,
                            color: !working ? 'white' : theme.grey,
                        }}
                    >
                        Travel
                    </Text>
                </TouchableOpacity>
            </View>

            <TextInput
                placeholder={
                    working ? 'Add a To do' : 'Where do you want to go?'
                }
                onChangeText={onChangeText}
                value={text}
                style={styles.input}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: 20,
    },
    header: {
        height: 100,
        backgroundColor: 'black',
        marginTop: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnText: {
        fontSize: 38,
        fontWeight: '600',
    },
    input: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginTop: 20,
        fontSize: 18,
    },
});
