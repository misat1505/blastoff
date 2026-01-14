import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: (props) => <HapticTab {...props} />,
        tabBarActiveTintColor: "#f97316",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: tabBarStyles.bar,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="launches"
        options={{
          title: "Launches",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="rocket" size={size ?? 28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const tabBarStyles = StyleSheet.create({
  bar: {
    height: 78,
    paddingTop: 8,
    paddingBottom: 8,
  },
});
