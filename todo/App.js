import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';
import { theme } from './colors';

export default function App() {
    const [working, setWorking] = useState(false);
    const [text, setText] = useState('');
    const [toDos, setToDos] = useState({});

    const work = () => {
        setWorking(true);
    };

    const travel = () => {
        setWorking(false);
    };

    const onChangeText = (payload) => {
        setText(payload);
    };
    const addTodo = () => {
        if (text === '') {
            return;
        }

        const newToDos = Object.assign({}, toDos, {
            [Date.now()]: { text, work: working },
        });

        setToDos(newToDos);
        setText('');
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
                onSubmitEditing={addTodo}
                placeholder={
                    working ? 'Add a To do' : 'Where do you want to go?'
                }
                onChangeText={onChangeText}
                value={text}
                style={styles.input}
                returnKeyType='done'
            />
            <ScrollView>
                {Object.keys(toDos).map((item, index) => (
                    <View style={styles.todo} key={index}>
                        <Text style={styles.todoText}>{toDos[item].text}</Text>
                    </View>
                ))}
            </ScrollView>
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
        marginVertical: 20,
        fontSize: 18,
    },
    todo: {
        backgroundColor: 'grey',
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 15,
    },
    todoText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});
