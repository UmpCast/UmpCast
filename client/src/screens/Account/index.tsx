import useUserAccountEditForm from '@/features/UserAccount/core/Edit/useForm'
import { useAccountScreenQuery, useUserAccountEditMutation } from '@/generated'
import { Button, VStack } from 'native-base'
import * as Form from '@/components/Form'
import ScreenContainer from '@/components/Screen/Container'
import UserAccountEditAvatar from '@/features/UserAccount/core/Edit/Avatar'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import useFormInputErrors from '@/hooks/useFormInputErrors'

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
                profilePictureB64: selectedImage?.base64 ? 'aefwaw' : null,
                ...input
            }
        })

        const errors = data?.updateUser?.errors
        if (errors?.length !== 0) return setInputErrors(errors)
    })

    return (
        <ScreenContainer>
            {viewer && (
                <VStack space={2}>
                    <UserAccountEditAvatar
                        user={viewer}
                        selectedImage={selectedImage}
                        onImageSelected={setSelectedImage}
                    />
                    <Form.Controller
                        control={control}
                        name="firstName"
                        render={() => {
                            return (
                                <Form.Control>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Input />
                                    <Form.ErrorMessage />
                                </Form.Control>
                            )
                        }}
                    />
                    <Form.Controller
                        control={control}
                        name="lastName"
                        render={() => {
                            return (
                                <Form.Control>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Input />
                                    <Form.ErrorMessage />
                                </Form.Control>
                            )
                        }}
                    />
                    <Form.Controller
                        control={control}
                        name="phoneNumber"
                        render={() => {
                            return (
                                <Form.Control>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Input />
                                    <Form.ErrorMessage />
                                </Form.Control>
                            )
                        }}
                    />
                    <Form.Controller
                        control={control}
                        name="state"
                        render={() => {
                            return (
                                <Form.Control>
                                    <Form.Label>State</Form.Label>
                                    <Form.Input />
                                    <Form.ErrorMessage />
                                </Form.Control>
                            )
                        }}
                    />
                    <Form.Controller
                        control={control}
                        name="city"
                        render={() => {
                            return (
                                <Form.Control>
                                    <Form.Label>City</Form.Label>
                                    <Form.Input />
                                    <Form.ErrorMessage />
                                </Form.Control>
                            )
                        }}
                    />
                    <Form.Controller
                        control={control}
                        name="streetAddress"
                        render={() => {
                            return (
                                <Form.Control>
                                    <Form.Label>Street Address</Form.Label>
                                    <Form.Input />
                                    <Form.ErrorMessage />
                                </Form.Control>
                            )
                        }}
                    />
                    <Form.Controller
                        control={control}
                        name="zipCode"
                        render={() => {
                            return (
                                <Form.Control>
                                    <Form.Label>Zip Code</Form.Label>
                                    <Form.Input />
                                    <Form.ErrorMessage />
                                </Form.Control>
                            )
                        }}
                    />
                    <Button colorScheme="indigo" onPress={onSubmit} mt={5}>
                        Save
                    </Button>
                </VStack>
            )}
        </ScreenContainer>
    )
}
