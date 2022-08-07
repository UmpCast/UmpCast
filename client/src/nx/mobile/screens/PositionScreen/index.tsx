import ScreenContainer from '@/components/Screen/Container'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import Form from '@/nx/components/Form'
import { useEffect } from 'react'
import { Box, HStack, Text, VStack } from 'native-base'
import PressableX from '@/nx/components/X/PressableX'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEditPositionMutation } from '@/nx/graphql/mutations/EditPosition/index.generated'
import setFormErrors from '@/nx/utils/setFormErrors'
import { useScreenQuery } from './index.generated'
import { useForm } from 'react-hook-form'
import { useDeletePositionMutation } from '../../../../graphql/generated'

type Props = RootStackScreenProps<RootStackRoute.Position>

export interface EditPositionInput {
    name: string
}

const schema = yup.object({
    name: yup
        .string()
        .required()
        .matches(/^[A-Za-z ]*$/, 'Only alphabetical characters')
})

export default function PositionScreen({ route, navigation }: Props) {
    const { setOptions, pop } = navigation
    const { params } = route
    const { positionId } = params

    const [, doEditPosition] = useEditPositionMutation()
    const [, doDeletePosition] = useDeletePositionMutation()

    const [{ data }] = useScreenQuery({
        variables: {
            positionId
        }
    })

    const { control, handleSubmit, setError, setValue } =
        useForm<EditPositionInput>({
            resolver: yupResolver(schema)
        })

    useEffect(() => {
        if (!data?.position) return

        const { position } = data
        const { name } = position

        setValue('name', name)
    }, [data])

    const onSavePress = handleSubmit(async (input) => {
        const { name } = input

        const resp = await doEditPosition({
            input: {
                positionId,
                name
            }
        })

        const errors = resp.data?.updatePosition?.errors

        if (!errors) {
        } else if (errors.length) {
            setFormErrors(errors, setError)
        } else {
            pop()
        }
    })

    const onDeletePress = async () => {
        await doDeletePosition({
            input: {
                positionId
            }
        })

        pop()
    }

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
                            onPress={onSavePress}
                        >
                            <Text color="primary.base" bold>
                                Save
                            </Text>
                        </PressableX>
                    </Box>
                )
            }
        })
    }, [])

    if (!data?.position) {
        return null
    }

    const { position } = data
    const { division } = position

    return (
        <ScreenContainer>
            <VStack space={4}>
                <Form.Control
                    control={control}
                    name="name"
                    render={() => {
                        return (
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Input
                                    placeholder="Position name"
                                    pl={0}
                                    InputLeftElement={
                                        <Text pl={2} color="secondary.mute">
                                            {division.name} /{' '}
                                        </Text>
                                    }
                                />
                                <Form.ErrorMessage />
                            </Form.Group>
                        )
                    }}
                />
                <PressableX
                    variant="subtle"
                    rounded="sm"
                    size="md"
                    colorScheme="primary"
                    onPress={onDeletePress}
                >
                    <HStack justifyContent="center">
                        <Text color="primary.base" bold>
                            Delete
                        </Text>
                    </HStack>
                </PressableX>
            </VStack>
        </ScreenContainer>
    )
}
