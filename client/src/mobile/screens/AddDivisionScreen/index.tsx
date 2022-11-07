import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import ActionButton from '@/components/ActionButton'
import Form from '@/components/Form'
import ScreenContainer from '@/components/ScreenContainer'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import setFormErrors from '@/shared/setFormErrors'

import { useAddDivisionMutation } from '../../../graphql/mutations/AddDivision/index.generated'
import { createDivisionSchema } from '../../../shared/createDivisionSchema'

type Props = RootStackScreenProps<RootStackRoute.AddDivision>

interface FormInput {
    name: string
}

export default function AddDivisionScreen({ route, navigation }: Props) {
    const { pop } = navigation
    const { params } = route
    const { seasonId } = params

    const { control, handleSubmit, setError } = useForm<FormInput>({
        resolver: yupResolver(createDivisionSchema)
    })

    const [, doAddDivision] = useAddDivisionMutation()

    const onCreatePress = handleSubmit(async (input) => {
        const { name } = input
        const resp = await doAddDivision({
            input: {
                seasonId,
                name
            }
        })

        const errors = resp.data?.createDivision?.errors

        if (!errors) {
            return
        }
        if (errors.length) {
            setFormErrors(errors, setError)
            return
        }

        pop()
    })

    return (
        <ScreenContainer
            title="Create Division"
            headerRight={
                <ActionButton onPress={onCreatePress}>Add</ActionButton>
            }
        >
            <Form.ControlDep
                control={control}
                name="name"
                render={() => (
                    <Form.Stack>
                        <Form.Label>Name</Form.Label>
                        <Form.Input placeholder="Division name" />
                        <Form.ErrorMessage />
                    </Form.Stack>
                )}
            />
        </ScreenContainer>
    )
}
