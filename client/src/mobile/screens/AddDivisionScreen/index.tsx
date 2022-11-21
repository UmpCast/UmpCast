import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import ActionButton from '@/components/ActionButton'
import Form from '@/components/Form'
import ScreenContainer from '@/components/ScreenContainer'
import { NavRoute } from '@/mobile/navigation/routes'
import { TabsStackScreenProps } from '@/mobile/navigation/types'
import setFormErrors from '@/shared/setFormErrors'

import { useAddDivisionMutation } from '../../../graphql/mutations/AddDivision/index.generated'
import { createDivisionSchema } from '../../../shared/createDivisionSchema'

type Props = TabsStackScreenProps<NavRoute.AddDivision>

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

    const [, addDivision] = useAddDivisionMutation()

    const onCreatePress = handleSubmit(async (input) => {
        const { name } = input
        const { data: addDivisionData } = await addDivision({
            input: {
                seasonId,
                name
            }
        })

        if (!addDivisionData) {
            return null
        }

        const {
            createDivision: { success, errors }
        } = addDivisionData

        if (success) {
            pop()
            return
        }

        setFormErrors(errors, setError)
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
