import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { COLORS } from '@/src/shared/constants/colors';
import Button from '@/src/shared/ui/Button';
import "../../global.css";

const mockLeagues = [
  {
    id: 'python-1',
    title: 'Python: The First Steps of a Developer',
    level: 'Beginner',
    missions: 11,
    quests: 67,
  },
  {
    id: 'html-1',
    title: 'HTML Foundations',
    level: 'Beginner',
    missions: 8,
    quests: 21,
  },
];

export default function LeaguesScreen() {
  return (
    <ScrollView className="flex-1 bg-slate-950" contentContainerStyle={{ padding: 16 }}>
      <Text className="text-white text-xl font-bold mb-3">Explore Leagues</Text>

      {mockLeagues.map((l) => (
        <View key={l.id} className="bg-slate-900 border border-slate-700 rounded-lg p-3 mb-3">
          <View className="flex-row justify-end">
            <Text className="bg-orange-500 text-white px-2 py-1 rounded font-bold text-xs">{l.level}</Text>
          </View>
          <Text className="text-white text-base font-bold mt-2">{l.title}</Text>
          <View className="flex-row justify-between mt-2">
            <Text className="text-gray-400">{l.missions} Missions</Text>
            <Text className="text-gray-400">{l.quests} Quests</Text>
          </View>
          <View className="mt-3">
            <Button title="Explore League" onPress={() => {}} color={COLORS.orange} fontSize={14} />
          </View>
        </View>
      ))}

    </ScrollView>
  );
}
