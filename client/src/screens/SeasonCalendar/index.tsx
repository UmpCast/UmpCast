import { SEASON_CALENDAR_DAY_PARAM } from '@/config/constants/format'
import { DATEFNS_WEEK_STARTS_ON } from '@/config/constants/time'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/screenProps'
import { parse, isValid, startOfWeek } from 'date-fns'

export type SeasonCalendarScreenProps =
    RootStackScreenProps<RootStackRoute.SeasonCalendar>

export default function SeasonCalendarScreen({
    route
}: SeasonCalendarScreenProps) {
    const {
        params: { seasonId, day }
    } = route

    const date = parse(day, SEASON_CALENDAR_DAY_PARAM, new Date())
    if (!isValid(date)) return null

    const week = startOfWeek(date, {
        weekStartsOn: DATEFNS_WEEK_STARTS_ON
    })

    console.log(week)

    return null
}
