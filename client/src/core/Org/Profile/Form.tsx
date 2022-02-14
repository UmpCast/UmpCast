import HFErrorMessage from '@/lib/HF/ErrorMessage'
import HFInput from '@/lib/HF/Input'
import HFFormControl from '@/lib/HF/FormControl'
import {
    FormControl,
    InputGroup,
    InputLeftAddon,
    Pressable,
    VStack
} from 'native-base'
import { Image } from 'react-native'
import { Control, Controller } from 'react-hook-form'
import * as ImagePicker from 'expo-image-picker'

export type OrgProfileInput = Record<
    'title' | 'email' | 'websiteUrl' | 'description' | 'profilePictureUrl',
    string
>

export interface OrgProfileFormProps {
    control: Control<OrgProfileInput>
    currentProfilePictureUrl: string
}

const pickImage = async () => {
    return ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        quality: 1
    })
}

export default function OrgProfileForm({
    control,
    currentProfilePictureUrl
}: OrgProfileFormProps) {
    return (
        <VStack space={4}>
            <Controller
                name="profilePictureUrl"
                control={control}
                render={(props) => {
                    const onPress = async () => {
                        const result = await pickImage()
                        console.log(result)
                        if (result.cancelled) return
                        const res = await fetch(result.uri)
                        console.log(await res.blob())
                        props.field.onChange(result.uri)
                    }

                    return (
                        <Pressable
                            onPress={onPress}
                            testID={`${props.field.name}-input`}
                        >
                            <Image
                                style={{
                                    width: 50,
                                    height: 50
                                }}
                                source={{ uri: props.field.value }}
                            />
                        </Pressable>
                    )
                }}
            />

            <VStack space={2}>
                <Controller
                    name="title"
                    control={control}
                    render={(props) => (
                        <HFFormControl {...props}>
                            <FormControl.Label isRequired>
                                Title
                            </FormControl.Label>
                            <HFInput {...props} />
                            <HFErrorMessage {...props} />
                        </HFFormControl>
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    render={(props) => (
                        <HFFormControl {...props}>
                            <FormControl.Label>Description</FormControl.Label>
                            <HFInput {...props} />
                            <HFErrorMessage {...props} />
                        </HFFormControl>
                    )}
                />
            </VStack>
            <Controller
                name="email"
                control={control}
                render={(props) => (
                    <HFFormControl {...props}>
                        <FormControl.Label>Email</FormControl.Label>
                        <HFInput {...props} />
                        <HFErrorMessage {...props} />
                    </HFFormControl>
                )}
            />
            <Controller
                name="websiteUrl"
                control={control}
                render={(props) => (
                    <HFFormControl {...props}>
                        <FormControl.Label>Website</FormControl.Label>
                        <InputGroup>
                            <InputLeftAddon>https://</InputLeftAddon>
                            <HFInput {...props} flex={1} />
                        </InputGroup>
                        <HFErrorMessage {...props} />
                    </HFFormControl>
                )}
            />
        </VStack>
    )
}
