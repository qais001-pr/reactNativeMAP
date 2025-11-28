/* eslint-disable comma-dangle */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */

import { View, Text, Pressable, FlatList, Alert, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { openDatabase } from 'react-native-sqlite-storage'
import Icon from 'react-native-vector-icons/FontAwesome5';

const db = openDatabase({ name: 'Authentication.db' })

export default function HomeScreen({ navigation, route }) {

    const [data, setdata] = useState([])
    const [search, setsearch] = useState('')
    const [filteredData, setfilteredData] = useState([])
    const [showdata, setshowdata] = useState(true)

    let fetchData = () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM SignUp', [], (_tx, results) => {
                let temp = []
                for (let index = 0; index < results.rows.length; index++) {
                    temp.push(results.rows.item(index))
                }
                setdata(temp)
                setfilteredData(temp)
            })
        })
    }

    useEffect(fetchData, [])

    const handleSearch = (text) => {
        setsearch(text)
        if (text.trim() === '') {
            setfilteredData(data)
            return
        }

        const filtered = data.filter((item) =>
            item.fullname.toLowerCase().includes(text.toLowerCase())
        )

        setfilteredData(filtered)
    }

    // DELETE USER
    let deleteuser = (id) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM SignUp WHERE id = ?', [id], (_tx, _results) => {
                Alert.alert('Deleted Successfully')
                fetchData()
            })
        })
    }

    return (
        <View style={{ padding: 15 }}>

            <Pressable onPress={() => setshowdata(!showdata)}>
                <View style={{
                    padding: 10,
                    backgroundColor: '#3c04beff',
                    marginTop: 30,
                    width: '40%',
                    borderRadius: 5
                }}>
                    <Text style={{
                        textAlign: 'center',
                        color: '#ddd',
                        fontSize: 16
                    }}>
                        View Data
                    </Text>
                </View>
            </Pressable>

            {showdata && (
                <View style={{ maxHeight: '70%', marginTop: 30 }}>

                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        borderRadius: 5
                    }}>
                        <TextInput
                            placeholder='Enter Name'
                            style={{
                                flex: 1,
                                height: 40
                            }}
                            value={search}
                            onChangeText={handleSearch}
                        />
                        <Icon name='search' size={20} />
                    </View>

                    <FlatList
                        data={filteredData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={{
                                padding: 15,
                                marginVertical: 8,
                                borderWidth: 1,
                                flexDirection: 'row',
                                justifyContent:'space-between',
                            }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                        {item.fullname}
                                    </Text>
                                    <Text style={{ fontSize: 16 }}>{item.email}</Text>
                                    <Text style={{ fontSize: 16 }}>{item.password}</Text>
                                </View>
                                <Pressable
                                    onPress={() => deleteuser(item.id)}
                                    style={{ marginTop: 10 }}
                                >
                                    <Icon name='trash' size={25} color='red' />
                                </Pressable>
                            </View>
                        )}
                    />
                </View>
            )}

            <Pressable onPress={() => navigation.navigate('login')}>
                <View style={{
                    padding: 10,
                    backgroundColor: '#3c04beff',
                    marginTop: 30,
                    width: '40%',
                    borderRadius: 5
                }}>
                    <Text style={{
                        textAlign: 'center',
                        color: '#ddd',
                        fontSize: 16
                    }}>
                        Log Out
                    </Text>
                </View>
            </Pressable>

        </View>
    )
}
