import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen       from '../screens/HomeScreen';
import DetalhesScreen   from '../screens/DetalhesScreen';
import CriarComidaScreen from '../screens/CriarComidaScreen';
import EditarComidaScreen from '../screens/EditarComidaScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#e63946' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home"   component={HomeScreen}        options={{ title: '🍽️ Comidas Típicas' }} />
        <Stack.Screen name="Detalhes" component={DetalhesScreen}  options={{ title: 'Detalhes' }} />
        <Stack.Screen name="Criar"  component={CriarComidaScreen} options={{ title: 'Nova Comida' }} />
        <Stack.Screen name="Editar" component={EditarComidaScreen} options={{ title: 'Editar Comida' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}