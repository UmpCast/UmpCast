import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import ActionButton from '@/components/ActionButton'
import Form from '@/components/Form'
import ScreenContainer from '@/components/ScreenContainer'
import { ORG_JOIN_CODE_OFFSET } from '@/config/constants'
import { useJoinOrgMutation } from '@/graphql/mutations/JoinOrg/index.generated'
import { TabsStackRoute } from '@/mobile/navigation/navigators/TabsStack/types'
import { RootStackScreenProps } from '@/mobile/navigation/types'

type Props = RootStackScreenProps<TabsStackRoute.JoinOrg>

interface FormInput {
    code: string
}

const resolver = yupResolver(
    yup.object({
        code: yup.string().required()
    })
)

export default function JoinOrgScreen({ navigation }: Props) {
    const { pop } = navigation

    const { control, handleSubmit } = useForm<FormInput>({
        resolver
    })

    const [, joinOrg] = useJoinOrgMutation()

    const onCreatePress = handleSubmit(async (input) => {
        const { code } = input
        const { data } = await joinOrg({
            input: {
                organizationId: String(Number(code) - ORG_JOIN_CODE_OFFSET)
            }
        })

        if (!data) {
            return
        }

        const { success } = data.joinOrganization

        if (success) {
            pop()
            return
        }
    })

    return (
        <ScreenContainer
            title="Join Organization"
            headerRight={
                <ActionButton onPress={onCreatePress}>Add</ActionButton>
            }
        >
            <Form.ControlX name="code" control={control}>
                <Form.Group
                    label={<Form.Label>Join Code</Form.Label>}
                    caption={
                        <Form.ErrorMessage altText="Provided by your manager" />
                    }
                >
                    <Form.Input placeholder="123456" />
                </Form.Group>
            </Form.ControlX>
        </ScreenContainer>
    )
}
