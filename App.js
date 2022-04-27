import React from "react";
import { Text, View } from "react-native";
import InputUrl from "./src/components/InputUrl.js";
import { styles } from "./src/styles.js";

export default function App() {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>YT Downloader</Text>
            <InputUrl />
        </View>
    );
}
