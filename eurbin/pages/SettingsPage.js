import React, { useState } from 'react';
import { Modal, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { View, Text, StyleSheet, Image } from 'react-native';
import User from '../icons/user22.png'; // Your user image
import Arrow from '../icons/greater-than.jpg'; // Arrow icon
import Lock from '../icons/padlock.png';
import { useUser } from './UserContext/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsPage({ navigation }) {
    const { currentUser } = useUser();
    const [isModalVisible, setModalVisible] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [modalLogout, setModalLogout] = useState(false);
    const [modalChangePass, setModalChangePass] = useState(false);

    const handleLogout = () => {
        setModalLogout(false);
        navigation.navigate('Login'); 
      };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleChangePassword = () => {
        toggleModal();
    };

    const formatEmail = (email) => {
        return email ? `${email.slice(0, 3)}****@gmail.com` : '';
      };

    const handleUpdatePassword = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!oldPassword || !newPassword) {
            Alert.alert('Error', 'Please fill in both fields.');
            return;
        }

        try {
            const response = await fetch('https://eurbin.vercel.app/user/update-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                       'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: currentUser.userId, // Assuming userId is available in currentUser
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                }),
            });

            const data = await response.json();

            if (response.status === 200) {
                Alert.alert('Success', 'Password updated successfully');
                toggleModal(); // Close modal after successful password change
                setModalChangePass(false)
            } else {
                Alert.alert('Error', data.message || 'Failed to update password');
            }
        } catch (err) {
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.customBox} />

            <View style={styles.combinedBox}>
                <View style={styles.profileBox}>
                <Image 
                    source={ 
                    currentUser.Image 
                        ? { uri: currentUser.Image, cache: 'force-cache' } 
                        : User 
                    } 
                    style={styles.profilePic} 
                />
                <View style={styles.userDetails}>
                    <Text style={styles.profileText}>{currentUser.userName}</Text>
                    <Text style={styles.secondBoxText}>{formatEmail(currentUser.email)}</Text>
                   {/* <Text style={styles.secondBoxText}>{currentUser.yearLevel} {currentUser.department}</Text>
                    <Text style={styles.textAdjust} numberOfLines={2} ellipsizeMode="tail">{currentUser.program}</Text>*/}
                </View>    
                </View>
                <View style={styles.underline} />

                <View style={styles.detailsBox}>
                    <Text style={styles.sectionHeader}>Personal Details</Text>

                    <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Edit Profile')}>
                        <Text style={styles.optionText}>Edit Profile</Text>
                        <Image source={Arrow} style={styles.arrowIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option} onPress={toggleModal}>
                        <Text style={styles.optionText}>Change Password</Text>
                        <Image source={Arrow} style={styles.arrowIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Analytics')}>
                        <Text style={styles.optionText}>Analytics</Text>
                        <Image source={Arrow} style={styles.arrowIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Instruction')}>
                        <Text style={styles.optionText}>Instruction</Text>
                        <Image source={Arrow} style={styles.arrowIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option} onPress={() => setModalLogout(true)}>
                        <Text style={styles.optionText}>Logout</Text>
                        <Image source={Arrow} style={styles.arrowIcon} />
                    </TouchableOpacity>

                    <View style={styles.underline} />

                    <Text style={styles.sectionHeader}>More</Text>

                    <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PrivacyPolicy')}>
                        <Text style={styles.optionText}>Privacy Policy</Text>
                        <Image source={Arrow} style={styles.arrowIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('About')}>
                        <Text style={styles.optionText}>About Us</Text>
                        <Image source={Arrow} style={styles.arrowIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            <Modal visible={isModalVisible} animationType="none" transparent={true}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                            <Text style={styles.closeText}>✕</Text>
                        </TouchableOpacity>
                        <Image source={Lock} style={styles.lockIcon} />
                        <Text style={styles.modalHeader}>Change Password</Text>
                        
                        <TextInput
                            style={styles.input}
                            placeholder="Old Password"
                            secureTextEntry={true}
                            value={oldPassword}
                            onChangeText={setOldPassword}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="New Password"
                            secureTextEntry={true}
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        
                        <TouchableOpacity style={styles.changePasswordButton} onPress={() => setModalChangePass(true)}>
                            <Text style={styles.buttonText}>Change Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Confirmation Modal for LogOut */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={modalLogout}
                onRequestClose={() => setModalLogout(false)} // Handle back button close
            >
                <View style={styles.modalLOBackground}>
                    <View style={styles.modalLOContainer}>
                        <Text style={styles.modalLOText}>Are you sure you want to logout?</Text>
                        
                        {/* Modal Buttons */}
                        <View style={styles.modalLOButtons}>
                            <TouchableOpacity 
                                style={styles.cancelButton} 
                                onPress={() => setModalLogout(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={styles.logoutButton} 
                                onPress={handleLogout}
                            >
                                <Text style={styles.logoutButtonText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Confirmation Modal for Change Password */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={modalChangePass}
                onRequestClose={() => setModalChangePass(false)} // Handle back button close
            >
                <View style={styles.modalLOBackground}>
                    <View style={styles.modalLOContainer}>
                        <Text style={styles.modalLOText}>Are you sure you want to change your password?</Text>
                        
                        {/* Modal Buttons */}
                        <View style={styles.modalLOButtons}>
                            <TouchableOpacity 
                                style={styles.cancelButton} 
                                onPress={() => setModalChangePass(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={styles.logoutButton} 
                                onPress={handleUpdatePassword}
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
    combinedBox: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 40,
        marginTop: 100, // Adjust margin to position it below the customBox
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        zIndex: 2, // Ensure it stays on top of the customBox
    },
    profileBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilePic: {
        width: 60,
        height: 60,
        borderRadius: 100,
        marginRight: 20,
        borderWidth: 1,
        borderColor: '#000',
    },
    profileText: {
        color: '#800000',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5,
    },
    underline: {
        height: 2,
        backgroundColor: '#D3D3D3',
        width: '100%',
        marginVertical: 15,
    },
    detailsBox: {
        marginBottom: 20,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    optionText: {
        fontSize: 16,
        color: '#000',
    },
    arrowIcon: {
        width: 20,
        height: 20,
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
    closeButton: {
        alignSelf: 'flex-end',
    },
    closeText: {
        fontSize: 20,
        color: '#000',
    },
    lockIcon: {
        width: 40,
        height: 40,
        marginBottom: 10,
    },
    modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    changePasswordButton: {
        width: '100%',
        backgroundColor: '#800000',
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondBoxText: {
        color: '#2b0100',
        fontSize: 12,
        maxWidth: '100%',
        //textAlign: 'center',
    },
    userDetails: {
        flexDirection: 'column',
    },
    textAdjust: {
        fontSize: 10, 
        flexShrink: 1, 
        color: '#2B0100',
        maxWidth: '90%',
        //textAlign: 'center'
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