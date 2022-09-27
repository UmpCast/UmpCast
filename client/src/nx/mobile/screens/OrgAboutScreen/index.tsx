import { Avatar, Text, VStack } from 'native-base'
import Form from '@/nx/components/Form'
import ScreenContainer from '@/nx/components/ScreenContainer'
import { useForm } from 'react-hook-form'
import OrgLogo from '@/nx/features/OrgLogo'
import { useScreenQuery } from './index.generated'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import MaterialIcon from '../../../components/MaterialIcon'
import ActionButton from '@/nx/components/ActionButton'
import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEditOrgAboutMutation } from '../../../graphql/mutations/EditOrgAbout/index.generated'
import { useUploadOrgLogoMutation } from '@/nx/graphql/mutations/UploadOrgLogo/index.generated'
import setFormErrors from '@/nx/shared/setFormErrors'
import pickImage from '../../../shared/pickImage'
import PressableX from '@/nx/components/PressableX'
import { manipulateAsync } from 'expo-image-manipulator'

type Input = {
    name: string
    description: string
    email: string
    websiteUrl: string
}

const resolver = yupResolver(
    yup.object({
        name: yup.string().required(),
        description: yup.string(),
        email: yup.string().email(),
        websiteUrl: yup.string().url()
    })
)

type Props = RootStackScreenProps<RootStackRoute.OrgAbout>

export default function OrgAboutScreen({ navigation, route }: Props) {
    const { params } = route
    const { pop } = navigation
    const { orgId } = params

    const { control, setValue, setError, handleSubmit } = useForm<Input>({
        resolver
    })

    const [, editOrgAbout] = useEditOrgAboutMutation()
    const [, uploadOrgLogo] = useUploadOrgLogoMutation()

    const [{ data: screenData }] = useScreenQuery({
        variables: {
            orgId
        }
    })

    useEffect(() => {
        if (!screenData?.organization) {
            return
        }

        const { name, description, email, websiteUrl, logoUrl } = screenData.organization

        setValue('name', name)
        setValue('description', description ?? '')
        setValue('email', email ?? '')
        setValue('websiteUrl', websiteUrl ?? '')
    }, [screenData])

    if (!screenData?.organization) {
        return null
    }

    const { organization: org } = screenData

    const onUploadLogoPress = async () => {
        const res = await pickImage()
        if (res.cancelled) {
            return
        }

        const { base64 } = await manipulateAsync(res.uri)
        if (!base64) {
            return
        }

        uploadOrgLogo({
            input: {
                id: orgId,
                logoB64: base64
            }
        })
    }

    const onSavePress = handleSubmit(async (input) => {
        const { name, description, email, websiteUrl } = input

        const { data } = await editOrgAbout({
            input: {
                id: orgId,
                name,
                description: description === '' ? null : description,
                email: email === '' ? null : email,
                websiteUrl: websiteUrl === '' ? null : websiteUrl
            }
        })

        if (!data) {
            return
        }

        const { updateOrganization } = data
        const { success, errors } = updateOrganization

        if (success) {
            pop()
            return
        }

        setFormErrors(errors, setError)
    })

    return (
        <ScreenContainer
            title="About"
            headerRight={<ActionButton onPress={onSavePress}>Save</ActionButton>}
        >
            <VStack space="md">
                <VStack alignItems="center">
                    <PressableX onPress={onUploadLogoPress}>
                        <OrgLogo org={org} size="2xl">
                            <Avatar.Badge
                                bg="primary.solid"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <MaterialIcon name="pencil" color="white" size="sm" />
                            </Avatar.Badge>
                        </OrgLogo>
                    </PressableX>
                </VStack>
                <VStack space="sm">
                    <Form.Control
                        control={control}
                        name="name"
                        render={() => {
                            return (
                                <Form.Group label={<Form.Label>Name</Form.Label>}>
                                    <Form.Input />
                                </Form.Group>
                            )
                        }}
                    />
                    <Form.Control
                        control={control}
                        name="description"
                        render={() => {
                            return (
                                <Form.Group label={<Form.Label>Description</Form.Label>}>
                                    <Form.Input multiline={true} numberOfLines={3} />
                                </Form.Group>
                            )
                        }}
                    />
                    <Form.Control
                        control={control}
                        name="email"
                        render={() => {
                            return (
                                <Form.Group label={<Form.Label>Email</Form.Label>}>
                                    <Form.Input />
                                </Form.Group>
                            )
                        }}
                    />
                    <Form.Control
                        control={control}
                        name="websiteUrl"
                        render={() => {
                            return (
                                <Form.Group label={<Form.Label>Website</Form.Label>}>
                                    <Form.Input />
                                </Form.Group>
                            )
                        }}
                    />
                </VStack>
            </VStack>
        </ScreenContainer>
    )
}
