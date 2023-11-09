import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/Login/LoginScreen';
import SignUpScreen from "./src/screens/SingUp/SingUpScreen";
import HomeScreen from './src/screens/Home/HomeScreen';

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                {/* ... outras telas ... */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
