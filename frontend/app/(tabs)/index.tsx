import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "@/src/shared/constants/colors";
import { router } from "expo-router";
import Button from "@/src/shared/ui/Button";
import "../../global.css";
import ThemeToggle from "@/src/shared/components/ThemeToggle";

export default function HomeScreen() {
  return (
    <>
      <ScrollView
        className="flex-1 bg-slate-950"
        contentContainerStyle={{ padding: 16 }}
      >
        {/* Header: Search + Login + Theme Toggle */}
        <View className="flex-row items-center justify-between gap-2 mb-4">
          <TextInput
            placeholder="Search leagues, courses, topics..."
            placeholderTextColor={COLORS.textSecondary}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
          />
          <TouchableOpacity
            onPress={() => router.push("/(auth)/login")}
            className="bg-blue-600 px-3 py-2 rounded-lg"
          >
            <Text className="text-white font-bold">Login</Text>
          </TouchableOpacity>
          <ThemeToggle />
        </View>

        {/* Hero / Intro Section */}
        <View className="bg-slate-900 border border-slate-700 rounded-lg p-3 mb-4">
          <Text className="text-orange-500 text-2xl font-bold">
            Let&apos;s Make
          </Text>
          <Text className="text-cyan-400 text-3xl font-bold">Freshers</Text>
          <Text className="text-cyan-400 text-3xl font-bold">Employable!</Text>
          <Text className="text-gray-300 mt-2">
            Connecting Colleges, Candidates, and Corporates through an
            innovative Tech Platform
          </Text>
          <View className="flex-row gap-2 mt-3">
            <View className="flex-1">
              <Button
                title="Start Journey"
                onPress={() => {}}
                color={COLORS.orange}
                fontSize={14}
              />
            </View>
            <View className="flex-1">
              <Button
                title="Contact Us"
                onPress={() => {}}
                color={COLORS.orange}
                fontSize={14}
              />
            </View>
          </View>
        </View>

        {/* Explore Leagues Section */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-white text-lg font-bold">
              Explore Leagues
            </Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/leagues")}>
              <Text className="text-orange-500 font-semibold">View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {/* League Card 1 */}
            <View className="w-80 bg-slate-900 border border-slate-700 rounded-lg p-3 mr-3">
              <View className="flex-row justify-start mb-2">
                <Text className="bg-orange-500 text-white px-2 py-1 rounded font-bold text-xs">
                  Beginner
                </Text>
              </View>
              <Text className="text-white font-bold text-base">
                Python: The First Steps of a Developer
              </Text>
              <Text className="text-gray-400 text-sm mt-2">
                11 Missions • 67 Quests
              </Text>
              <View className="mt-3">
                <Button
                  title="Explore League"
                  onPress={() => router.push("/(tabs)/leagues")}
                  color={COLORS.orange}
                  fontSize={12}
                />
              </View>
            </View>

            {/* League Card 2 */}
            <View className="w-80 bg-slate-900 border border-slate-700 rounded-lg p-3 mr-3">
              <View className="flex-row justify-start mb-2">
                <Text className="bg-orange-500 text-white px-2 py-1 rounded font-bold text-xs">
                  Beginner
                </Text>
              </View>
              <Text className="text-white font-bold text-base">
                HTML Foundations
              </Text>
              <Text className="text-gray-400 text-sm mt-2">
                8 Missions • 21 Quests
              </Text>
              <View className="mt-3">
                <Button
                  title="Explore League"
                  onPress={() => router.push("/(tabs)/leagues")}
                  color={COLORS.orange}
                  fontSize={12}
                />
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Learn. Compete. Win. Section */}
        <View className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-4">
          <Text className="text-yellow-400 text-lg font-bold">
            🏆 Learn. Compete. Win.
          </Text>
          <Text className="text-gray-300 text-sm mt-2">
            Join 50,000+ learners earning XP, unlocking achievements, and
            winning real rewards
          </Text>
        </View>

        {/* Top Learners Section */}
        <View className="mb-4">
          <Text className="text-yellow-400 text-lg font-bold mb-3">
            🏆 Top Learners
          </Text>

          {[
            { rank: 1, name: "Vedant Bende", xp: "64,371 XP", avatar: "VB" },
            { rank: 2, name: "Ankit Agrahari", xp: "44,703 XP", avatar: "AA" },
            {
              rank: 3,
              name: "Mukesh Choudhary",
              xp: "43,297 XP",
              avatar: "MC",
            },
          ].map((learner) => (
            <View
              key={learner.rank}
              className="bg-slate-900 border border-orange-600 rounded-lg p-3 mb-2 flex-row items-center"
            >
              <View className="w-8 h-8 bg-orange-500 rounded-full items-center justify-center mr-3">
                <Text className="text-white font-bold text-xs">
                  #{learner.rank}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold">{learner.name}</Text>
                <Text className="text-gray-400 text-xs">⭐ {learner.xp}</Text>
              </View>
            </View>
          ))}

          <View className="mt-3">
            <Button
              title="Climb Leaderboard →"
              onPress={() => {}}
              color={COLORS.orange}
              fontSize={14}
            />
          </View>
        </View>

        {/* Gamification Features Grid */}
        <View className="mb-4">
          <Text className="text-white text-lg font-bold mb-3">
            Features & Rewards
          </Text>

          <View className="flex-row justify-between mb-3">
            <View className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-3 mr-2 items-center">
              <Text className="text-yellow-400 text-2xl mb-2">⚡</Text>
              <Text className="text-white text-xs font-bold text-center">
                Earn XP
              </Text>
              <Text className="text-gray-400 text-xs text-center">
                Gain experience with every quest
              </Text>
            </View>
            <View className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-3 mr-2 items-center">
              <Text className="text-pink-400 text-2xl mb-2">🎯</Text>
              <Text className="text-white text-xs font-bold text-center">
                Climb Leaderboard
              </Text>
              <Text className="text-gray-400 text-xs text-center">
                Win prizes in league competitions
              </Text>
            </View>
            <View className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-3 items-center">
              <Text className="text-cyan-400 text-2xl mb-2">🎖️</Text>
              <Text className="text-white text-xs font-bold text-center">
                Achievements
              </Text>
              <Text className="text-gray-400 text-xs text-center">
                Proof of your learning journey
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between mb-3">
            <View className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-3 mr-2 items-center">
              <Text className="text-green-400 text-2xl mb-2">🏆</Text>
              <Text className="text-white text-xs font-bold text-center">
                Earn Badges
              </Text>
              <Text className="text-gray-400 text-xs text-center">
                Flex at your public profile
              </Text>
            </View>
            <View className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-3 mr-2 items-center">
              <Text className="text-purple-400 text-2xl mb-2">👥</Text>
              <Text className="text-white text-xs font-bold text-center">
                Community
              </Text>
              <Text className="text-gray-400 text-xs text-center">
                Connect with learners
              </Text>
            </View>
            <View className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-3 items-center">
              <Text className="text-red-400 text-2xl mb-2">🔥</Text>
              <Text className="text-white text-xs font-bold text-center">
                Win Rewards
              </Text>
              <Text className="text-gray-400 text-xs text-center">
                Redeem real prizes
              </Text>
            </View>
          </View>
        </View>

        {/* Start Learning CTA */}
        <View className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg p-4 mb-4">
          <Text className="text-white font-bold text-lg">
            Start Learning Now
          </Text>
          <Text className="text-gray-100 text-sm mt-2">
            Unlock exclusive rewards, premium mentorship access, and industry
            exposure by reaching the top of our gamified leaderboard.
          </Text>
          <View className="flex-row flex-wrap mt-3 gap-2">
            <Button
              title="Explore Leagues Now →"
              onPress={() => router.push("/(tabs)/leagues")}
              color={COLORS.white}
              fontSize={12}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
