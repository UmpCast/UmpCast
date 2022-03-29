import { FlatList } from 'react-native'
import { Button } from 'native-base'
import { useRef, useState } from 'react'

const arr = [...Array(50).keys()]
export default function SeasonCalendarScreen() {
    const flatListRef = useRef<FlatList<number>>()
    const [end, setEnd] = useState(false)
    console.log(end)

    return (
        <FlatList
            data={arr}
            renderItem={({ item }) => (
                <Button
                    onPress={() =>
                        flatListRef.current?.scrollToIndex({
                            index: item
                        })
                    }
                >
                    {item}
                </Button>
            )}
            keyExtractor={(item) => String(item)}
            ref={(ref) => {
                if (ref) {
                    flatListRef.current = ref
                }
            }}
            onEndReachedThreshold={1}
            onEndReached={() => setEnd(true)}
            onMomentumScrollEnd={() => {
                if (end) {
                    console.log('reached')
                    setEnd(false)
                }
            }}
        />
    )
}
