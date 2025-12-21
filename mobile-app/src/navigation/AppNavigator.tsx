import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import Splash1 from '../screens/Splash1';
import Splash2 from '../screens/Splash2';
import Home from '../screens/Home';
import Scan from '../screens/Scan';
import Learn from '../screens/Learn';
import PlantDetail from '../screens/PlantDetail';
import About from '../screens/About';
import { Colors } from '../theme/colors';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
            <Stack.Navigator
                initialRouteName="Splash1"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}>
                <Stack.Screen
                    name="Splash1"
                    component={Splash1}
                    options={{ headerShown: false }}
                />
                {/* 
                <Stack.Screen
                    name="Splash2"
                    component={Splash2}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Scan"
                    component={Scan}
                    options={{ title: 'Scanner une plante' }}
                />
                <Stack.Screen
                    name="Learn"
                    component={Learn}
                    options={{ title: 'Apprendre' }}
                />
                <Stack.Screen
                    name="PlantDetail"
                    component={PlantDetail}
                    options={({ route }) => ({ title: route.params.plant.name })}
                />
                <Stack.Screen
                    name="About"
                    component={About}
                    options={{ title: 'À propos' }}
                /> 
                */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
