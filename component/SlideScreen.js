import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Platform } from 'react-native';


export default class SlideScreen extends React.Component {

    constructor(props) {
        super(props);
        this.openStatistics = this.openStatistics.bind(this);
    }

    openStatistics() {
        this.props.navigation.navigate("Statistics")
    }

    render() {
        const navigated = this.props.navigation;
        return (
            <View style={{
                flexDirection: 'column',
                flex: 1
            }}>
                <View style={{
                    alignItems: 'stretch',
                    height: 200,
                    backgroundColor: '#263238',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image
                        source={require('./image/logo.png')}
                        style={{ width: 100, height: 100, marginTop: 20 }} />
                    <Text style={{
                        color: 'white',
                        fontSize: 16,
                        marginTop: 10
                    }}>
                        TO-DOs
                    </Text>
                </View>
                <TouchableHighlight
                    underlayColor='#E0E0E0'
                    onPress={() => navigated.closeDrawer()}
                    style={{ marginTop: 16, }}>
                    <View style={{
                        alignSelf: 'stretch',
                        height: 40,
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                        <Image
                            source={require('./image/ic_list.png')}
                            style={{ width: 28, height: 28, marginLeft: 18 }} />
                        <Text style={{
                            color: 'black',
                            fontSize: 13,
                            marginLeft: 28,
                            fontWeight: 'bold'
                        }}>
                            TO-DO List
                        </Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor='#E0E0E0'
                    onPress={this.openStatistics}
                    style={{ marginTop: 16 }}>
                    <View style={{
                        alignSelf: 'stretch',
                        height: 40,
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                        <Image
                            source={require('./image/ic_chart.png')}
                            style={{ width: 28, height: 28, marginLeft: 18 }} />
                        <Text style={{
                            color: 'black',
                            fontSize: 13,
                            marginLeft: 28,
                            fontWeight: 'bold'
                        }}>
                            Statistics
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}