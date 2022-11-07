import { yupResolver } from '@hookform/resolvers/yup'
import { addHours } from 'date-fns'
import { useDisclose, VStack, Text } from 'native-base'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import ActionButton from '@/components/ActionButton'
import OptionSheet from '@/components/AppActionsheet'
import AppPressable from '@/components/AppPressable'
import Form from '@/components/Form'
import ScreenContainer from '@/components/ScreenContainer'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import setFormErrors from '@/shared/setFormErrors'

import { useCreateGameMutation } from '../../../graphql/mutations/CreateGame/index.generated'

import { DivisionFragment, useScreenQuery } from './index.generated'

type Input = {
    name: string
    divisionId: string
    startTime: Date
    endTime: Date
    location: string
}

const resolver = yupResolver(
    yup.object({
        name: yup.string().required(),
        divisionId: yup.string().required(),
        location: yup.string()
    })
)

type Props = RootStackScreenProps<RootStackRoute.CreateGame>

export default function CreateGameScreen({ navigation, route }: Props) {
    const { params } = route
    const { pop } = navigation

    const { seasonId } = params

    const now = new Date()

    const [, createGame] = useCreateGameMutation()
    const [{ data: screenData }] = useScreenQuery({
        variables: {
            seasonId
        }
    })

    const [selectedDivision, setSelectedDivision] =
        useState<null | DivisionFragment>()

    const divisionListDisclose = useDisclose()

    const { control, setError, handleSubmit } = useForm<Input>({
        defaultValues: {
            startTime: now,
            endTime: addHours(now, 2)
        },
        resolver
    })

    if (!screenData) {
        return null
    }

    const onDivisionListOpen = () => {
        divisionListDisclose.onOpen()
    }

    const onDivisionSelect = (division: DivisionFragment) => {
        setSelectedDivision(division)
        divisionListDisclose.onClose()
    }

    const onCreate = handleSubmit(async (input) => {
        const { name, divisionId, startTime, endTime, location } = input

        const { data } = await createGame({
            input: {
                divisionId,
                name,
                startTime,
                endTime,
                location
            }
        })

        if (!data) {
            return
        }

        const { success, errors } = data.createGame

        if (success) {
            pop()
        }

        setFormErrors(errors, setError)
    })

    const { season } = screenData
    const { divisions } = season

    return (
        <ScreenContainer
            headerRight={<ActionButton onPress={onCreate}>Create</ActionButton>}
            title="Create Game"
        >
            <VStack space="sm">
                <Form.Control
                    control={control}
                    name="name"
                    render={() => (
                        <Form.Group label={<Form.Label>Name</Form.Label>}>
                            <Form.Input />
                        </Form.Group>
                    )}
                />
                <Form.Control
                    control={control}
                    name="divisionId"
                    render={({ field, fieldState }) => (
                        <>
                            <Form.Group
                                label={<Form.Label>Division</Form.Label>}
                            >
                                <AppPressable
                                    borderColor="danger.solid"
                                    borderWidth={fieldState.error ? 2 : 0}
                                    onPress={onDivisionListOpen}
                                    rounded="sm"
                                    size="md"
                                    variant="secondary.subtle"
                                >
                                    {selectedDivision ? (
                                        <Text>{selectedDivision.name}</Text>
                                    ) : (
                                        <Text color="secondary.mute">
                                            Click to select
                                        </Text>
                                    )}
                                </AppPressable>
                            </Form.Group>
                            <OptionSheet.Content {...divisionListDisclose}>
                                {divisions.map((division) => (
                                    <OptionSheet.Item
                                        key={division.id}
                                        onPress={() => {
                                            field.onChange(division.id)
                                            onDivisionSelect(division)
                                        }}
                                    >
                                        <Text>{division.name}</Text>
                                    </OptionSheet.Item>
                                ))}
                            </OptionSheet.Content>
                        </>
                    )}
                />
                <Form.Control
                    control={control}
                    name="startTime"
                    render={() => (
                        <Form.Group label={<Form.Label>Start Time</Form.Label>}>
                            <Form.DateInput />
                        </Form.Group>
                    )}
                />
                <Form.Control
                    control={control}
                    name="endTime"
                    render={() => (
                        <Form.Group label={<Form.Label>End Time</Form.Label>}>
                            <Form.DateInput />
                        </Form.Group>
                    )}
                />
                <Form.Control
                    control={control}
                    name="location"
                    render={() => (
                        <Form.Group label={<Form.Label>Location</Form.Label>}>
                            <Form.Input />
                        </Form.Group>
                    )}
                />
            </VStack>
        </ScreenContainer>
    )
}
