import { Pressable } from 'native-base'
import { Image } from 'react-native'
import { ControllerRenderProps } from 'react-hook-form'
import * as ImagePicker from 'expo-image-picker'

const pickImage = async () => {
    return ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        quality: 1
    })
}

export default function OrgProfilePictureInput({
    field,
    url
}: {
    field: ControllerRenderProps<any>
    url: string
}) {
    const onPress = async () => {
        const result = await pickImage()
        console.log(result)
        if (result.cancelled) return
        const res = await fetch(result.uri)
        console.log(await res.blob())
        field.onChange(result.uri)
    }

    return (
        <Pressable onPress={onPress} testID={`${field.name}-input`}>
            <Image
                style={{
                    width: 50,
                    height: 50
                }}
                source={{ uri: field.value }}
            />
        </Pressable>
    )
}
