import React from 'react';
import { StyleSheet, Text, View, Image, } from 'react-native';
import { TabNavigator, createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation';
import HomeScreen from './component/HomeScreen'
import SlideScreen from './component/SlideScreen'
import AddTaskScreen from './component/AddTaskScreen'
import StatisticsScreen from './component/StatisticsScreen'
import EditTaskScreen from './component/EditTaskScreen'
const MyStackNavigator = createStackNavigator(
  {
    MyHome: {
      screen: HomeScreen,
    },
    AddTask: {
      screen: AddTaskScreen,
    },
    Statistics: {
      screen: StatisticsScreen,
    },
    EditTask: {
      screen: EditTaskScreen,
    }
  },
);

const MainNavigator = createDrawerNavigator(
  {
    
    Home: {
      screen: MyStackNavigator,
    },

  },
  {
    contentOptions: {
      activeTintColor: '#000000',
    },
    contentComponent: ({ navigation }) => <SlideScreen navigation={navigation} />,
  },
);

const App = createAppContainer(MainNavigator);

export default App;

