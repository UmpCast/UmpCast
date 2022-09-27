import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'

export default async function pickImage(aspect: [number, number] = [1, 1]) {
    return launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        aspect,
        quality: 1
    })
}
