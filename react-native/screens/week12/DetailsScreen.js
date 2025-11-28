/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable semi */
import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function DetailsScreen() {
    return (
        <View style={{ flex: 1, width: '100%', marginTop: StatusBar.currentHeight || 10 }}>
            <View style={{ justifyContent: 'center', margin: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Search
                </Text>
            </View>
            <View>
                <View style={{ alignSelf: 'center', width: '90%', backgroundColor: '#dddd', elevation: 10, height: 50, flexDirection: 'row', borderRadius: 50 }}>
                    <View style={{ marginLeft: 15, marginRight: 10, alignSelf: 'center' }}>
                        <Icon name='search' color={'black'} size={20} />
                    </View>
                    <TextInput style={{ width: '50%', fontSize: 18 }} placeholder='Enter Search' /
                    >
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                <View>
                    <Text>
                        Recent Searches
                    </Text>
                </View>
                <View>
                    <Text style={{ fontSize: 15, fontWeight: '800', color: 'blue' }}>Clear</Text>
                </View>
            </View>
        </View>
    )
}