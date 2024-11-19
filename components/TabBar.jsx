import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Feather } from "@expo/vector-icons";

const TabBar = ({ state, descriptors, navigation }) => {
  const { colors } = useTheme(); // Get colors from theme

  const icons={
    index:(props)=><AntDesign name="home" size={24} color={greyColor} {...props} />,
    explore:(props)=><Feather name="compass" size={24} color={greyColor} {...props} />,
    create:(props)=><AntDesign name="pluscircleo" size={24} color={greyColor} {...props} />,
    profile:(props)=><AntDesign name="user" size={24} color={greyColor} {...props} />,
  }

  const primaryColor='#0891b2';
  const greyColor='#737373';

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const buildHref = (name, params) => {
          if (Platform.OS === "web") {
            return `/${name}${
              params ? `?${new URLSearchParams(params).toString()}` : ""
            }`;
          }
          return undefined;
        };

        return (
          <PlatformPressable
            key={route.key} // Ensure unique key
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            {
                icons[route.name]({
                    color: isFocused ? primaryColor : greyColor
                })
            }
            <Text style={{ color: isFocused ? primaryColor : greyColor, fontSize:11 }}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute", // Floating at the bottom
    bottom: 10, // Align at the very bottom
    flexDirection: "row", // Arrange items in a row
    justifyContent: "space-between", // Space between tab items
    alignItems: "center", // Center items vertically
    backgroundColor: "white", // Tab bar background
    paddingVertical: 10, // Padding inside the tab bar
    marginHorizontal: 20, // Margin on both sides of the tab bar
    borderRadius:20,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow positioning
    shadowOpacity: 0.25, // Shadow transparency
    shadowRadius: 4, // Shadow blur radius
    width: "calc(100% - 40px)", // Adjust width to remove horizontal margin (20px each side)
  },
  tabButton: {
    flex: 1, // Equally distribute space for each button
    alignItems: "center", // Center icon/text horizontally
    justifyContent: "center", // Center icon/text vertically
    gap:4
  },
});

export default TabBar;
