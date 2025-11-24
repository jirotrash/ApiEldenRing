import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { EldenRingHome } from '../screens/eldenring/EldenRingHome';
import { EldenRingList } from '../screens/eldenring/EldenRingList';
import { EldenRingSearch } from '../screens/eldenring/EldenRingSearch';
import { EldenRingContentType } from '../interfaces/eldenRingInterfaces';

// Tipos para la navegación
export type EldenRingStackParams = {
  EldenRingHome: undefined;
  EldenRingList: {
    contentType: EldenRingContentType;
    title: string;
  };
  EldenRingSearch: undefined;
};

const Stack = createStackNavigator<EldenRingStackParams>();

export const EldenRingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F5F5F5' },
      }}
    >
      <Stack.Screen 
        name="EldenRingHome" 
        component={EldenRingHome}
        options={{
          title: 'Elden Ring',
        }}
      />
      <Stack.Screen 
        name="EldenRingList" 
        component={EldenRingList}
        options={({ route }) => ({
          title: route.params?.title || 'Lista',
        })}
      />
      <Stack.Screen 
        name="EldenRingSearch" 
        component={EldenRingSearch}
        options={{
          title: 'Búsqueda',
        }}
      />
    </Stack.Navigator>
  );
};