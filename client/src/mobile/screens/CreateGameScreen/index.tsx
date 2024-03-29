import { yupResolver } from '@hookform/resolvers/yup'
import { addHours } from 'date-fns'
import {
    useDisclose,
    VStack,
    Text,
    Box,
    keyboardDismissHandlerManager
} from 'native-base'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import ActionButton from '@/components/ActionButton'
import OverlaySheet from '@/components/OverlaySheet'
import Form from '@/components/Form'
import ScreenContainer from '@/components/ScreenContainer'
import { NavRoute } from '@/mobile/navigation/routes'
import { TabsStackScreenProps } from '@/mobile/navigation/types'
import setFormErrors from '@/shared/setFormErrors'

import { useCreateGameMutation } from '../../../graphql/mutations/CreateGame/index.generated'

import { DivisionFragment, useScreenQuery } from './index.generated'
import SurfacePressable from '@/components/SurfacePressable'
import { Keyboard } from 'react-native'

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

type Props = TabsStackScreenProps<NavRoute.CreateGame>

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
        Keyboard.dismiss()
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
                    name="location"
                    render={() => (
                        <Form.Group label={<Form.Label>Location</Form.Label>}>
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
                                <SurfacePressable
                                    borderColor="danger.solid"
                                    borderWidth={fieldState.error ? 1 : 0}
                                    onPress={onDivisionListOpen}
                                    variant="secondary.lite"
                                >
                                    {selectedDivision ? (
                                        <Text>{selectedDivision.name}</Text>
                                    ) : (
                                        <Text color="secondary.mute">
                                            Click to select
                                        </Text>
                                    )}
                                </SurfacePressable>
                            </Form.Group>
                            <OverlaySheet.Content {...divisionListDisclose}>
                                {divisions.map((division) => (
                                    <OverlaySheet.Item
                                        key={division.id}
                                        onPress={() => {
                                            field.onChange(division.id)
                                            onDivisionSelect(division)
                                        }}
                                    >
                                        <Text>{division.name}</Text>
                                    </OverlaySheet.Item>
                                ))}
                            </OverlaySheet.Content>
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
            </VStack>
        </ScreenContainer>
    )
}
