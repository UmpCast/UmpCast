import { yupResolver } from '@hookform/resolvers/yup'
import { Box, HStack, Text, VStack } from 'native-base'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import DividedList from '@/components/DividedList'
import Form from '@/components/Form'
import AppPressable from '@/components/AppPressable'
import ScreenContainer from '@/components/ScreenContainer'
import { useDeletePositionMutation } from '@/graphql/mutations/DeletePosition/index.generated'
import { useEditPositionMutation } from '@/graphql/mutations/EditPosition/index.generated'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import setFormErrors from '@/shared/setFormErrors'

import MaterialIcon from '../../../components/MaterialIcon'

import { useScreenQuery } from './index.generated'
import ActionButton from '@/components/ActionButton'

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

    const [{ data: screenData }] = useScreenQuery({
        variables: {
            positionId
        }
    })

    const { control, handleSubmit, setError, setValue } = useForm<EditPositionInput>({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        if (!screenData) return

        const { position } = screenData
        const { name } = position

        setValue('name', name)
    }, [screenData])

    if (!screenData) {
        return null
    }

    const { position } = screenData
    const { division } = position

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

    return (
        <ScreenContainer
            title="Position"
            headerRight={<ActionButton onPress={onSavePress}>Save</ActionButton>}
        >
            <VStack space={4}>
                <Form.ControlDep
                    control={control}
                    name="name"
                    render={() => (
                        <Form.Stack>
                            <Form.Label>Name</Form.Label>
                            <Form.Input
                                InputLeftElement={
                                    <Text color="secondary.mute" pl={2}>
                                        {division.name} /{' '}
                                    </Text>
                                }
                                pl={0}
                                placeholder="Position name"
                            />
                            <Form.ErrorMessage />
                        </Form.Stack>
                    )}
                />
                <VStack>
                    <DividedList.Group>
                        <DividedList.Item
                            _pressed={{
                                backgroundColor: 'primary.lite'
                            }}
                            onPress={onDeletePress}
                        >
                            <HStack alignItems="center" justifyContent="space-between">
                                <HStack alignItems="center" space={2}>
                                    <Text bold color="primary.solid">
                                        Delete
                                    </Text>
                                </HStack>
                                <MaterialIcon color="primary.solid" name="alert-circle-outline" />
                            </HStack>
                        </DividedList.Item>
                    </DividedList.Group>
                </VStack>
            </VStack>
        </ScreenContainer>
    )
}
