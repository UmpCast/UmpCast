import ScreenContainer from '@/components/Screen/Container'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import Form from '@/nx/components/Form'
import { useEffect } from 'react'
import { Box, Text } from 'native-base'
import PressableX from '@/nx/components/X/PressableX'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAddPositionMutation } from '@/nx/graphql/mutations/AddPosition/index.generated'
import useFormX from '@/nx/hooks/useFormX'

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

    const { control, handleSubmit, setInputErrors } = useFormX({
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
        } else if (errors.length) {
            setInputErrors(errors)
        } else {
            pop()
        }
    })

    useEffect(() => {
        setOptions({
            headerRight: () => {
                return (
                    <Box pr={4}>
                        <PressableX
                            size="sm"
                            rounded="sm"
                            variant="ghost"
                            colorScheme="primary"
                            onPress={onCreatePress}
                        >
                            <Text color="primary.base" bold>
                                Create
                            </Text>
                        </PressableX>
                    </Box>
                )
            }
        })
    }, [])

    return (
        <ScreenContainer>
            <Form.Control
                control={control}
                name="name"
                render={() => {
                    return (
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Input placeholder="Position name" />
                            <Form.ErrorMessage />
                        </Form.Group>
                    )
                }}
            />
        </ScreenContainer>
    )
}
