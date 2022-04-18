import ScreenContainer from '@/components/Screen/Container'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'
import * as Form from '@/components/Form'
import { Button, VStack } from 'native-base'
import { getMinutes, addMinutes, isAfter } from 'date-fns'
import { useSeasonGameNewScreenQuery } from '@/generated'
import SeasonGameCreateDateTimeInput from '@/features/SeasonGame/core/Create/DateTimeInput'
import SeasonGameCreateDivisionSelect from '@/features/SeasonGame/core/Create/DivisionSelect'
import useSeasonGameCreateForm from '@/features/SeasonGame/core/Create/useForm'

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

    const { goBack } = navigation
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
                    name="name"
                    control={control}
                    render={() => {
                        return (
                            <Form.Control>
                                <Form.Label>Title</Form.Label>
                                <Form.Input />
                                <Form.ErrorMessage />
                            </Form.Control>
                        )
                    }}
                />
                <Form.Controller
                    name="divisionId"
                    control={control}
                    render={() => {
                        return (
                            <Form.Control>
                                <Form.Label>Division</Form.Label>
                                <SeasonGameCreateDivisionSelect
                                    season={season}
                                />
                                <Form.ErrorMessage />
                            </Form.Control>
                        )
                    }}
                />
                <Form.Controller
                    name="startTime"
                    control={control}
                    render={() => {
                        return (
                            <Form.Control>
                                <Form.Label>Start Time</Form.Label>
                                <SeasonGameCreateDateTimeInput />
                            </Form.Control>
                        )
                    }}
                />
                <Form.Controller
                    name="endTime"
                    control={control}
                    render={() => {
                        return (
                            <Form.Control>
                                <Form.Label>End Time</Form.Label>
                                <SeasonGameCreateDateTimeInput />
                                <Form.ErrorMessage />
                            </Form.Control>
                        )
                    }}
                />
                <Form.Controller
                    name="location"
                    control={control}
                    render={() => {
                        return (
                            <Form.Control>
                                <Form.Label>Location</Form.Label>
                                <Form.Input />
                                <Form.ErrorMessage />
                            </Form.Control>
                        )
                    }}
                />
            </VStack>
            <Button colorScheme="indigo" mt={6} onPress={handleSubmit(goBack)}>
                Create
            </Button>
        </ScreenContainer>
    )
}
