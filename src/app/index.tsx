import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Import the components you want to show
import CollapsibleComponent from "../components/collapsible";
import ThemePicker from "../components/themepicker";


const App = () => {
  const [selected, setSelected] = useState<"dropdown" | "themepicker" | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      {selected === null ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setSelected("dropdown")}
          >
            <Text style={styles.btnText}>DropdownAnimation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => setSelected("themepicker")}
          >
            <Text style={styles.btnText}>ThemePicker</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.componentContainer}>
          {selected === "dropdown" && <CollapsibleComponent />}
          {selected === "themepicker" && <ThemePicker />}
          <TouchableOpacity
            style={[styles.btn, { marginTop: 20 }]}
            onPress={() => setSelected(null)}
          >
            <Text style={styles.btnText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  buttonContainer: {
    width: "50%",
    gap: 16,
  },
  componentContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default App;
