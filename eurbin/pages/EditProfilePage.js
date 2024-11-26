import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from './UserContext/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfilePage() {
    const { currentUser, setCurrentUser } = useUser();
    const [username, setUsername] = useState(currentUser.userName);
    const [email, setEmail] = useState(currentUser.email);
    const [errorMessage, setErrorMessage] = useState('');
    const [image, setImage] = useState(null);
    const [modalEditProf, setModalEditProf] = useState(false);

    
    const updateProfileUrl = `https://eurbin.vercel.app/user/${currentUser.userId}`;

    
    const pickImage = async () => {
        console.log('pickImage function called');

        try {
            // Check permissions
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            console.log('Permission Status:', status);

            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'We need access to your gallery to update the profile picture.');
                return;
            }

            // Launch image library
            const result = await ImagePicker.launchImageLibraryAsync();
            console.log('Result:', result);

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setImage(result.assets[0].uri);
            } else {
                console.log('User canceled or no image selected.');
            }
        } catch (error) {
            console.error('Error launching image picker:', error);
            Alert.alert('Error', 'Unable to open the image picker.');
        }
    };


    const handleUpdate = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!username || !email) {
            setErrorMessage('Username and email cannot be empty');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('userId', currentUser.userId);
            formData.append('userName', username);
            formData.append('email', email);
            formData.append('smartPoints', currentUser.smartPoints);
            formData.append('plasticBottle', currentUser.plasticBottle);
            formData.append('rank', currentUser.rank);
            formData.append('co2', currentUser.co2);
            formData.append('accumulatedSP', currentUser.accumulatedSP);

            if (image) {
                const filename = image.split('/').pop();
                const type = `image/${filename.split('.').pop()}`;
                formData.append('Image', { uri: image, name: filename, type });
            }

            const response = await fetch(updateProfileUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setCurrentUser({ ...currentUser, userName: username, email });
                Alert.alert('Success', 'Profile updated successfully');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to update profile');
            }
        } catch (err) {
            console.log('Error:', err);
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.circleContainer}>
                <View style={styles.profileBG}>
                        <Image 
                            source={image ? { uri: image } : { uri: currentUser.Image,  cache: 'force-cache' }} 
                            style={styles.profilePic} 
                        />
                    <TouchableOpacity style={styles.editPicContainer} onPress={pickImage}>
                        <Image source={require('../icons/camera.png')} style={styles.editPicIcon} />
                    </TouchableOpacity>
                </View>
            </View>

       

            <View style={styles.customBox}></View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Change Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Change Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

              

                <TouchableOpacity style={styles.saveButton} onPress={() => setModalEditProf(true)}>
                    <Text style={styles.buttonText}>Save and Update</Text>
                </TouchableOpacity>
            </View>
            {/* Confirmation Modal for Edit Profile */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={modalEditProf}
                onRequestClose={() => setModalEditProf(false)} // Handle back button close
            >
                <View style={styles.modalLOBackground}>
                    <View style={styles.modalLOContainer}>
                        <Text style={styles.modalLOText}>Are you sure you want to edit your Profile?</Text>
                        
                        {/* Modal Buttons */}
                        <View style={styles.modalLOButtons}>
                            <TouchableOpacity 
                                style={styles.cancelButton} 
                                onPress={() => setModalEditProf(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={styles.logoutButton} 
                                onPress={handleUpdate}
                            >
                                <Text style={styles.logoutButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    circleContainer: {
        width: 250,
        height: 250,
        borderRadius: 150,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 80, 
        zIndex: 2,
    },
    profileBG: {
        width: 220,
        height: 220,
        borderRadius: 150,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 15, 
        zIndex: 2,
        borderWidth: 2,
        borderColor: 'black',
    },
    profilePic: {
        width: 200,
        height: 200,
        borderRadius: 100
    },
    editPicContainer: {
        width: 50,
        height: 50,
        borderRadius: 150,
        backgroundColor: '#800000',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 190, 
        zIndex: 2,
        borderWidth: 2,
        borderColor: 'black',
    },
    editPicIcon: {
        width: 25,
        height: 25,
        tintColor: '#FFFFFF', 
    },
    customBox: {
        width: '100%',
        height: 200,
        backgroundColor: '#800000',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
    },
    headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginTop: 400,
        width: '80%', 
    },
    input: {
        height: 60,
        width: '100%',
        backgroundColor: '#f4f4f4',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
      },
    saveButton: {
        backgroundColor: '#800000',
        borderRadius: 5,
        alignItems: 'center',
        paddingVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: 15,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // dim background
    },
    modalContainer: {
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalLOBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalLOContainer: {
        width: 300,
        height: 190,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    modalLOText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
    },
    modalLOButtons: {
        flexDirection: 'row',
        marginTop: 20,
    },
    cancelButton: {
        backgroundColor: 'white',
        borderColor: '#5e0005',
        borderWidth: 1,
        borderRadius: 20,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        marginRight: 20,
    },
    cancelButtonText: {
        color: '#5e0005',
    },
    logoutButton: {
        backgroundColor: '#5e0005',
        borderRadius: 20,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
    },
    logoutButtonText: {
        color: 'white',
    },
});