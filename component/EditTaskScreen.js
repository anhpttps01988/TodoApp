import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Platform, Alert } from 'react-native';
import CheckBox from 'react-native-check-box'
import { TextField } from 'react-native-material-textfield';

export default class EditTaskScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Edit TO-DO',
            headerBackTitle: null,
            headerStyle: {
                backgroundColor: '#546E7A',
            },
            headerTintColor: '#fff',
            headerRight:
                <View style={{ flexDirection: 'row', }}>
                    <TouchableHighlight
                        underlayColor='#00000000'
                        onPress={() => {
                            //alert(params.user.name)
                            let item = params.user
                            params.deleteHandler(item, params, navigation)
                        }} >
                        <Text style={{
                            marginRight: 16,
                            fontWeight: 'bold',
                            color: 'white'
                        }}>
                            DELETE TASK
                </Text>
                    </TouchableHighlight>
                </View>
            ,
        };
    };

    componentDidMount() {
        let user = this.state.item
        this.props.navigation.setParams({
            user: user,
            deleteHandler: this.deleteTask
        });
    }

    constructor(props) {
        super(props)
        this.state = {
            item: Object
        }
    }

    deleteTask(item, params, navigation) {
        Alert.alert(
            'Confirm',
            `Do you want to delete ${item.name} ?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        params.onGoBackToDelete(item)
                        navigation.goBack()
                    }
                },
            ],
        );
    }

    render() {
        const { navigation } = this.props;
        const data = navigation.getParam('data', null);
        this.state.item = data
        return (
            <View style={{
                flexDirection: 'column',
                flex: 1
            }}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        paddingLeft: 16,
                    }}>
                        <CheckBox
                            checkedCheckBoxColor='red'
                            style={{ padding: 10 }}
                            onClick={() => {

                            }}
                            isChecked={data.isChecked}
                        />
                    </View>
                    <View style={{
                        flex: 8,
                        justifyContent: 'center',
                        flexDirection: 'column',
                        padding: 8,
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: 'black'
                        }}>
                            {data.name}
                        </Text>
                        <Text style={{
                            fontSize: 13,
                            color: 'black'
                        }}>
                            {data.detail}
                        </Text>
                    </View>
                </View>
                <TouchableHighlight
                    style={styles.floating}
                    onPress={() => { }}
                    underlayColor='#FF8A80'>
                    <View>
                        <Image
                            source={require('./image/ic_edit.png')}
                            style={{ width: 28, height: 28, marginLeft: 16, tintColor: 'white' }} />
                    </View>
                </TouchableHighlight>
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
    icon: {
        width: 24,
        height: 24,
    },
    childParent: {
        position: 'absolute',
        backgroundColor: '#F5F5F5',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
}
);
