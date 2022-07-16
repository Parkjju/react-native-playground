import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from './colors';
import { AntDesign } from '@expo/vector-icons';

const STORAGE_KEY = '@toDos';

export default function App() {
    const initializeWork = async () => {
        const initWork = await AsyncStorage.getItem('@category');
        setWorking(JSON.parse(initWork));
    };

    useEffect(() => {
        loadToDos();
        setLoading(false);
        initializeWork();
    }, []);

    const [working, setWorking] = useState(false);
    const [text, setText] = useState('');
    const [toDos, setToDos] = useState({});
    const [loading, setLoading] = useState(true);
    const [modifyText, setModifyText] = useState('');

    const saveToDos = async (toSave) => {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    };

    const loadToDos = async () => {
        const str = await AsyncStorage.getItem(STORAGE_KEY);
        setToDos(JSON.parse(str));
    };

    const work = async () => {
        setWorking(true);
        await AsyncStorage.setItem('@category', JSON.stringify(true));
    };

    const travel = async () => {
        setWorking(false);
        await AsyncStorage.setItem('@category', JSON.stringify(false));
    };

    const onChangeText = (payload) => {
        setText(payload);
    };
    const addTodo = async () => {
        if (text === '') {
            return;
        }

        const newToDos = Object.assign({}, toDos, {
            [Date.now()]: { text, working, completed: false, modify: false },
        });

        setToDos(newToDos);
        await saveToDos(newToDos);
        setText('');
    };
    const deleteTodo = async (key) => {
        Alert.alert('지울거냐???', '진짜??', [
            {
                text: '지워',
                onPress: async () => {
                    const newToDos = {
                        ...toDos,
                    };
                    delete newToDos[key];
                    setToDos(newToDos);
                    await saveToDos(newToDos);
                },
            },
            { text: '싫어' },
        ]);
        return;
    };
    const completeTodo = async (key) => {
        let newTodos = { ...toDos };
        newTodos[key].completed = !newTodos[key].completed;
        setToDos(newTodos);
        await saveToDos(newTodos);
    };
    const modifyTodo = async (key) => {
        let newToDos = { ...toDos };
        newToDos[key].modify = !newToDos[key].modify;
        setModifyText(newToDos[key].text);
        setToDos(newToDos);
    };
    const onModifyText = (payload) => {
        setModifyText(payload);
    };
    const submitModifyTodo = async (key) => {
        let newToDos = { ...toDos };
        newToDos[key].text = modifyText;
        newToDos[key].modify = !newToDos[key].modify;
        setToDos(newToDos);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newToDos));
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
                {loading ? (
                    <ActivityIndicator color='white' size='large' />
                ) : toDos ? (
                    Object.keys(toDos).map((item, index) =>
                        toDos[item].working === working ? (
                            <View style={styles.todo} key={index}>
                                {toDos[item].modify ? (
                                    <TextInput
                                        onChangeText={onModifyText}
                                        value={modifyText}
                                        style={styles.modifyInput}
                                        onSubmitEditing={() =>
                                            submitModifyTodo(item)
                                        }
                                    />
                                ) : (
                                    <Text
                                        style={{
                                            ...styles.todoText,
                                            textDecorationLine: toDos[item]
                                                .completed
                                                ? 'line-through'
                                                : null,
                                            color: toDos[item].completed
                                                ? '#636e72'
                                                : 'white',
                                        }}
                                    >
                                        {toDos[item].text}
                                    </Text>
                                )}
                                <View style={styles.buttons}>
                                    <TouchableOpacity
                                        onPress={() => modifyTodo(item)}
                                    >
                                        <AntDesign
                                            name='enter'
                                            size={24}
                                            color='white'
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => completeTodo(item)}
                                    >
                                        <AntDesign
                                            name='checksquareo'
                                            size={24}
                                            color='white'
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => deleteTodo(item)}
                                    >
                                        <AntDesign
                                            name='delete'
                                            size={24}
                                            color='white'
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : null
                    )
                ) : null}
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
        backgroundColor: '#2d3436',
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 70,
    },
    todoText: {
        fontSize: 18,
        fontWeight: '600',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 90,
        alignItems: 'center',
    },
    modifyInput: {
        backgroundColor: 'white',
        width: 200,
        paddingHorizontal: 12,
        borderRadius: 10,
        height: 30,
        paddingVertical: 6,
        fontSize: 18,
    },
});
