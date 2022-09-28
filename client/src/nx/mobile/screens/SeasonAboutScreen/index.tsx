import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import Subheader from '@/nx/components/Subheader'
import Surface from '@/nx/components/Surface'
import { VStack, Text } from 'native-base'
import { useScreenQuery } from './index.generated'
import ScreenContainer from '@/nx/components/ScreenContainer'
import ActionButton from '@/nx/components/ActionButton'
import Form from '@/nx/components/Form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEditSeasonMutation } from '../../../graphql/mutations/EditSeason/index.generated'
import setFormErrors from '@/nx/shared/setFormErrors'

type Input = {
    name: string
}

const resolver = yupResolver(
    yup.object({
        name: yup.string().required()
    })
)

type Props = RootStackScreenProps<RootStackRoute.SeasonAbout>

export default function SeasonAboutScreen({ route, navigation }: Props) {
    const { params } = route
    const { pop } = navigation
    const { seasonId } = params

    const [, editSeason] = useEditSeasonMutation()
    const [{ data }] = useScreenQuery({
        variables: {
            seasonId
        }
    })

    const { handleSubmit, control, setError } = useForm<Input>({
        resolver
    })

    if (!data) {
        return null
    }

    const { season } = data

    if (!season.viewerCanManage) {
        return (
            <ScreenContainer title="About">
                <VStack space="md">
                    <VStack space="sm">
                        <Subheader>Name</Subheader>
                        <Surface>
                            <Text>{season.name}</Text>
                        </Surface>
                    </VStack>
                </VStack>
            </ScreenContainer>
        )
    }

    const onSavePress = handleSubmit(async (input) => {
        const { name } = input
        const { data } = await editSeason({
            input: {
                seasonId,
                name
            }
        })

        if (!data) {
            return null
        }

        const { success, errors } = data.updateSeason

        if (success) {
            pop()
            return
        }

        setFormErrors(errors, setError)
    })

    return (
        <ScreenContainer
            headerRight={<ActionButton onPress={onSavePress}>Save</ActionButton>}
            title="About"
        >
            <VStack space="sm">
                <Form.ControlX control={control} name="name">
                    <Form.Group label={<Form.Label>Name</Form.Label>}>
                        <Form.Input />
                    </Form.Group>
                </Form.ControlX>
            </VStack>
        </ScreenContainer>
    )
}
