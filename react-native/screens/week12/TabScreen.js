/* eslint-disable semi */
/* eslint-disable jsx-quotes */
/* eslint-disable react/no-unstable-nested-components */

import React from 'react'
import HomeScreen from './HomeScreen'
import DetailsScreen from './DetailsScreen'
import ProfileScreen from './ProfileScreen'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Tab = createBottomTabNavigator()

export default function TabScreen() {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarIcon: ({ focused, color }) => {
                    let icon = 'home' // default

                    if (route.name === 'Home') {
                        icon = 'home'
                    } else if (route.name === 'Search') {
                        icon = 'search'
                    } else if (route.name === 'Profile') {
                        icon = 'user'   // FIXED: "profile" does not exist in FontAwesome5
                    }

                    return <Icon name={icon} color={color} size={focused ? 20 : 16} />
                },
            })}
        >
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='Search' component={DetailsScreen} />
            <Tab.Screen name='Profile' component={ProfileScreen} />
        </Tab.Navigator>
    )
}
