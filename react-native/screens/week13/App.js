/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
import React, { useState } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    Image,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';

export default function MyApp() {
    global.URL = 'http://192.168.240.1/fypwebapi/api/Student/'
    const [students, setStudents] = useState([]);

    const [imageUri, setImageUri] = useState(null);
    const [imagetype, setimagetype] = useState(null);

    const getStudents = async () => {
        try {
            const response = await fetch(URL + 'getStudents');
            const data = await response.json();
            console.log(data.studentList);
            setStudents(data.studentList);
        } catch (error) {
            console.error(error);
        }
    };

    const getImage = async () => {
        launchCamera({
            mediaType: 'photo'
        }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                console.log(response);
                setImageUri(response.assets[0].uri);
                setimagetype(response.assets[0].type);
            }
        });
    }
    const addStudent = async () => {
        const st = {
            aridno: 80,
            name: "Amad",
            fathername: "Shokeer",
            section: "A",
            degree: "BSSE",
            city: "KLR",
            semester: 2
        }
        const formData = new FormData();
        formData.append({
            uri: imageUri,
            name: 'profile',
            type: imagetype,
        });
        formData.append("student", JSON.stringify(st));
        console.log(formData)
        try {
            const response = await fetch(URL + 'AddStudent', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-Data'
                }
            });
            console.log(response)
            if (response.ok) {
                console.log("Student Added Successfully")
            }
            const result = await response.json();
            console.log(result);
        }
        catch (error) {
            console.error(error);
        }

    }

    const renderItem = ({ item, index }) => (
        <View style={styles.card}>
            <Text style={styles.index}>{index + 1}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>Name: {item.name}</Text>
                <Text>AridNo: {item.aridno}</Text>
                <Text>Father Name: {item.fathername}</Text>
                <Text>City: {item.city}</Text>
                <Text>Section: {item.section}</Text>
                <Text>Degree: {item.degree}</Text>
                <Text>Semester: {item.semester}</Text>
            </View>
            <Image
                source={{ uri: 'http://192.168.240.1/fypwebapi/images/' + item.Profileimage }}
                style={styles.image}
                resizeMode="cover"
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Student List</Text>
            <FlatList
                data={students}
                keyExtractor={(item) => item.aridno.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
            />
            <View style={{ gap: 30, bottom: 10 }}>

                <Button title="Get Students" onPress={getStudents} />
                <Button title="Take Image" onPress={getImage} />
                <Button title="Add Student" onPress={addStudent} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 10,
    },
    header: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 15,
        color: '#333',
    },
    listContent: {
        paddingBottom: 80, // leave space for the button
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    index: {
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginLeft: 10,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 15,
        left: 20,
        right: 20,
    },
});
