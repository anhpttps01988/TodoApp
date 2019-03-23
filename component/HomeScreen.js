import React from 'react';
import {
  StyleSheet, Text, View, Image,
  TouchableHighlight, Platform, FlatList,
  TouchableOpacity
} from 'react-native';
import CheckBox from 'react-native-check-box'
export default class HomeScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    //this.handlerCheckBox = this.handlerCheckBox.bind(this);
    this.data =
      [{ name: 'Build tower in Pisa', detail: 'Ground looks good, no foundation work required', isChecked: false },
      { name: 'Finish bridge in Tacoma', detail: 'Ground looks good, no foundation work required', isChecked: false },
      ];
    this.state = {
      users: [],
      isExistTask: true,
    }
  }

  componentDidMount() {
    this.setState({ users: [...this.data] })
  }

  joinData = ({ item, index }) => {
    item.isChecked = !item.isChecked
    this.setState({ users: [...this.data] })
    if (item.isChecked) {
      alert(`Task "${item.name}" is completed `);
    } else {
      alert(`Task "${item.name}" is unCompleted `);
    }

  }

  onResultData = (array) => {
    this.data.push(array[array.length - 1])
    this.setState({ users: [...this.data] })
    this.setState({ isExistTask: true })

  }

  onDeleteData = (item) => {
    this.data.pop(item)
    this.setState({ users: [...this.data] })
    this.setState({ isExistTask: !(this.data.length == 0) })
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'TODO-APP',
    headerLeft:
      <TouchableHighlight
        underlayColor='#546E7A'
        onPress={() => navigation.openDrawer()}>
        <Image
          source={require('./image/ic_navigator.png')}
          style={{ width: 28, height: 28, marginLeft: 16, tintColor: 'white' }}
        />
      </TouchableHighlight>,
    headerRight:
      <View style={{ flexDirection: 'row', }}>
        <TouchableOpacity onPress={()=> alert("Filter")}>
          <Image
            source={require('./image/ic_filter.png')}
            style={{ width: 28, height: 28, marginLeft: 16, tintColor: 'white' }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> alert("Settings")}>
          <Image
            source={require('./image/ic_settings.png')}
            style={{ width: 28, height: 28, marginLeft: 16, tintColor: 'white' }} />
        </TouchableOpacity>
      </View>
    ,
    headerStyle: {
      backgroundColor: '#546E7A',
    },
    headerTintColor: '#fff',
  });
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.childParent}>
          <Text
            style={{
              marginLeft: 16,
              marginTop: 20,
              marginBottom: 20,
              fontSize: 16,
              color: 'black'
            }}>
            ALL TO-DOs
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.users}
            extraData={this.state.users}
            renderItem={
              ({ item, index }) =>
                <View style={{
                  flexDirection: 'column'
                }}>
                  <TouchableHighlight
                    underlayColor='#F5F5F5'
                    onPress={() => navigate('EditTask', { data: item, onGoBackToDelete: this.onDeleteData })}>
                    <View style={{
                      padding: 16,
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>
                      <CheckBox
                        checkedCheckBoxColor='red'
                        style={{ padding: 10 }}
                        onClick={() => {
                          this.joinData({ item, index })
                        }}
                        isChecked={item.isChecked}
                      />
                      <Text>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableHighlight>

                  <View style={{ flex: 1, height: 0.5, backgroundColor: '#CCCCCC' }} />
                </View>
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <TouchableHighlight
          style={styles.floating}
          onPress={() => navigate('AddTask', { onGoBack: this.onResultData, array: this.state.users })}
          underlayColor="#FF8A80">
          <View>
            <Image
              source={require('./image/ic_add.png')}
              style={{ width: 28, height: 28, marginLeft: 16, tintColor: 'white' }} />
          </View>
        </TouchableHighlight>
        <View style={{
          position: !this.state.isExistTask ? 'absolute' : 'relative',
          top: 0,
          left: 0,
          bottom: 100,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text>{!this.state.isExistTask ? "No Task" : ""}</Text>
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
