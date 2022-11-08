import { yupResolver } from '@hookform/resolvers/yup'
import { manipulateAsync } from 'expo-image-manipulator'
import { Avatar, VStack, Text } from 'native-base'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import ActionButton from '@/components/ActionButton'
import AppPressable from '@/components/AppPressable'
import Form from '@/components/Form'
import ScreenContainer from '@/components/ScreenContainer'
import Subheader from '@/components/Subheader'
import Surface from '@/components/Surface'
import OrgLogo from '@/features/OrgLogo'
import { useUploadOrgLogoMutation } from '@/graphql/mutations/UploadOrgLogo/index.generated'
import { TabsStackRoute } from '@/mobile/navigation/navigators/TabsStack/types'
import { TabsStackScreenProps } from '@/mobile/navigation/types'
import { OrganizationMemberRoleType } from '@/mock/schema.generated'
import setFormErrors from '@/shared/setFormErrors'

import MaterialIcon from '../../../components/MaterialIcon'
import { useEditOrgAboutMutation } from '../../../graphql/mutations/EditOrgAbout/index.generated'
import pickImage from '../../../shared/pickImage'

import { useScreenQuery } from './index.generated'

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

type Props = TabsStackScreenProps<TabsStackRoute.OrgAbout>

export default function OrgAboutScreen({ navigation, route }: Props) {
    const { params } = route
    const { pop } = navigation
    const { orgId } = params

    const [, editOrgAbout] = useEditOrgAboutMutation()
    const [, uploadOrgLogo] = useUploadOrgLogoMutation()

    const [{ data: screenData }] = useScreenQuery({
        variables: {
            orgId
        }
    })

    const { control, setValue, setError, handleSubmit } = useForm<Input>({
        resolver
    })

    useEffect(() => {
        if (!screenData?.organization) {
            return
        }

        const { name, description, email, websiteUrl } = screenData.organization

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

    if (org.viewerMemberRole !== OrganizationMemberRoleType.Owner) {
        return (
            <ScreenContainer title="About">
                <VStack space="md">
                    <VStack alignItems="center">
                        <OrgLogo org={org} size="2xl" circle={true} />
                    </VStack>
                    <VStack space="sm">
                        <Subheader>Name</Subheader>
                        <Surface>
                            <Text>{org.name}</Text>
                        </Surface>
                        {org.description && (
                            <VStack space="sm">
                                <Subheader>Description</Subheader>
                                <Surface>
                                    <Text>{org.description}</Text>
                                </Surface>
                            </VStack>
                        )}
                        {org.email && (
                            <VStack space="sm">
                                <Subheader>Email</Subheader>
                                <Surface>
                                    <Text>{org.email}</Text>
                                </Surface>
                            </VStack>
                        )}
                        {org.websiteUrl && (
                            <VStack space="sm">
                                <Subheader>Website</Subheader>
                                <Surface>
                                    <Text>{org.websiteUrl}</Text>
                                </Surface>
                            </VStack>
                        )}
                    </VStack>
                </VStack>
            </ScreenContainer>
        )
    }

    return (
        <ScreenContainer
            headerRight={
                <ActionButton onPress={onSavePress}>Save</ActionButton>
            }
            title="About"
        >
            <VStack space="md">
                <VStack alignItems="center">
                    <AppPressable onPress={onUploadLogoPress}>
                        <OrgLogo org={org} size="2xl" circle={true}>
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
                        </OrgLogo>
                    </AppPressable>
                </VStack>
                <VStack space="sm">
                    <Form.Control
                        control={control}
                        name="name"
                        render={() => (
                            <Form.Group label={<Form.Label>Name</Form.Label>}>
                                <Form.Input />
                            </Form.Group>
                        )}
                    />
                    <Form.Control
                        control={control}
                        name="description"
                        render={() => (
                            <Form.Group
                                label={<Form.Label>Description</Form.Label>}
                            >
                                <Form.Input multiline numberOfLines={3} />
                            </Form.Group>
                        )}
                    />
                    <Form.Control
                        control={control}
                        name="email"
                        render={() => (
                            <Form.Group label={<Form.Label>Email</Form.Label>}>
                                <Form.Input />
                            </Form.Group>
                        )}
                    />
                    <Form.Control
                        control={control}
                        name="websiteUrl"
                        render={() => (
                            <Form.Group
                                label={<Form.Label>Website</Form.Label>}
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
