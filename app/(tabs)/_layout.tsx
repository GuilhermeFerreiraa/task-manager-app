import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { Tabs } from 'expo-router';

import { Dashboard, PlusSvg, UserSvg } from '@/components/icons';

export default function TabLayout() {
  return (
    <BottomSheetModalProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#00ADEE',
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Board',
            tabBarIcon: ({ focused }) => (
              <Dashboard fill={focused ? '#00ADEE' : '#404040'} />
            ),
          }}
        />
        <Tabs.Screen
          name="new-task"
          options={{
            title: 'Nova Tarefa',
            tabBarIcon: ({ focused }) => (
              <PlusSvg fill={focused ? '#00ADEE' : '#404040'} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ focused }) => (
              <UserSvg fill={focused ? '#00ADEE' : '#404040'} />
            ),
          }}
        />
      </Tabs>
    </BottomSheetModalProvider>
  );
}
