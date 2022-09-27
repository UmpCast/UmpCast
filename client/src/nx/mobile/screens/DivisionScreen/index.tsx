import { yupResolver } from '@hookform/resolvers/yup'
import { Box, HStack, Text, VStack } from 'native-base'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import ScreenContainer from '@/components/Screen/Container'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import DividedList from '@/nx/components/DividedList'
import Form from '@/nx/components/Form'
import PressableX from '@/nx/components/PressableX'
import { useEditDivisionMutation } from '@/nx/graphql/mutations/EditDivision/index.generated'
import setFormErrors from '@/nx/shared/setFormErrors'

import { useDeleteDivisionMutation } from '../../../../graphql/generated'
import MaterialIcon from '../../../components/MaterialIcon'

import { useScreenQuery } from './index.generated'

type Props = RootStackScreenProps<RootStackRoute.Division>

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
    const { setOptions, pop } = navigation
    const { params } = route
    const { divisionId } = params

    const [, doEditDivision] = useEditDivisionMutation()
    const [, doDeleteDivision] = useDeleteDivisionMutation()

    const [{ data }] = useScreenQuery({
        variables: {
            divisionId
        }
    })

    const { control, handleSubmit, setError, setValue } = useForm<EditDivisionInput>({
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

    const onDeletePress = async () => {
        await doDeleteDivision({
            input: {
                divisionId
            }
        })

        pop()
    }

    useEffect(() => {
        setOptions({
            headerRight: () => (
                <Box pr={4}>
                    <PressableX
                        onPress={onSavePress}
                        rounded="sm"
                        size="sm"
                        variant="primary.ghost"
                    >
                        <Text bold color="primary.solid">
                            Save
                        </Text>
                    </PressableX>
                </Box>
            )
        })
    }, [])

    if (!data?.division) {
        return null
    }

    return (
        <ScreenContainer>
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
                    <DividedList.Container>
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
                    </DividedList.Container>
                </VStack>
            </VStack>
        </ScreenContainer>
    )
}
