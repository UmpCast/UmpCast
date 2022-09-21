import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import ScreenContainer from '@/nx/components/ScreenContainer'
import Form from '@/nx/components/Form'
import { useForm } from 'react-hook-form'
import { initialState } from '../../../../../../landing-page/src/contexts/app/app.reducer'

type Input = {
    name: string
    startDate: Date
}

type Props = RootStackScreenProps<RootStackRoute.CreateSeason>

export default function CreateSeasonScreen({ navigation }: Props) {
    const { control } = useForm<Input>({
        defaultValues: {
            startDate: new Date()
        }
    })

    return (
        <ScreenContainer title="Create Season">
            <Form.Container>
                <Form.Control
                    name="name"
                    control={control}
                    render={() => {
                        return (
                            <Form.Group label={<Form.Label>Name</Form.Label>}>
                                <Form.Input />
                            </Form.Group>
                        )
                    }}
                />
                <Form.Control
                    name="startDate"
                    control={control}
                    render={() => {
                        return (
                            <Form.Group label={<Form.Label>Start Date</Form.Label>}>
                                <Form.DateInput />
                            </Form.Group>
                        )
                    }}
                />
            </Form.Container>
        </ScreenContainer>
    )
}
