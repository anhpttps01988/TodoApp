import React from 'react';
import {
    StyleSheet, View,
    TouchableHighlight, Platform, Image, Keyboard, KeyboardAvoidingView
    , TouchableOpacity, Dimensions, keyboardDidShow, Alert
} from 'react-native';
import { TextField } from 'react-native-material-textfield';

export default class AddTaskScreen extends React.Component {

    constructor(props) {
        super(props);
        this._keyboardDidShow = this._keyboardDidShow.bind(this)
        this.state = {
            taskName: '',
            taskDetail: '',
            array: [],
            bottom: 16,
        }
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow(e) {
        const { height, screenX, screenY, width } = e.endCoordinates
        this.setState({ bottom: height });
    }

    _keyboardDidHide() {

    }

    addTask() {
        let name = this.state.taskName
        let detail = this.state.taskDetail
        if (name.length == 0) {
            alert("Please enter task name")
            return;
        }
        if (detail.length == 0) {
            alert("Please enter task detail")
            return;
        }
        this.state.array.push({ name: name, detail: detail })
        let array = this.state.array
        this.props.navigation.state.params.onGoBack(array)
        this.props.navigation.goBack()
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Add TO-DO',
        headerBackTitle: null,
        headerStyle: {
            backgroundColor: '#546E7A',
        },
        headerTintColor: '#fff',
    });

    render() {
        const { name } = this.state.taskName
        const { detail } = this.state.taskDetail
        const array = this.props.navigation.getParam('array', null);
        this.state.array = array
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    underlayColor='white'
                    onPress={() => {
                        this.setState({ bottom: 0 })
                        Keyboard.dismiss()
                    }}>
                    <View style={{
                        alignSelf: 'stretch',
                        height: 60,
                        paddingLeft: 16,
                        paddingRight: 16,
                    }}>
                        <TextField
                            value={name}
                            label="Enter task name"
                            onChangeText={(name) => this.setState({ taskName: name })}
                            multiline={true}
                            numberOfLines={2}
                        />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor='white'
                    style={{ flex: 1 }}
                    onPress={() => {
                        this.setState({ bottom: 0 })
                        Keyboard.dismiss()
                    }}>
                    <View style={{
                        alignSelf: 'stretch',
                        height: 60,
                        paddingLeft: 16,
                        paddingRight: 16,
                    }}>
                        <TextField
                            label="Enter task detail"
                            value={detail}
                            onChangeText={(detail) => this.setState({ taskDetail: detail })}
                            multiline={true}
                            numberOfLines={2}
                            maxLength={30} />
                    </View>
                </TouchableHighlight>
                <View style={{
                    position: 'absolute',
                    right: 0,
                    bottom: this.state.bottom
                }}>
                    <TouchableHighlight
                        style={styles.floating}
                        onPress={() => {
                            this.addTask()
                        }}
                        underlayColor='#FF8A80'>
                        <View>
                            <Image
                                source={require('./image/ic_done.png')}
                                style={{ width: 28, height: 28, marginLeft: 16, tintColor: 'white' }} />
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'column',
        flex: 1,
    },
    floating: {
        bottom: 16,
        right: 16,
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 90,
        justifyContent: 'center',
        backgroundColor: '#B71C1C',
        shadowColor: '#000000',
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: Platform.OS == 'ios' ? 3 : 10
        },
        shadowRadius: 3,
        shadowOpacity: 1.0
    }
});