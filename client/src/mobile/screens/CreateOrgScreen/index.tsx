import { yupResolver } from '@hookform/resolvers/yup'
import { VStack } from 'native-base'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import ActionButton from '@/components/ActionButton'
import Form from '@/components/Form'
import ScreenContainer from '@/components/ScreenContainer'
import { TabsStackRoute } from '@/mobile/navigation/navigators/TabsStack/types'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import setFormErrors from '@/shared/setFormErrors'

import { useCreateOrgMutation } from '../../../graphql/mutations/CreateOrg/index.generated'

type Input = {
    name: string
    description: string
}

const resolver = yupResolver(
    yup.object({
        name: yup.string().required(),
        description: yup.string()
    })
)

type Props = RootStackScreenProps<TabsStackRoute.CreateOrg>

export default function CreateOrgScreen({ navigation }: Props) {
    const { pop } = navigation

    const [, createOrg] = useCreateOrgMutation()

    const { control, handleSubmit, setError } = useForm<Input>({
        resolver
    })

    const onCreate = handleSubmit(async (input) => {
        const { name, description } = input
        const { data } = await createOrg({
            input: {
                name,
                description: description === '' ? null : description,
                logoB64: null,
                email: null,
                websiteUrl: null
            }
        })

        if (!data) {
            return
        }

        const { errors, success } = data.createOrganization

        if (success) {
            pop()
            return
        }

        setFormErrors(errors, setError)
    })

    return (
        <ScreenContainer
            headerRight={<ActionButton onPress={onCreate}>Create</ActionButton>}
            title="Create Organization"
        >
            <VStack space="sm">
                <Form.ControlX control={control} name="name">
                    <Form.Group label={<Form.Label>Name</Form.Label>}>
                        <Form.Input />
                    </Form.Group>
                </Form.ControlX>
                <Form.ControlX control={control} name="description">
                    <Form.Group label={<Form.Label>Description</Form.Label>}>
                        <Form.Input multiline numberOfLines={3} />
                    </Form.Group>
                </Form.ControlX>
            </VStack>
        </ScreenContainer>
    )
}
