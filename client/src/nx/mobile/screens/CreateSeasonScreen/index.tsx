import { useForm } from 'react-hook-form'

import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import ActionButton from '@/nx/components/ActionButton'
import Form from '@/nx/components/Form'
import ScreenContainer from '@/nx/components/ScreenContainer'

type Input = {
    name: string
    startDate: Date
}

type Props = RootStackScreenProps<RootStackRoute.CreateSeason>

export default function CreateSeasonScreen({ navigation }: Props) {
    const { pop } = navigation
    const { control } = useForm<Input>({
        defaultValues: {
            startDate: new Date()
        }
    })

    const onCreatePress = () => {
        pop()
    }

    return (
        <ScreenContainer
            headerRight={<ActionButton onPress={onCreatePress}>Create</ActionButton>}
            title="Create Season"
        >
            <Form.Container>
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
                    name="startDate"
                    render={() => (
                        <Form.Group label={<Form.Label>Start Date</Form.Label>}>
                            <Form.DateInput />
                        </Form.Group>
                    )}
                />
            </Form.Container>
        </ScreenContainer>
    )
}
