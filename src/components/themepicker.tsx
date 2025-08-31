import React, { createContext, useContext, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// -------------------------
// THEME DEFINITIONS
// -------------------------
const themes = {
  light: {
    pageBg: "#070707",
    cardBg: "#ffffff",
    panelBg: "#f2e6ff",
    frameRing: "#f8c8f8",
    swTop: "#ff5f8f",
    swBottom: "#e52d4e",
    pillLight: "#ff9deb",
    pillCrimson: "#e52d4e",
    titleColor: "#0b0b0b",
    muted: "#333333",
    textColor: "#111",
  },
  dark: {
    pageBg: "#020817",
    cardBg: "#0f172a",
    panelBg: "#0f172a",
    frameRing: "#1e293b",
    swTop: "#a21caf",
    swBottom: "#be123c",
    pillLight: "#1e293b",
    pillCrimson: "#dc2626",
    titleColor: "#f8fafc",
    muted: "#94a3b8",
    textColor: "#f1f5f9",
  },
  crimson: {
    pageBg: "#070707", // keep dark base
    cardBg: "#ffffff",
    panelBg: "#cfffff",
    frameRing: "#2fffff",
    swTop: "#00ffb6",
    swBottom: "#00ff78",
    pillLight: "#2fffff",
    pillCrimson: "#00ff78",
    titleColor: "#2fffff",
    muted: "#336677",
    textColor: "#002233",
  },
};

// -------------------------
// CONTEXT
// -------------------------
type ThemeContextType = {
  theme: keyof typeof themes;
  setTheme: React.Dispatch<React.SetStateAction<keyof typeof themes>>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<keyof typeof themes>("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// -------------------------
// COMPONENT
// -------------------------
const App = () => {
  return (
    <ThemeProvider>
      <MainCard />
    </ThemeProvider>
  );
};

const MainCard = () => {
  const { theme, setTheme } = useTheme();
  const colors = themes[theme];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.pageBg }]}>
      <View style={[styles.card, { backgroundColor: colors.cardBg }]}>
        <Text style={[styles.title, { color: colors.titleColor }]}>Prototype</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          theme and mode changer
        </Text>

        <Text style={[styles.lead, { color: colors.textColor }]}>
          Build a responsive interface that allows users to switch between predefined
          color themes and light/dark modes. All UI components should dynamically and
          elegantly adapt their appearance based on the active theme and mode.
        </Text>

        <View style={[styles.panel, { backgroundColor: colors.panelBg }]}>
          {/* Left Box */}
          <View
            style={[
              styles.leftBox,
              { borderColor: colors.frameRing, backgroundColor: colors.panelBg },
            ]}
          >
            <View style={[styles.smallBox, { backgroundColor: colors.swTop }]} />
            <View style={[styles.smallBox, { backgroundColor: colors.swBottom }]} />
          </View>

          {/* Right Box */}
          <View style={styles.rightBox}>
            <Text style={[styles.sampleTitle, { color: colors.textColor }]}>
              Sample Testing
            </Text>

            {/* Light/Dark Toggle */}
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: colors.pillLight }]}
              onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Text style={{ color: colors.textColor }}>
                {theme === "dark" ? "Dark" : "Light"}
              </Text>
            </TouchableOpacity>

            {/* Crimson Toggle */}
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: colors.pillCrimson }]}
              onPress={() => setTheme(theme === "crimson" ? "light" : "crimson")}
            >
              <Text style={{ color: "#fff" }}>
                {theme === "crimson" ? "Field" : "Crimson"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 28,
  },
  card: {
    width: 320,
    borderRadius: 24,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 16,
  },
  lead: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  panel: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    borderRadius: 14,
    padding: 12,
  },
  leftBox: {
    borderWidth: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingLeft: 40,
  },
  smallBox: {
    width: 50,
    height: 50,
    borderRadius: 6,
    margin: 1,
  },
  rightBox: {
    flexDirection: "column",
    gap: 10,
  },
  sampleTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  btn: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 28,
    alignItems: "center",
  },
});

export default App;
