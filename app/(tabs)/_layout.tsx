import { Tabs } from 'expo-router';
import { useAuthStore } from 'store/auth';
import { router } from 'expo-router';
import { Platform } from 'react-native';

export default function TabsLayout() {
  const { token } = useAuthStore();

  if (!token) {
    router.replace('/(auth)/login');
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tarefas',
          tabBarIcon: () => '📋',
        }}
      />
      <Tabs.Screen
        name="new-task"
        options={{
          title: 'Nova Tarefa',
          tabBarIcon: () => '➕',
        }}
      />
      <Tabs.Screen
        name="edit-task/[id]"
        options={{
          title: 'Editar Tarefa',
          tabBarIcon: () => '✏️',
        }}
      />
    </Tabs>
  );
}
