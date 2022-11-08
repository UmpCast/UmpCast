import { yupResolver } from '@hookform/resolvers/yup'
import { VStack, Text } from 'native-base'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import ActionButton from '@/components/ActionButton'
import Form from '@/components/Form'
import ScreenContainer from '@/components/ScreenContainer'
import Subheader from '@/components/Subheader'
import Surface from '@/components/Surface'
import { TabsStackRoute } from '@/mobile/navigation/navigators/TabsStack/types'
import { TabsStackScreenProps } from '@/mobile/navigation/types'
import setFormErrors from '@/shared/setFormErrors'

import { useEditSeasonMutation } from '../../../graphql/mutations/EditSeason/index.generated'

import { useScreenQuery } from './index.generated'

type Input = {
    name: string
}

const resolver = yupResolver(
    yup.object({
        name: yup.string().required()
    })
)

type Props = TabsStackScreenProps<TabsStackRoute.SeasonAbout>

export default function SeasonAboutScreen({ route, navigation }: Props) {
    const { params } = route
    const { pop } = navigation
    const { seasonId } = params

    const [, editSeason] = useEditSeasonMutation()
    const [{ data: screenData }] = useScreenQuery({
        variables: {
            seasonId
        }
    })

    const { handleSubmit, control, setValue, setError } = useForm<Input>({
        resolver
    })

    useEffect(() => {
        if (!screenData) {
            return
        }

        const { season } = screenData

        setValue('name', season.name)
    })

    if (!screenData) {
        return null
    }

    const { season } = screenData

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
            return
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
            headerRight={
                <ActionButton onPress={onSavePress}>Save</ActionButton>
            }
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
