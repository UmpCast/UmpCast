import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Text } from 'native-base'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import ScreenContainer from '@/components/Screen/Container'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import Form from '@/nx/components/Form'
import PressableX from '@/nx/components/PressableX'
import { useAddPositionMutation } from '@/nx/graphql/mutations/AddPosition/index.generated'
import setFormErrors from '@/nx/shared/setFormErrors'

import { createPositionSchema } from '../../../shared/createPositionSchema'

type Props = RootStackScreenProps<RootStackRoute.AddPosition>

export interface FormInput {
    name: string
}

export default function AddPositionScreen({ route, navigation }: Props) {
    const { setOptions, pop } = navigation
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
        <ScreenContainer>
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
