import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { EldenRingNavigator } from './src/navigator/EldenRingNavigator';

const App = () => {
    return (
        <NavigationContainer>
            <EldenRingNavigator />
        </NavigationContainer>
    );
}

export default App;
