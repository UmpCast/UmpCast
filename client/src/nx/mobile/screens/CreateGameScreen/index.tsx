import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import { useDisclose, VStack, Text } from 'native-base'
import Form from '@/nx/components/Form'
import { useForm } from 'react-hook-form'
import { addHours } from 'date-fns'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import OptionSheet from '@/nx/components/OptionSheet'
import { DivisionFragment, useScreenQuery } from './index.generated'
import PressableX from '@/nx/components/PressableX'
import { useState } from 'react'
import ActionButton from '@/nx/components/ActionButton'
import ScreenContainer from '@/nx/components/ScreenContainer'
import { useCreateGameMutation } from '../../../graphql/mutations/CreateGame/index.generated'
import setFormErrors from '@/nx/shared/setFormErrors'

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

    const [selectedDivision, setSelectedDivision] = useState<null | DivisionFragment>()

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
            title="Create Game"
            headerRight={<ActionButton onPress={onCreate}>Create</ActionButton>}
        >
            <VStack space="sm">
                <Form.Control
                    control={control}
                    name="name"
                    render={() => {
                        return (
                            <Form.Group label={<Form.Label>Name</Form.Label>}>
                                <Form.Input />
                            </Form.Group>
                        )
                    }}
                />
                <Form.Control
                    control={control}
                    name="divisionId"
                    render={({ field, fieldState }) => {
                        return (
                            <>
                                <Form.Group label={<Form.Label>Division</Form.Label>}>
                                    <PressableX
                                        borderColor="danger.solid"
                                        borderWidth={fieldState.error ? 2 : 0}
                                        onPress={onDivisionListOpen}
                                        size="md"
                                        rounded="sm"
                                        variant="secondary.subtle"
                                    >
                                        {selectedDivision ? (
                                            <Text>{selectedDivision.name}</Text>
                                        ) : (
                                            <Text color="secondary.mute">Click to select</Text>
                                        )}
                                    </PressableX>
                                </Form.Group>
                                <OptionSheet.Container {...divisionListDisclose}>
                                    <OptionSheet.Content>
                                        {divisions.map((division) => {
                                            return (
                                                <OptionSheet.Item
                                                    key={division.id}
                                                    onPress={() => {
                                                        field.onChange(division.id)
                                                        onDivisionSelect(division)
                                                    }}
                                                >
                                                    <Text>{division.name}</Text>
                                                </OptionSheet.Item>
                                            )
                                        })}
                                    </OptionSheet.Content>
                                </OptionSheet.Container>
                            </>
                        )
                    }}
                />
                <Form.Control
                    control={control}
                    name="startTime"
                    render={() => {
                        return (
                            <Form.Group label={<Form.Label>Start Time</Form.Label>}>
                                <Form.DateInput />
                            </Form.Group>
                        )
                    }}
                />
                <Form.Control
                    control={control}
                    name="endTime"
                    render={() => {
                        return (
                            <Form.Group label={<Form.Label>End Time</Form.Label>}>
                                <Form.DateInput />
                            </Form.Group>
                        )
                    }}
                />
                <Form.Control
                    control={control}
                    name="location"
                    render={() => {
                        return (
                            <Form.Group label={<Form.Label>Location</Form.Label>}>
                                <Form.Input />
                            </Form.Group>
                        )
                    }}
                />
            </VStack>
        </ScreenContainer>
    )
}
