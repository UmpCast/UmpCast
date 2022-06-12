import { RootStackScreenProps } from '@/navigation/types'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'

type GameScreenProps = RootStackScreenProps<RootStackRoute.Game>

export default function GameScreen({ navigation, route }: GameScreenProps) {
    return <div>GameScreen</div>
}
