// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, TouchableOpacity } from 'react-native';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import RewardPage from './pages/RewardPage';
import User from './icons/user22.png'
import Menu from './icons/menu.png'; 
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import LeaderboardPage from './pages/LeaderboardPage';
import TransactionPage from './pages/TransactionPage';
import LocationPage from './pages/LocationPage';
import GoalPage from './pages/GoalPage';
import SettingsPage from './pages/SettingsPage';
import EditProfilePage from './pages/EditProfilePage';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUpPage';
import AchievementPage from './pages/AchievementPage';
import AnalyticsPage from './pages/AnalyticsPage';
import InstructionPage from './pages/InstructionPage';
import RecyclePage from './pages/RecyclePage';


import { UserProvider } from './pages/UserContext/User'; 
const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#800000',  
          },
          headerTintColor: '#fff',       
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
     
        <Stack.Screen 
          name="Home" 
          component={HomePage}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() =>   navigation.navigate('Setting')}>
                <Image
                  source={Menu}
                  style={{ width: 25, height: 25, marginLeft: 15 }}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Image
                  source={User}
                  style={{ width: 25, height: 25, marginRight: 15 }} 
                />
              </TouchableOpacity>
            ),
          })}
        />
        
        <Stack.Screen name="About" component={AboutPage} />
        <Stack.Screen name="Reward" component={RewardPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="Leaderboard" component={LeaderboardPage} />
        <Stack.Screen name="Transaction" component={TransactionPage} />
        <Stack.Screen name="Goal" component={GoalPage} />
        <Stack.Screen name="Location" component={LocationPage} />
        <Stack.Screen name="Setting" component={SettingsPage} />
        <Stack.Screen name="Edit Profile" component={EditProfilePage} />

        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Achievement" component={AchievementPage} />
        <Stack.Screen name="Analytics" component={AnalyticsPage} />
        <Stack.Screen name="Instruction" component={InstructionPage} />
        <Stack.Screen name="Recycle" component={RecyclePage} />
      
      </Stack.Navigator>
 
    </NavigationContainer>
    
    </UserProvider>
  );
}
