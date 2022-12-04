import { yupResolver } from '@hookform/resolvers/yup'
import { HStack, Text, VStack } from 'native-base'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import ActionButton from '@/components/ActionButton'
import DividedList from '@/components/DividedList'
import Form from '@/components/Form'
import ScreenContainer from '@/components/ScreenContainer'
import { useDeleteDivisionMutation } from '@/graphql/mutations/DeleteDivision/index.generated'
import { useEditDivisionMutation } from '@/graphql/mutations/EditDivision/index.generated'
import { NavRoute } from "@/mobile/navigation/routes"
import { TabsStackScreenProps } from '@/mobile/navigation/types'
import setFormErrors from '@/shared/setFormErrors'

import MaterialIcon from '../../../components/MaterialIcon'

import { useScreenQuery } from './index.generated'
import { alertCancelButton } from '@/components/Alert'
import { Alert } from 'react-native'

type Props = TabsStackScreenProps<NavRoute.Division>

export interface EditDivisionInput {
    name: string
}

const schema = yup.object({
    name: yup
        .string()
        .required()
        .matches(/^[A-Za-z ]*$/, 'Only alphabetical characters')
})

export default function DivisionScreen({ route, navigation }: Props) {
    const { pop } = navigation
    const { params } = route
    const { divisionId } = params

    const [, doEditDivision] = useEditDivisionMutation()
    const [, doDeleteDivision] = useDeleteDivisionMutation()

    const [{ data }] = useScreenQuery({
        variables: {
            divisionId
        }
    })

    const { control, handleSubmit, setError, setValue } =
        useForm<EditDivisionInput>({
            resolver: yupResolver(schema)
        })

    useEffect(() => {
        if (!data?.division) return

        const { division } = data
        const { name } = division

        setValue('name', name)
    }, [data])

    const onSavePress = handleSubmit(async (input) => {
        const { name } = input

        const resp = await doEditDivision({
            input: {
                divisionId,
                name
            }
        })

        if (!resp?.data?.updateDivision) return

        const { success, errors } = resp.data.updateDivision

        if (success) {
            pop()
            return
        }

        if (errors.length) {
            setFormErrors(errors, setError)
        }
    })

    const onDeleteConfirm = async () => {
        await doDeleteDivision({
            input: {
                divisionId
            }
        })

        pop()
    }

    const onDeletePress = () => {
        Alert.alert(
            "Delete Division",
            undefined,
            [alertCancelButton, {
                text: "Confirm",
                style: "destructive",
                onPress: onDeleteConfirm
            }]
        )
    }

    if (!data?.division) {
        return null
    }

    return (
        <ScreenContainer
            title="Division"
            headerRight={
                <ActionButton onPress={onSavePress}>Save</ActionButton>
            }
        >
            <VStack space={4}>
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
                <VStack>
                    <DividedList.Group>
                        <DividedList.Item
                            _pressed={{
                                backgroundColor: 'primary.lite'
                            }}
                            onPress={onDeletePress}
                        >
                            <HStack
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <HStack alignItems="center" space={2}>
                                    <Text bold color="primary.solid">
                                        Delete
                                    </Text>
                                </HStack>
                                <MaterialIcon
                                    color="primary.solid"
                                    name="alert-circle-outline"
                                />
                            </HStack>
                        </DividedList.Item>
                    </DividedList.Group>
                </VStack>
            </VStack>
        </ScreenContainer>
    )
}
