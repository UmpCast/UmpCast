import * as ImagePicker from 'expo-image-picker'
import { Pressable } from 'native-base'
import { ControllerRenderProps } from 'react-hook-form'

const pickImage = async () =>
    ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        quality: 1
    })

export interface OrgEditLogoInputProps {
    field: ControllerRenderProps<any>
    children: React.ReactNode
}

export default function OrgEditLogoInput({
    field,
    children
}: OrgEditLogoInputProps) {
    const onPress = async () => {
        const result = await pickImage()
        if (result.cancelled) return
        field.onChange(result.uri)
    }

    return (
        <Pressable onPress={onPress} testID={`${field.name}-input`}>
            {children}
        </Pressable>
    )
}
