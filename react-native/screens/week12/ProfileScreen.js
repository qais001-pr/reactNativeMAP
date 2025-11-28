/* eslint-disable comma-dangle */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */

import { View, Text, StatusBar, Image, Pressable } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import picture from '../../assets/image.png'

export default function ProfileScreen({ navigation, route }) {
    return (
        <View style={{ flex: 1, width: '100%', marginTop: StatusBar.currentHeight || 10 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 17 }}>
                <Text style={{ fontSize: 22, fontWeight: '700' }}>Profile</Text>
                <Icon name='home' size={22} />
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <Image
                    source={picture}
                    style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }}
                />

                <Text style={{ fontSize: 18, fontWeight: '600' }}>Alex Doe</Text>
                <Text style={{ color: '#555', marginTop: 5 }}>AlexDoe123@gmail.com</Text>
            </View>

            <View style={{
                marginTop: 30,
                marginHorizontal: 15,
                padding: 15,
                borderRadius: 12,
                backgroundColor: '#eee',
                elevation: 5
            }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
                    <View style={{ backgroundColor: '#ddd', borderRadius: 100, padding: 10 }}>
                        <Icon name='cog' size={20} color='blue' />
                    </View>
                    <Text style={{ fontSize: 18, marginLeft: 10, flex: 1 }}>General Settings</Text>
                    <Icon name='chevron-right' size={18} />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
                    <View style={{ backgroundColor: '#ddd', borderRadius: 100, padding: 10 }}>

                        <Icon name='bell' size={20} color='blue' />
                    </View>
                    <Text style={{ fontSize: 18, marginLeft: 10, flex: 1 }}>Notifications</Text>
                    <Icon name='chevron-right' size={18} />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
                    <View style={{ backgroundColor: '#ddd', borderRadius: 100, padding: 10 }}>

                        <Icon name='lock' size={20} color='blue' />
                    </View>
                    <Text style={{ fontSize: 18, marginLeft: 10, flex: 1 }}>Privacy</Text>
                    <Icon name='chevron-right' size={18} />
                </View>
            </View>
            <View style={{
                marginTop: 30,
                marginHorizontal: 15,
                padding: 10,
                borderRadius: 12,
                backgroundColor: '#eee',
                elevation: 5
            }}>
                <Pressable onPress={() => navigation.navigate('login')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
                        <Icon name='sign-out-alt' size={20} color='red' />
                        <Text style={{ fontSize: 18, marginLeft: 10, flex: 1, color: 'red' }}>Logout</Text>
                    </View>
                </Pressable>
            </View>
        </View >
    )
}
