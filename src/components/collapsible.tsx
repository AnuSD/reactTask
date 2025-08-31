import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Dummy data for expanded list
const extraData = [
  { id: "2", name: "Someone", desc: "Lorem ipsum" },
  { id: "3", name: "Someone else", desc: "Lorem ipsum", iconRow: "1.png" },
  { id: "4", name: "Who else", desc: "@Someone else Lorem Indeed!", iconRow: "2.png" },
  { id: "5", name: "No one", desc: "Cool!", iconRow: "1.png,2.png" },
];

const CollapsibleCard: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 400,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false, // maxHeight animation needs false
    }).start();
    setExpanded(!expanded);
  };

  // Animated expand/collapse style
  const animatedStyle = {
    maxHeight: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 500], // adjust height as needed
    }),
  };

  // Render icons row from string "1.png,2.png"
  const renderIcons = (iconRow?: string) => {
    if (!iconRow) return null;
    const icons = iconRow.split(",");
    return (
      <View style={styles.iconRow}>
        {icons.map((icon, idx) => (
          <Image
            key={idx}
            source={
              icon.trim() === "1.png"
                ? require("@/assets/images/1.png")
                : require("@/assets/images/2.png")
            }
            style={styles.iconImg}
          />
        ))}
      </View>
    );
  };

  // Render description with @mentions styled
  const renderDescription = (text: string) => {
    const parts = text.split(/(@\w+)/g); // split into ["", "@Someone", " rest..."]
    return (
      <Text style={styles.desc}>
        {parts.map((part, idx) =>
          part.startsWith("@") ? (
            <Text key={idx} style={styles.mention}>
              {part}
            </Text>
          ) : (
            <Text key={idx}>{part}</Text>
          )
        )}
      </Text>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Top Header */}
      <View style={styles.smallContainer}>
        <Text style={styles.header}>Prototype</Text>
        <Text style={styles.subHeader}>Collapsible component</Text>
      </View>

      <View style={styles.wrapper}>
        {/* Main Card */}
        <View style={styles.card}>
          <View style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Cool guy</Text>
            {renderDescription(
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam urna orci, blandit eu ante nec, sodales vehicula nisi."
            )}
            <View style={styles.iconRow}>
              <Image source={require("@/assets/images/1.png")} style={styles.iconImg} />
              <Image source={require("@/assets/images/2.png")} style={styles.iconImg} />
            </View>
          </View>
        </View>

        {/* Expandable list */}
        <Animated.View style={[styles.expandArea, animatedStyle]}>
          <FlatList
            data={extraData}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.avatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  {renderDescription(item.desc)}
                  {renderIcons(item.iconRow)}
                </View>
              </View>
            )}
          />
        </Animated.View>

        {/* Toggle Button */}
        <TouchableOpacity onPress={toggleExpand} style={styles.toggle}>
          <Text style={styles.toggleText}>{expanded ? "Close" : "Open"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CollapsibleCard;

const styles = StyleSheet.create({
  smallContainer: {
    margin: 20,
  },
  header: {
    fontWeight: "900",
    fontSize: 36,
    marginBottom: 10,
    color: "#000",
  },
  subHeader: {
    fontWeight: "400",
    fontSize: 24,
    color: "#000",
  },
  wrapper: {
    margin: 20,
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 12,
    backgroundColor: "#ddd",
    overflow: "hidden",
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    borderBottomColor: "rgba(255, 0, 0, 0.1)",
    borderBottomWidth: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: "red",
    borderRadius: 8,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  iconImg: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  desc: {
    fontSize: 14,
    color: "#333",
  },
  mention: {
    color: "rgba(12, 119, 248, 1)",
    fontWeight: "600",
  },
  expandArea: {
    overflow: "hidden",
  },
  toggle: {
    alignItems: "center",
    paddingBottom: 10,
  },
  toggleText: {
    color: "red",
    fontWeight: "bold",
    borderBottomColor: "rgba(255, 0, 0, 1)",
    borderBottomWidth: 1,
  },
});
