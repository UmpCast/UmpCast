import * as ImagePicker from 'expo-image-picker'
import {
    FormControl,
    HStack,
    InputGroup,
    InputLeftAddon,
    VStack,
    Text,
    Button
} from 'native-base'
import { Control, Controller, ControllerRenderProps } from 'react-hook-form'
import { Image } from 'react-native'

import HFErrorMessage from '@/lib/HF/ErrorMessage'
import HFFormControl from '@/lib/HF/FormControl'
import HFInput from '@/lib/HF/Input'

import { OrgEditInput } from './useForm'

const pickLogo = async () =>
    ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        quality: 1
    })

export interface OrgEditFormProps {
    control: Control<OrgEditInput>
    logo: JSX.Element
}

export default function OrgEditForm({ control, logo }: OrgEditFormProps) {
    const onUploadPress = async (field: ControllerRenderProps) => {
        const pickerResult = await pickLogo()
        if (pickerResult.cancelled) return
        field.onChange(pickerResult.uri)
    }

    return (
        <VStack space={4}>
            <Controller
                control={control}
                name="logoB64"
                render={(props) => {
                    const { value } = props.field
                    return (
                        <HStack alignItems="center" space={4}>
                            {value ? (
                                <Image
                                    source={{ uri: value }}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 5
                                    }}
                                />
                            ) : (
                                logo
                            )}
                            <VStack>
                                <Text fontWeight="medium">Logo</Text>
                                <Button
                                    colorScheme="indigo"
                                    m={0}
                                    onPress={() => onUploadPress(props.field)}
                                    p={0}
                                    variant="link"
                                >
                                    Upload new image
                                </Button>
                            </VStack>
                        </HStack>
                    )
                }}
            />
            <Controller
                control={control}
                name="title"
                render={(props) => (
                    <HFFormControl {...props} flex={1}>
                        <FormControl.Label isRequired>Title</FormControl.Label>
                        <HFInput {...props} />
                        <HFErrorMessage {...props} />
                    </HFFormControl>
                )}
            />
            <Controller
                control={control}
                name="description"
                render={(props) => (
                    <HFFormControl {...props}>
                        <FormControl.Label>Description</FormControl.Label>
                        <HFInput {...props} />
                        <HFErrorMessage {...props} />
                    </HFFormControl>
                )}
            />
            <Controller
                control={control}
                name="email"
                render={(props) => (
                    <HFFormControl {...props}>
                        <FormControl.Label>Email</FormControl.Label>
                        <HFInput {...props} />
                        <HFErrorMessage {...props} />
                    </HFFormControl>
                )}
            />
            <Controller
                control={control}
                name="websiteUrl"
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
