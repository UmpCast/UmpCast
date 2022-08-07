import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Text } from 'native-base'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import ScreenContainer from '@/components/Screen/Container'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import Form from '@/nx/components/Form'
import PressableX from '@/nx/components/X/PressableX'
import { useAddPositionMutation } from '@/nx/graphql/mutations/AddPosition/index.generated'
import setFormErrors from '@/nx/utils/setFormErrors'

type Props = RootStackScreenProps<RootStackRoute.AddPosition>

export interface AddPositionInput {
    name: string
}

const schema = yup.object({
    name: yup
        .string()
        .required()
        .matches(/^[A-Za-z ]*$/, 'Only alphabetical characters')
})

export default function AddPositionScreen({ route, navigation }: Props) {
    const { setOptions, pop } = navigation
    const { params } = route
    const { divisionId: divId } = params

    const { control, handleSubmit, setError } = useForm({
        resolver: yupResolver(schema)
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
                        colorScheme="primary"
                        onPress={onCreatePress}
                        rounded="sm"
                        size="sm"
                        variant="ghost"
                    >
                        <Text bold color="primary.base">
                            Create
                        </Text>
                    </PressableX>
                </Box>
            )
        })
    }, [])

    return (
        <ScreenContainer>
            <Form.Control
                control={control}
                name="name"
                render={() => (
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Input placeholder="Position name" />
                        <Form.ErrorMessage />
                    </Form.Group>
                )}
            />
        </ScreenContainer>
    )
}
