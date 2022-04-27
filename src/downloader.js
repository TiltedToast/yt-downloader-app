import ytdl from "react-native-ytdl";
import RNFetchBlob from "rn-fetch-blob";
import { RNFFmpeg } from "react-native-ffmpeg";
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";

export async function downloadSong(url) {
    try {
        const [highestAudioObj, title] = await getSongInfo(url);

        const permissions = [PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE];

        for (const permission of permissions) {
            const status = await check(permission);

            if (status !== RESULTS.GRANTED) {
                const response = await request(permission, {
                    title: "YT Downloader",
                    message: "YT Downloader needs access to your storage to download the song.",
                    buttonPositive: "OK",
                    buttonNegative: "Cancel",
                    buttonNeutral: "Ask Me Later",
                });
                if (response !== RESULTS.GRANTED) {
                    console.log(`Missing permission: ${permission}`);
                }
            }
        }

        const { config, fs } = RNFetchBlob;
        const path = `${fs.dirs.MusicDir}/yt-downloader`;
        const filePath = `${path}/${title}.${highestAudioObj.container}`;
        const aacPath = `${path}/${title}.aac`;

        if ((await fs.exists(aacPath)) || (await fs.exists(filePath))) return alert("File already exists");

        if (!fs.exists(path)) await fs.mkdir(path);

        const options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: filePath,
                description: "Downloading...",
                mediaScannable: true,
            },
        };

        await config(options).fetch("GET", highestAudioObj.url);

        await RNFFmpeg.executeAsyncWithArguments([
            "-i",
            filePath,
            "-vn",
            "-ar",
            "44100",
            "-ac",
            "2",
            "-ab",
            "192k",
            aacPath,
        ]);

        await fs.unlink(filePath);

        alert("Finished downloading and converting");
    } catch (error) {
        console.log(error);
    }
}

async function getSongInfo(url) {
    try {
        const info = await ytdl.getInfo(url);
        const highestAudioObject = info.formats.reduce((prev, curr) => {
            return prev.audioBitrate > curr.audioBitrate ? prev : curr;
        });

        return [highestAudioObject, info.videoDetails.title];
    } catch (error) {
        console.log(error);
    }
}

// https://www.youtube.com/watch?v=V5M2WZiAy6k
