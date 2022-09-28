import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import ActionButton from '@/nx/components/ActionButton'
import Form from '@/nx/components/Form'
import ScreenContainer from '@/nx/components/ScreenContainer'
import setFormErrors from '@/nx/shared/setFormErrors'

import { useCreateSeasonMutation } from '../../../graphql/mutations/CreateSeason/index.generated'

const resolver = yupResolver(
    yup.object({
        name: yup.string().required()
    })
)

type Input = {
    name: string
    endDate: Date
}

type Props = RootStackScreenProps<RootStackRoute.CreateSeason>

export default function CreateSeasonScreen({ navigation, route }: Props) {
    const { params } = route
    const { pop } = navigation

    const { orgId } = params

    const [, createSeason] = useCreateSeasonMutation()

    const { control, handleSubmit, setError } = useForm<Input>({
        defaultValues: {
            endDate: new Date()
        },
        resolver
    })

    const onCreatePress = handleSubmit(async (input) => {
        const { name, endDate } = input

        const { data } = await createSeason({
            input: {
                organizationId: orgId,
                name,
                endDate
            }
        })

        if (!data) {
            return
        }

        const { success, errors } = data.createSeason

        if (success) {
            pop()
            return
        }

        setFormErrors(errors, setError)
    })

    return (
        <ScreenContainer
            headerRight={<ActionButton onPress={onCreatePress}>Create</ActionButton>}
            title="Create Season"
        >
            <Form.ControlX control={control} name="name">
                <Form.Group label={<Form.Label>Name</Form.Label>}>
                    <Form.Input />
                </Form.Group>
            </Form.ControlX>
            <Form.ControlX control={control} name="endDate">
                <Form.Group label={<Form.Label>End Date</Form.Label>}>
                    <Form.DateInput />
                </Form.Group>
            </Form.ControlX>
        </ScreenContainer>
    )
}
