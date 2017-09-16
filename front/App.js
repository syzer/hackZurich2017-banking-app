import React from 'react'
import TabNavigator from 'react-native-tab-navigator'
import { Image, StyleSheet, Text, View } from 'react-native'
import styles from './App.styles'

const home = 'home'
export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      selectedTab: 'home'
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="Home"
            // renderIcon={() => <Image source={...} />}
            renderSelectedIcon={() =>
              <Image height='30'  source={require('./Asset/bank.png')} />}
            badgeText="1"
            onPress={() => this.setState({ selectedTab: 'home' })}>
            {/*{homeView}*/}
            <Text>My home</Text>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'profile'}
            title="Profile"
            // renderIcon={() => <Image source={...} />}
            // renderSelectedIcon={() => <Image source={...} />}
            // renderBadge={() => <CustomBadgeView />}
            onPress={() => this.setState({ selectedTab: 'profile' })}>
            badgeText="1"
            {/*{profileView}*/}
            <Text>Profile</Text>

          </TabNavigator.Item>
        </TabNavigator>
      </View>
    )
  }
}
