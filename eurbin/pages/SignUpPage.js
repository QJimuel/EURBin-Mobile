import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

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

  const [programOptions, setProgramOptions] = useState([]);

  // Update program options based on selected department
  useEffect(() => {
    const selectedDept = departmentOptions.find((dept) => dept.value === department);
    const deptData = departmentOptionsData.find((dept) => dept.label === selectedDept?.label);
    if (deptData) {
      const programs = deptData.programs.map((prog) => ({ label: prog, value: prog }));
      setProgramOptions(programs);
    } else {
      setProgramOptions([]);
      setProgram(null);
    }
  }, [department]);

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
        navigation.navigate('Login'); // Redirect to login after successful registration
    } catch (error) {
        setErrorMessage('Failed to create account: ' + error.message);
    }
};


return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
      />

      {/* Role Dropdown */}
      <View style={{ zIndex: 1000 }}>
        <DropDownPicker
          open={roleOpen}
          value={role}
          items={roleOptions}
          setOpen={setRoleOpen}
          setValue={setRole}
          placeholder="Select Role"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          onChangeValue={(value) => {
            setRole(value);
            setDepartment(null);
            setYearLevel(null);
            setProgram(null);
            // Reset values based on selected role
            if (value === 'ETEEAP' || value === 'Staff') {
              setDepartment(null); // Clear department if ETEEAP or Staff
              setYearLevel(null); // Clear year level if ETEEAP or Staff
              setProgram(null); // Clear program if ETEEAP or Staff
            }
          }}
        />
      </View>

      {/* Conditional rendering for dropdowns */}
      {role === 'Student' && (
        <>
          <View style={{ zIndex: 900 }}>
            <DropDownPicker
              open={departmentOpen}
              value={department}
              items={departmentOptions}
              setOpen={setDepartmentOpen}
              setValue={setDepartment}
              placeholder="Choose Department"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              onChangeValue={(value) => {
                setDepartment(value);
                setProgram(null); // Reset program when department changes
                setYearLevel(null); // Reset year level when department changes
              }}
            />
          </View>

          <View style={{ zIndex: 800 }}>
            <DropDownPicker
              open={yearLevelOpen}
              value={yearLevel}
              items={yearLevelOptions}
              setOpen={setYearLevelOpen}
              setValue={setYearLevel}
              placeholder="Year Level"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              onChangeValue={(value) => {
                setYearLevel(value);
              }}
            />
          </View>

          <View style={{ zIndex: 700 }}>
            <DropDownPicker
              open={programOpen}
              value={program}
              items={programOptions}
              setOpen={setProgramOpen}
              setValue={setProgram}
              placeholder="Program"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              disabled={!department}
              onChangeValue={(value) => {
                setProgram(value);
              }}
            />
          </View>
        </>
      )}

      {role === 'Faculty' && (
        <View style={{ zIndex: 900 }}>
          <DropDownPicker
            open={departmentOpen}
            value={department}
            items={departmentOptions}
            setOpen={setDepartmentOpen}
            setValue={setDepartment}
            placeholder="Choose Department"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            onChangeValue={(value) => {
                setDepartment(value);
              }}
          />
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        secureTextEntry
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <Text style={styles.loginPrompt}>
        Have an account?
        <Text onPress={() => navigation.navigate('Login')} style={styles.loginLink}> Log in</Text>
      </Text>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  dropdown: {
    height: 40,
    width: '100%',
    marginBottom: 20,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  dropdownContainer: {
    borderColor: '#ccc',
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
  },
  loginLink: {
    color: '#800000',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default SignUp;
