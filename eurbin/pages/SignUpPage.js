import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Checkbox } from 'react-native-paper';

const SignUp = ({ navigation }) => {
  // State for form fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // State for dropdowns
  const [role, setRole] = useState(null);
  const [roleOpen, setRoleOpen] = useState(false);
  const [department, setDepartment] = useState(null);
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [yearLevel, setYearLevel] = useState(null);
  const [yearLevelOpen, setYearLevelOpen] = useState(false);
  const [program, setProgram] = useState(null);
  const [programOpen, setProgramOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleContinue = () => {
    if (isChecked) {
      // Handle continue action
      alert('You have accepted the Terms and Conditions.');
    }
  };

  // Data for dropdowns
  const roleOptions = [
    { label: 'Student', value: 'Student' },
    { label: 'Staff', value: 'Staff' },
    { label: 'ETEEAP', value: 'ETEEAP' },
    { label: 'Faculty', value: 'Faculty' },
  ];

  const departmentOptions = [
    { label: 'CCMS', value: 'CCMS' },
    { label: 'CIHTM', value: 'CIHTM' },
    { label: 'CNAHS', value: 'CNAHS' },
    { label: 'CME', value: 'CME' },
    { label: 'CED', value: 'CED' },
    { label: 'CCJC', value: 'CCJC' },
    { label: 'CAS', value: 'CAS' },
    { label: 'CAFA', value: 'CAFA' },
    { label: 'CBA', value: 'CBA' },
    { label: 'CENG', value: 'CENG' },
  ];

  const yearLevelOptions = [
    { label: '1st Year', value: '1st Year' },
    { label: '2nd Year', value: '2nd Year' },
    { label: '3rd Year', value: '3rd Year' },
    { label: '4th Year', value: '4th Year' },
    { label: '5th Year', value: '5th Year' },
  ];

  // Department and Programs Data
  const departmentOptionsData = [
    { label: 'CCMS', programs: ['Entertainment & Multimedia Computing', 'Computer Science', 'Information Technology'] },
    { label: 'CIHTM', programs: ['Hospitality Management', 'Tourism Management'] },
    { label: 'CNAHS', programs: ['Medical Technology', 'Nursing'] },
    { label: 'CME', programs: ['Marine Engineering', 'Marine Transportation'] },
    { label: 'CED', programs: ['Culture and Arts Education', 'Elementary Education', 'Library and Information Science', 'Physical Education', 'Secondary Education'] },
    { label: 'CCJC', programs: ['Criminology'] },
    { label: 'CAS', programs: ['Communication', 'English Language', 'Political Science', 'Biology', 'Economics', 'Environmental Science', 'Psychology', 'Public Administration'] },
    { label: 'CAFA', programs: ['Fine Arts', 'Architecture'] },
    { label: 'CBA', programs: ['Accountancy', 'Business Administration', 'Management Accounting', 'Office Administration'] },
    { label: 'CENG', programs: ['Civil Engineering', 'Computer Engineering', 'Electrical Engineering', 'Electronics Engineering', 'Geodetic Engineering', 'Industrial Engineering', 'Mechanical Engineering'] },
  ];

  const [programOptions, setProgramOptions] = useState([]);

  // Updated function using useCallback to handle role change
  const handleRoleChange = useCallback((value) => {
  setRole(value);
  setDepartment(null);
  setYearLevel(null);
  setProgram(null);
  if (value === 'ETEEAP' || value === 'Staff') {
    setDepartment(null);
    setYearLevel(null);
    setProgram(null);
  }
  }, []);

  // Updated function using useCallback to handle department change
  const handleDepartmentChange = useCallback((value) => {
  setDepartment(value);
  setProgram(null);
  setYearLevel(null);
  }, []);

// Update program options based on selected department
useEffect(() => {
  const selectedDept = departmentOptions.find((dept) => dept.value === department);
  const deptData = departmentOptionsData.find((dept) => dept.label === selectedDept?.label);
  setProgramOptions(deptData ? deptData.programs.map((prog) => ({ label: prog, value: prog })) : []);
}, [department]);


// Updated handleSubmit function
const handleSubmit = async () => {
    if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
    } 
    if (!role) {
        setErrorMessage('Please select a role');
        return;
    } 

    const newUser = {
        userName: username,
        email: email,
        password: password,
        role: role,
        department: role === 'ETEEAP' || role === 'Staff' ? null : department, // Set department to null if role is ETEEAP or Staff
        program: role === 'ETEEAP' || role === 'Staff' || role === 'Faculty'? null : program, // Set program to null if role is ETEEAP or Staff
        yearLevel: role === 'ETEEAP' || role === 'Staff' || role === 'Faculty' ? null : yearLevel, // Set yearLevel to null if role is ETEEAP or Staff
        smartPoints: 0, // Default values or handle them as needed
        plasticBottle: 0,
        rank: 0,
        co2: 0,
        accumulatedSP: 0,
    };

    // Proceed with the fetch request as before
    try {
        const response = await fetch('https://eurbin.vercel.app/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('User created:', data);
        navigation.navigate('Otp', { email: email }); // Redirect to login after successful registration
    } catch (error) {
        setErrorMessage('Failed to create account: ' + error.message);
    }
};

return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.backgroundCircle} />
      
      <View style={styles.nameRole1}>
      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
      />

      {/* Role Dropdown */}
    {/* Role Dropdown */}
<View style={{ zIndex: 1000 }}>
    <DropDownPicker
        open={roleOpen}
        value={role}
        items={roleOptions}
        setOpen={setRoleOpen}
        setValue={handleRoleChange}
        placeholder="Role" 
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />
</View></View>

{/* Conditional rendering for dropdowns */}
{role === 'Student' && (
<>
  <View style={styles.nameRole1}>
    <View style={{ zIndex: departmentOpen ? 800 : 1 }}>
      <DropDownPicker
            open={departmentOpen}
            value={department}
            items={departmentOptions}
            setOpen={setDepartmentOpen}
            setValue={handleDepartmentChange}
            placeholder="Choose Department"
            style={styles.dropdown2}
            dropDownContainerStyle={styles.dropdownContainer}
          />
    </View>

    <View style={{ zIndex: yearLevelOpen ? 700 : 1 }}>
    <DropDownPicker
            open={yearLevelOpen}
            value={yearLevel}
            items={yearLevelOptions}
            setOpen={setYearLevelOpen}
            setValue={setYearLevel}
            placeholder="Year Level"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
    </View>
  </View>

  <View style={{ zIndex: programOpen ? 600 : 1 }}>
  <DropDownPicker
            open={programOpen}
            value={program}
            items={programOptions}
            setOpen={setProgramOpen}
            setValue={setProgram}
            placeholder="Program"
            style={styles.dropdown3}
            dropDownContainerStyle={styles.dropdownContainer}
            disabled={!department}
            placeholderStyle={{
              color: department ? '#000' : '#d3d3d3', 
            }}
            arrowIconStyle={{
              tintColor: department ? '#000' : '#d3d3d3', 
            }}
          />
  </View>
</>
)}

{role === 'Faculty' && (
<View style={{ zIndex: departmentOpen ? 900 : 1 }}>
  <DropDownPicker
          open={departmentOpen}
          value={department}
          items={departmentOptions}
          setOpen={setDepartmentOpen}
          setValue={setDepartment}
          placeholder="Choose Department"
          style={styles.dropdown3}
          dropDownContainerStyle={styles.dropdownContainer}
        />
</View>
)}

      <TextInput
        style={styles.input1}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
   
      />

  <View style={styles.nameRole}>
      <TextInput
        style={styles.input2}
        placeholder="Enter Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input2}
        placeholder="Confirm Password"
        value={confirmPassword}
        secureTextEntry
        onChangeText={setConfirmPassword}
      />
</View>

<View style={styles.checkboxContainer}>
      <Checkbox
        status={isChecked ? 'checked' : 'unchecked'}
        onPress={handleCheckboxChange}
        color="#800000"
      />
      <Text style={styles.label}>
        I agree to the{' '}
        <Text style={styles.link} onPress={() => alert('Show Terms & Conditions')}>
          Terms and Conditions
        </Text>
      </Text>
    </View>

<View style={styles.caButton}>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <Text style={styles.loginPrompt}>
        Have an account?
        <Text onPress={() => navigation.navigate('Login')} style={styles.loginLink}> Log in</Text>
      </Text>
      </View>
    </KeyboardAvoidingView>

  );
};
const styles = StyleSheet.create({
  backgroundCircle: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#800000',
    top: -100,
    left: -100,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    width: 180,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    zIndex: 1
  },
  input1: {
    height: 50,
    width: 310,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative',  // Ensure proper stacking
    zIndex: 1,  // Lower z-index than dropdowns
  
   
  },
  input2: {
    height: 50,
    width: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative',  // Ensure proper stacking
    zIndex: 1,  // Lower z-index than dropdowns


  },
  dropdown: {
    height: 40,
    width: 120,
    marginBottom: 20,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  dropdown2: {
    height: 40,
    width: 180,
    marginBottom: 30,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  dropdown3: {
    height: 40,
    width: 310,
    marginBottom: 30,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  dropdownContainer: {
    borderColor: '#ccc',
    position: 'absolute', 
  },
  button: {
    backgroundColor: '#800000',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginPrompt: {
    marginTop: 20,
    color: '#2b0100',
  },
  loginLink: {
    color: '#800000',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  nameRole: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 10,
    width: '100%',
    zIndex:1,
  
  },
  nameRole1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 10,
    width: '100%',
    zIndex:1000
  },
  caButton: {
    position: 'absolute',
    top: 600,
    width: '100%',
    alignItems: 'center',
  },
  disabledDropdown: {
    backgroundColor: '#fff', 
    borderColor: '#d3d3d3',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    alignSelf: 'flex-start',
  },
  label: {
    marginLeft: 5,
    color: '#333',
  },
  link: {
    color: '#800000',
    textDecorationLine: 'underline',
  },
});

export default SignUp;