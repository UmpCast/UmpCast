import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Text } from 'native-base'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Form from '@/components/Form'
import AppPressable from '@/components/AppPressable'
import ScreenContainer from '@/components/ScreenContainer'
import { useAddPositionMutation } from '@/graphql/mutations/AddPosition/index.generated'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import setFormErrors from '@/shared/setFormErrors'

import { createPositionSchema } from '../../../shared/createPositionSchema'
import ActionButton from '@/components/ActionButton'

type Props = RootStackScreenProps<RootStackRoute.AddPosition>

export interface FormInput {
    name: string
}

export default function AddPositionScreen({ route, navigation }: Props) {
    const { pop } = navigation
    const { params } = route
    const { divisionId: divId } = params

    const { control, handleSubmit, setError } = useForm<FormInput>({
        resolver: yupResolver(createPositionSchema)
    })

    const [, doAddPosition] = useAddPositionMutation()

    const onCreatePress = handleSubmit(async (input) => {
        const { name } = input
        const resp = await doAddPosition({
            input: {
                divisionId: divId,
                name
            }
        })

        const errors = resp.data?.createPosition?.errors

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
            title="Create Position"
            headerRight={<ActionButton onPress={onCreatePress}>Add</ActionButton>}
        >
            <Form.ControlDep
                control={control}
                name="name"
                render={() => (
                    <Form.Stack>
                        <Form.Label>Name</Form.Label>
                        <Form.Input placeholder="Position name" />
                        <Form.ErrorMessage />
                    </Form.Stack>
                )}
            />
        </ScreenContainer>
    )
}
