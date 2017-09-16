import React, { Component } from 'react'
import TabNavigator from 'react-native-tab-navigator'
import { Image, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles, { colors } from './App.styles'
import Chart from 'react-native-chart'
import { Dimensions } from 'react-native'

const home = 'home'

const deviceW = Dimensions.get('window').width
const basePx = 500
const px2dp = (px) => px * deviceW / basePx

const data = [
  { 'number': 8, 'name': 'Fun activities' },
  { 'number': 7, 'name': 'Dog' },
  { 'number': 16, 'name': 'Food' },
  { 'number': 23, 'name': 'Car' },
  { 'number': 42, 'name': 'Rent' },
  { 'number': 4, 'name': 'Misc' },
]

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
          <Chart
            style={styles.chart}
            data={data}
            verticalGridStep={5}
            type="line"
            showDataPoint={true}
            color={['#e1cd00']}
          />
        {/*<Image source={require('./Asset/background.jpeg')}/>*/}
      </View>
    )
  }
}

class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./Asset/background-profile.jpeg')}/>
      </View>
    )
  }
}

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'home'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNavigator style={styles.container}>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="Home"
            selectedTitleStyle={{ color: '#3496f0' }}
            renderIcon={() =>
              <Icon name="home" size={px2dp(22)} color={colors.green}/>}
            renderSelectedIcon={() =>
              <Icon name="home" size={px2dp(22)} color={colors.green}/>}
            badgeText="1"
            onPress={() => this.setState({ selectedTab: 'home' })}>
            <Home/>
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'profile'}
            title="Profile"
            selectedTitleStyle={{ color: '#3496f0' }}
            renderIcon={() =>
              <Icon name="user" size={px2dp(22)} color="#666"/>}
            renderSelectedIcon={() => <Icon name="user" size={px2dp(22)} color="#3496f0"/>}
            onPress={() => this.setState({ selectedTab: 'profile' })}>
            <Profile/>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    )
  }
}
