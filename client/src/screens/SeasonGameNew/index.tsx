import { getMinutes, addMinutes, isAfter } from 'date-fns'
import { Button, VStack } from 'native-base'

import * as Form from '@/components/Form'
import ScreenContainer from '@/components/Screen/Container'
import SeasonGameCreateDateTimeInput from '@/features/SeasonGame/core/Create/DateTimeInput'
import SeasonGameCreateDivisionSelect from '@/features/SeasonGame/core/Create/DivisionSelect'
import useSeasonGameCreateForm from '@/features/SeasonGame/core/Create/useForm'
import { useSeasonGameNewScreenQuery } from '@/generated'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/types'

const ROUND_INTERVAL = 30

function computeDefaultStartTime(date?: Date) {
    let newDate = new Date()

    if (date && isAfter(date, newDate)) {
        newDate = date
    }

    const minutes = getMinutes(newDate)
    const minutesDelta =
        ROUND_INTERVAL * Math.ceil(minutes / ROUND_INTERVAL) - minutes

    return addMinutes(newDate, minutesDelta)
}

export type SeasonGameNewScreenProps =
    RootStackScreenProps<RootStackRoute.SeasonGameNew>

export default function SeasonGameNewScreen({
    navigation,
    route
}: SeasonGameNewScreenProps) {
    const {
        params: { seasonId, date }
    } = route

    const { navigate } = navigation
    const defaultStartTime = computeDefaultStartTime(date)

    const [{ data: screenData }] = useSeasonGameNewScreenQuery({
        variables: {
            seasonId
        }
    })
    const season = screenData?.season

    const { control, handleSubmit } = useSeasonGameCreateForm({
        startTime: defaultStartTime
    })

    if (!season) return null

    return (
        <ScreenContainer>
            <VStack space={2}>
                <Form.Controller
                    control={control}
                    name="name"
                    render={() => (
                        <Form.Control>
                            <Form.Label>Title</Form.Label>
                            <Form.Input />
                            <Form.ErrorMessage />
                        </Form.Control>
                    )}
                />
                <Form.Controller
                    control={control}
                    name="divisionId"
                    render={() => (
                        <Form.Control>
                            <Form.Label>Division</Form.Label>
                            <SeasonGameCreateDivisionSelect season={season} />
                            <Form.ErrorMessage />
                        </Form.Control>
                    )}
                />
                <Form.Controller
                    control={control}
                    name="startTime"
                    render={() => (
                        <Form.Control>
                            <Form.Label>Start Time</Form.Label>
                            <SeasonGameCreateDateTimeInput />
                        </Form.Control>
                    )}
                />
                <Form.Controller
                    control={control}
                    name="endTime"
                    render={() => (
                        <Form.Control>
                            <Form.Label>End Time</Form.Label>
                            <SeasonGameCreateDateTimeInput />
                            <Form.ErrorMessage />
                        </Form.Control>
                    )}
                />
                <Form.Controller
                    control={control}
                    name="location"
                    render={() => (
                        <Form.Control>
                            <Form.Label>Location</Form.Label>
                            <Form.Input />
                            <Form.ErrorMessage />
                        </Form.Control>
                    )}
                />
            </VStack>
            <Button
                colorScheme="indigo"
                mt={6}
                onPress={handleSubmit((input) => {
                    navigate(RootStackRoute.SeasonCalendar, {
                        seasonId: season.id,
                        day: new Date(input.startTime)
                    })
                })}
            >
                Create
            </Button>
        </ScreenContainer>
    )
}
