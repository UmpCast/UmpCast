import * as ImagePicker from 'expo-image-picker'
import {
    HStack,
    InputGroup,
    InputLeftAddon,
    VStack,
    Text,
    Button
} from 'native-base'
import { Control, ControllerRenderProps } from 'react-hook-form'
import { Image } from 'react-native'

import { OrgEditInput } from './useForm'

import * as Form from '@/components/Form'

const pickLogo = async () =>
    ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        quality: 1
    })

export interface OrgEditFormProps {
    control: Control<OrgEditInput>
    logo: React.ReactNode
}

export default function OrgEditForm({ control, logo }: OrgEditFormProps) {
    const handleUpload = async (field: ControllerRenderProps) => {
        const pickerResult = await pickLogo()
        if (pickerResult.cancelled) return
        field.onChange(pickerResult.uri)
    }

    return (
        <VStack space={4}>
            <Form.Controller
                control={control}
                name="logoB64"
                render={({ field }) => {
                    const { value } = field

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
                                    onPress={() => handleUpload(field)}
                                    m={0}
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
            <Form.Controller
                control={control}
                name="title"
                render={() => (
                    <Form.Control>
                        <Form.Label isRequired>Title</Form.Label>
                        <Form.Input />
                        <Form.ErrorMessage />
                    </Form.Control>
                )}
            />
            <Form.Controller
                control={control}
                name="description"
                render={() => (
                    <Form.Control>
                        <Form.Label>Description</Form.Label>
                        <Form.Input />
                        <Form.ErrorMessage />
                    </Form.Control>
                )}
            />
            <Form.Controller
                control={control}
                name="email"
                render={() => (
                    <Form.Control>
                        <Form.Label>Email</Form.Label>
                        <Form.Input />
                        <Form.ErrorMessage />
                    </Form.Control>
                )}
            />
            <Form.Controller
                control={control}
                name="websiteUrl"
                render={() => (
                    <Form.Control>
                        <Form.Label>Website</Form.Label>
                        <InputGroup>
                            <InputLeftAddon>https://</InputLeftAddon>
                            <Form.Input />
                        </InputGroup>
                        <Form.ErrorMessage />
                    </Form.Control>
                )}
            />
        </VStack>
    )
}
