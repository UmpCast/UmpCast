import * as ImagePicker from 'expo-image-picker'
import { Button, VStack } from 'native-base'
import { useState } from 'react'

import * as Form from '@/components/Form'
import ScreenContainer from '@/components/Screen/Container'
import UserAccountEditAvatar from '@/features/UserAccount/core/Edit/Avatar'
import useUserAccountEditForm from '@/features/UserAccount/core/Edit/useForm'
import { useAccountScreenQuery, useUserAccountEditMutation } from '@/generated'
import useFormInputErrors from '@/hooks/useFormInputErrors'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'

export type AccountScreenProps = RootStackScreenProps<RootStackRoute.Account>

export default function AccountScreen() {
    const [{ data: screenData }] = useAccountScreenQuery()

    const viewer = screenData?.viewer

    const [selectedImage, setSelectedImage] = useState<ImagePicker.ImageInfo>()

    const { control, handleSubmit, setError } = useUserAccountEditForm({
        user: viewer
    })
    const [_, editAccount] = useUserAccountEditMutation()

    const setInputErrors = useFormInputErrors(setError)

    const onSubmit = handleSubmit(async (input) => {
        if (!viewer) return

        const { data } = await editAccount({
            input: {
                userId: viewer.id,
                profilePictureB64: selectedImage?.base64 ?? null,
                ...input
            }
        })

        const errors = data?.updateUser?.errors
        if (errors?.length !== 0) {
            setInputErrors(errors)
        }
    })

    return (
        <ScreenContainer>
            {viewer && (
                <VStack space={2}>
                    <UserAccountEditAvatar
                        onImageSelected={setSelectedImage}
                        selectedImage={selectedImage}
                        user={viewer}
                    />
                    <Form.Controller
                        control={control}
                        name="firstName"
                        render={() => (
                            <Form.Control>
                                <Form.Label>First Name</Form.Label>
                                <Form.Input />
                                <Form.ErrorMessage />
                            </Form.Control>
                        )}
                    />
                    <Form.Controller
                        control={control}
                        name="lastName"
                        render={() => (
                            <Form.Control>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Input />
                                <Form.ErrorMessage />
                            </Form.Control>
                        )}
                    />
                    <Form.Controller
                        control={control}
                        name="phoneNumber"
                        render={() => (
                            <Form.Control>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Input />
                                <Form.ErrorMessage />
                            </Form.Control>
                        )}
                    />
                    <Form.Controller
                        control={control}
                        name="state"
                        render={() => (
                            <Form.Control>
                                <Form.Label>State</Form.Label>
                                <Form.Input />
                                <Form.ErrorMessage />
                            </Form.Control>
                        )}
                    />
                    <Form.Controller
                        control={control}
                        name="city"
                        render={() => (
                            <Form.Control>
                                <Form.Label>City</Form.Label>
                                <Form.Input />
                                <Form.ErrorMessage />
                            </Form.Control>
                        )}
                    />
                    <Form.Controller
                        control={control}
                        name="streetAddress"
                        render={() => (
                            <Form.Control>
                                <Form.Label>Street Address</Form.Label>
                                <Form.Input />
                                <Form.ErrorMessage />
                            </Form.Control>
                        )}
                    />
                    <Form.Controller
                        control={control}
                        name="zipCode"
                        render={() => (
                            <Form.Control>
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Input />
                                <Form.ErrorMessage />
                            </Form.Control>
                        )}
                    />
                    <Button colorScheme="indigo" mt={5} onPress={onSubmit}>
                        Save
                    </Button>
                </VStack>
            )}
        </ScreenContainer>
    )
}
