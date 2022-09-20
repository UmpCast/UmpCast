import { yupResolver } from '@hookform/resolvers/yup'
import { Box, HStack, Text, VStack } from 'native-base'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import ScreenContainer from '@/components/Screen/Container'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import Form from '@/nx/components/Form'
import PressableX from '@/nx/components/X/PressableX'
import { useEditPositionMutation } from '@/nx/graphql/mutations/EditPosition/index.generated'
import setFormErrors from '@/nx/shared/setFormErrors'

import { useDeletePositionMutation } from '../../../../graphql/generated'

import { useScreenQuery } from './index.generated'
import DividedList from '@/nx/components/DividedList'
import MaterialIcon from '../../../components/MaterialIcon'

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
            return
        }
        if (errors.length) {
            setFormErrors(errors, setError)
            return
        }

        pop()
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
            headerRight: () => (
                <Box pr={4}>
                    <PressableX
                        variant="primary.ghost"
                        onPress={onSavePress}
                        rounded="sm"
                        size="sm"
                    >
                        <Text bold color="primary.600">
                            Save
                        </Text>
                    </PressableX>
                </Box>
            )
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
                    render={() => (
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Input
                                InputLeftElement={
                                    <Text color="secondary.400" pl={2}>
                                        {division.name} /{' '}
                                    </Text>
                                }
                                pl={0}
                                placeholder="Position name"
                            />
                            <Form.ErrorMessage />
                        </Form.Group>
                    )}
                />
                <VStack>
                    <DividedList.Container>
                        <DividedList.Item
                            onPress={onDeletePress}
                            _pressed={{
                                backgroundColor: 'primary.100'
                            }}
                        >
                            <HStack
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <HStack space={2} alignItems="center">
                                    <Text bold color="primary.600">
                                        Delete
                                    </Text>
                                </HStack>
                                <MaterialIcon
                                    name="alert-circle-outline"
                                    color="primary.600"
                                />
                            </HStack>
                        </DividedList.Item>
                    </DividedList.Container>
                </VStack>
            </VStack>
        </ScreenContainer>
    )
}
