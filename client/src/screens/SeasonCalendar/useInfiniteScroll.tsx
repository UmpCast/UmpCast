import { useEffect, useState } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'

import {
    SeasonCalendarInfiniteScroll_GameFragment as Game,
    SeasonCalendarInfiniteScroll_SeasonFragment as Season,
    useSeasonCalendarInfiniteScroll_InitialGamesQuery as useInitialGamesQuery,
    useSeasonCalendarInfiniteScroll_MoreGamesAfterQuery as useMoreGamesAfterQuery,
    useSeasonCalendarInfiniteScroll_MoreGamesBeforeQuery as useMoreGamesBeforeQuery
} from '@/generated'

export interface SeasonCalendarInfiniteScrollOptions {
    season: Season
    elementBufferCount?: number
    fetchCount?: number
}

interface PaginationState {
    elements: Game[]
    startCursor: string | null
    endCursor: string | null
    hasPreviousPage: boolean
    hasNextPage: boolean
    fetchingPrevious: boolean
    fetchingNext: boolean
}

export default function useSeasonCalendarInfiniteScroll({
    season: seasonInfo,
    elementBufferCount = 10,
    fetchCount = 20
}: SeasonCalendarInfiniteScrollOptions) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [pagination, setPagination] = useState<PaginationState>({
        elements: [],
        startCursor: null,
        endCursor: null,
        hasPreviousPage: false,
        hasNextPage: false,
        fetchingPrevious: true,
        fetchingNext: true
    })

    const [initialGamesState] = useInitialGamesQuery({
        variables: {
            seasonId: seasonInfo.id,
            currentDate: currentDate.toISOString(),
            count: fetchCount
        }
    })
    useEffect(() => {
        const season = initialGamesState.data?.season
        if (!season) {
            setPagination((state) => ({
                ...state,
                fetchingPrevious: false,
                fetchingNext: false
            }))
            return
        }

        const { beforeGames, afterGames } = season
        const {
            nodes: afterNodes,
            pageInfo: { endCursor, hasNextPage }
        } = afterGames
        const {
            nodes: beforeNodes,
            pageInfo: { startCursor, hasPreviousPage }
        } = beforeGames

        setPagination({
            elements: [...(beforeNodes ?? []), ...(afterNodes ?? [])],
            startCursor,
            endCursor,
            hasPreviousPage,
            hasNextPage,
            fetchingPrevious: false,
            fetchingNext: false
        })
    }, [initialGamesState.data])

    const [moreGamesAfterState, refetchMoreGamesAfter] = useMoreGamesAfterQuery(
        {
            pause: true,
            variables: {
                seasonId: seasonInfo.id,
                after: pagination.endCursor,
                first: fetchCount
            }
        }
    )
    useEffect(() => {
        const season = moreGamesAfterState.data?.season
        if (!season) {
            setPagination((state) => ({
                ...state,
                fetchingNext: false
            }))
            return
        }

        const {
            nodes,
            pageInfo: { hasNextPage, endCursor }
        } = season.games

        setPagination((state) => ({
            ...state,
            elements: [...state.elements, ...(nodes ?? [])],
            fetchingNext: false,
            hasNextPage,
            endCursor
        }))
    }, [moreGamesAfterState.data])

    const [moreGamesBeforeState, refetchMoreGamesBefore] =
        useMoreGamesBeforeQuery({
            pause: true,
            variables: {
                seasonId: seasonInfo.id,
                before: pagination.startCursor,
                last: fetchCount
            }
        })
    useEffect(() => {
        const season = moreGamesBeforeState.data?.season
        if (!season) {
            setPagination((state) => ({
                ...state,
                fetchingNext: false
            }))
            return
        }

        const {
            nodes,
            pageInfo: { hasPreviousPage, startCursor }
        } = season.games

        setPagination((state) => ({
            ...state,
            elements: [...state.elements, ...(nodes ?? [])],
            fetchingPrevious: false,
            hasPreviousPage,
            startCursor
        }))
    }, [moreGamesBeforeState.data, setPagination])

    const onScroll = ({
        nativeEvent: {
            contentOffset: { y },
            contentSize: { height: contentHeight },
            layoutMeasurement: { height: layoutHeight }
        }
    }: NativeSyntheticEvent<NativeScrollEvent>) => {
        const yEnd = y + layoutHeight

        const avgElementHeight = contentHeight / pagination.elements.length

        const hiddenElementsBefore = y / avgElementHeight
        const hiddenElementsAfter = (contentHeight - yEnd) / avgElementHeight

        if (
            hiddenElementsBefore < elementBufferCount &&
            pagination.hasPreviousPage &&
            pagination.startCursor &&
            !pagination.fetchingPrevious
        ) {
            setPagination((state) => ({
                ...state,
                fetchingPrevious: true
            }))
            refetchMoreGamesBefore()
        } else if (
            hiddenElementsAfter < elementBufferCount &&
            pagination.hasNextPage &&
            pagination.endCursor &&
            !pagination.fetchingNext
        ) {
            setPagination((state) => ({
                ...state,
                fetchingNext: true
            }))
            refetchMoreGamesAfter()
        }
    }

    const goToDate = setCurrentDate

    return {
        games: pagination.elements,
        goToDate,
        onScroll
    }
}
