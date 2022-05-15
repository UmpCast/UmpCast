import { Button } from 'native-base'

import useSeasonCalendarInfiniteScroll from './useInfiniteScroll'

export default function SeasonCalendar() {
    const { games, onScroll } = useSeasonCalendarInfiniteScroll({
        season: {
            id: '1'
        }
    })

    return (
        <Button
            onPress={() =>
                onScroll({
                    // @ts-ignore
                    nativeEvent: {
                        contentOffset: { x: 0, y: 0 },
                        contentSize: {
                            width: 0,
                            height: games.length * 100
                        },
                        layoutMeasurement: { width: 0, height: 500 }
                    }
                })
            }
        >
            To top
        </Button>
    )
}
