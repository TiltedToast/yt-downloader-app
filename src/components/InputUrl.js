import { View, TextInput, Button, TouchableHighlight } from "react-native";
import { useState } from "react";
import { downloadSong } from "../downloader.js";
import { styles } from "../styles.js";

export default function InputUrl(props) {
    const [url, setUrl] = useState("");

    return (
        <View style={styles.titleText}>
            <TextInput
                style={styles.inputForm}
                placeholder="Enter your Youtube URL here!"
                placeholderTextColor="rgba(255,255,255,0.7)"
                defaultValue={url}
                onChangeText={(text) => setUrl(text)}
            />
            <TouchableHighlight style={styles.button}>
                <Button title="Download" onPress={async () => await handleSubmit(url)} />
            </TouchableHighlight>
        </View>
    );
}

async function handleSubmit(url) {
    await downloadSong(url);
}
