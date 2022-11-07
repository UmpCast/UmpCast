import { yupResolver } from '@hookform/resolvers/yup'
import { manipulateAsync } from 'expo-image-manipulator'
import { VStack, Avatar } from 'native-base'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import ActionButton from '@/components/ActionButton'
import AppPressable from '@/components/AppPressable'
import Form from '@/components/Form'
import MaterialIcon from '@/components/MaterialIcon'
import ScreenContainer from '@/components/ScreenContainer'
import UserAvatar from '@/features/UserAvatar'
import pickImage from '@/shared/pickImage'
import setFormErrors from '@/shared/setFormErrors'

import { useEditViewerAboutMutation } from '../../../graphql/mutations/EditViewerAbout/index.generated'
import { useUploadUserAvatarMutation } from '../../../graphql/mutations/UploadUserAvatar/index.generated'

import { useScreenQuery } from './index.generated'

type Input = {
    firstName: string
    lastName: string
    phoneNumber: string
    fullAddress: string
}

const resolver = yupResolver(
    yup.object({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        phoneNumber: yup.string(),
        fullAddress: yup.string()
    })
)

export default function AboutScreen() {
    const [{ data: screenData }] = useScreenQuery()

    const { control, handleSubmit, setValue, setError } = useForm<Input>({
        resolver
    })

    const [, uploadUserAvatar] = useUploadUserAvatarMutation()
    const [, editViewerAbout] = useEditViewerAboutMutation()

    useEffect(() => {
        if (!screenData) {
            return
        }

        const { firstName, lastName, phoneNumber, fullAddress } =
            screenData.viewer

        setValue('firstName', firstName)
        setValue('lastName', lastName)
        setValue('phoneNumber', phoneNumber ?? '')
        setValue('fullAddress', fullAddress ?? '')
    }, [screenData])

    if (!screenData) {
        return null
    }

    const { viewer } = screenData

    const onUploadAvatar = async (viewerId: string) => {
        const res = await pickImage()
        if (res.cancelled) {
            return
        }

        const { base64 } = await manipulateAsync(res.uri)
        if (!base64) {
            return
        }

        uploadUserAvatar({
            input: {
                userId: viewerId,
                logoB64: base64
            }
        })
    }

    const onSavePress = (viewerId: string) => {
        handleSubmit(async (input) => {
            const { firstName, lastName, phoneNumber, fullAddress } = input
            const { data } = await editViewerAbout({
                input: {
                    userId: viewerId,
                    firstName,
                    lastName,
                    phoneNumber: phoneNumber === '' ? null : phoneNumber,
                    fullAddress: fullAddress === '' ? null : fullAddress
                }
            })

            if (!data) {
                return null
            }

            const { success, errors } = data.updateUser

            if (success) {
                return
            }

            setFormErrors(errors, setError)
        })()
    }

    return (
        <ScreenContainer
            headerRight={
                <ActionButton onPress={() => onSavePress(viewer.id)}>
                    Save
                </ActionButton>
            }
            title="About"
        >
            <VStack space="md">
                <VStack alignItems="center">
                    <AppPressable onPress={() => onUploadAvatar(viewer.id)}>
                        <UserAvatar user={viewer} size="2xl">
                            <Avatar.Badge
                                alignItems="center"
                                bg="primary.solid"
                                justifyContent="center"
                            >
                                <MaterialIcon
                                    color="white"
                                    name="pencil"
                                    size="sm"
                                />
                            </Avatar.Badge>
                        </UserAvatar>
                    </AppPressable>
                </VStack>
                <VStack space="sm">
                    <Form.Control
                        control={control}
                        name="firstName"
                        render={() => (
                            <Form.Group
                                label={<Form.Label>First Name</Form.Label>}
                            >
                                <Form.Input />
                            </Form.Group>
                        )}
                    />
                    <Form.Control
                        control={control}
                        name="lastName"
                        render={() => (
                            <Form.Group
                                label={<Form.Label>Last Name</Form.Label>}
                            >
                                <Form.Input />
                            </Form.Group>
                        )}
                    />
                    <Form.Control
                        control={control}
                        name="phoneNumber"
                        render={() => (
                            <Form.Group
                                label={<Form.Label>Phone Number</Form.Label>}
                            >
                                <Form.Input placeholder="1234567890" />
                            </Form.Group>
                        )}
                    />
                    <Form.Control
                        control={control}
                        name="fullAddress"
                        render={() => (
                            <Form.Group
                                label={<Form.Label>Full Address</Form.Label>}
                                caption={
                                    <Form.ErrorMessage altText="Only visible by organization owners for billing" />
                                }
                            >
                                <Form.Input />
                            </Form.Group>
                        )}
                    />
                </VStack>
            </VStack>
        </ScreenContainer>
    )
}
