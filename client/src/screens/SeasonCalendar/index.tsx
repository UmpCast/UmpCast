import { Button } from 'native-base'
import { useRef, useState } from 'react'
import { FlatList } from 'react-native'

const arr = [...Array(50).keys()]
export default function SeasonCalendarScreen() {
    const flatListRef = useRef<FlatList<number>>()
    const [end, setEnd] = useState(false)

    return (
        <FlatList
            ref={(ref) => {
                if (ref) {
                    flatListRef.current = ref
                }
            }}
            data={arr}
            keyExtractor={(item) => String(item)}
            onEndReached={() => setEnd(true)}
            onEndReachedThreshold={1}
            onMomentumScrollEnd={() => {
                if (end) {
                    setEnd(false)
                }
            }}
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
        />
    )
}
