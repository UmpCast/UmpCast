import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Text } from 'native-base'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Form from '@/components/Form'
import PressableX from '@/components/PressableX'
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
    const { setOptions, pop } = navigation
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

    useEffect(() => {
        setOptions({
            headerRight: () => (
                <Box pr={4}>
                    <PressableX
                        onPress={onCreatePress}
                        rounded="sm"
                        size="sm"
                        variant="primary.ghost"
                    >
                        <Text bold color="primary.solid">
                            Add
                        </Text>
                    </PressableX>
                </Box>
            )
        })
    }, [])

    return (
        <ScreenContainer title="Create Division">
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
