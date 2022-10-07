import ActionButton from '@/components/ActionButton'
import DividedList from '@/components/DividedList'
import ScreenContainer from '@/components/ScreenContainer'
import Subheader from '@/components/Subheader'
import PositionTitle from '@/features/PositionTitle'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import { VStack, HStack, Text, Checkbox } from 'native-base'
import Surface from '../../../components/Surface'
import {
    RefreeSettingsScreen_VisibilityFragment as VisibilityFragment,
    useScreenQuery
} from './index.generated'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Form from '@/components/Form'
import { yupResolver } from '@hookform/resolvers/yup'

type Input = {
    maxConcurrentAssignment: string
}
import * as yup from 'yup'
import { useUpdateRefereSettingsMutation } from '../../../graphql/mutations/UpdateRefereeSettings/index.generated'
import setFormErrors from '@/shared/setFormErrors'
const resolver = yupResolver(
    yup.object({
        maxConcurrentAssignment: yup.number()
    })
)

type Props = RootStackScreenProps<RootStackRoute.RefreeSettings>

export default function RefereeSettingsScreen({ navigation, route }: Props) {
    const { pop } = navigation
    const { params } = route
    const { seasonId, userId } = params

    const [, updateRefereeSettings] = useUpdateRefereSettingsMutation()
    const [{ data: screenData }] = useScreenQuery({
        variables: {
            seasonId,
            userId
        }
    })

    const [pendingVisibility, setPendingVisibility] = useState<null | VisibilityFragment[]>(null)

    const { control, setError, setValue, handleSubmit } = useForm<Input>({
        resolver
    })

    useEffect(() => {
        if (!screenData) {
            return
        }

        const { permit } = screenData.season.participant

        setPendingVisibility(permit.visibility)
        setValue('maxConcurrentAssignment', String(permit.maxConcurrentAssignment))
    }, [screenData])

    if (!screenData) {
        return null
    }
    const { season } = screenData
    const { participant } = season
    const { user, permit, viewerCanUpdatePermit } = participant

    const pronoun = user.isViewer ? 'you' : 'they'

    if (!viewerCanUpdatePermit) {
        return (
            <ScreenContainer title="Referee settings">
                <VStack space="sm">
                    <Subheader>Self Assign Limit</Subheader>
                    <Surface>
                        <Text>{permit.maxConcurrentAssignment}</Text>
                    </Surface>
                    <Text color="secondary.mute" fontSize="sm">
                        Number of games {pronoun} can be assigned to at a time
                    </Text>
                    <Subheader>Visibility</Subheader>
                    <Surface>
                        <VStack space="md">
                            {permit.visibility.map((visibility) => {
                                const { position, visible } = visibility
                                const { division } = position

                                return (
                                    <HStack
                                        alignItems="center"
                                        justifyContent="space-between"
                                        key={position.id}
                                    >
                                        <PositionTitle division={division} position={position} />
                                        <Checkbox
                                            isChecked={visible}
                                            isDisabled={true}
                                            value=""
                                            accessibilityLabel="checkbox"
                                        />
                                    </HStack>
                                )
                            })}
                        </VStack>
                    </Surface>
                    <Text color="secondary.mute" fontSize="sm">
                        Positions {pronoun} can be assigned to
                    </Text>
                </VStack>
            </ScreenContainer>
        )
    }

    const onSavePress = handleSubmit(async (input) => {
        if (!pendingVisibility) {
            return null
        }

        const { data } = await updateRefereeSettings({
            input: {
                maxConcurrentAssignment: Number(input.maxConcurrentAssignment),
                visibility: pendingVisibility.map((vis) => {
                    return {
                        positionId: vis.position.id,
                        visible: vis.visible
                    }
                })
            }
        })

        if (!data) {
            return
        }

        const { success, errors } = data.updateSeasonParticipantPermit

        if (success) {
            pop()
            return
        }

        setFormErrors(errors, setError)
    })

    const onPositionVisibilityToggle = (
        pendingVisibility: VisibilityFragment[],
        positionId: string
    ) => {
        setPendingVisibility(
            pendingVisibility.map((vis) => {
                if (vis.position.id === positionId) {
                    return {
                        ...vis,
                        visible: !vis.visible
                    }
                }

                return vis
            })
        )
    }

    if (!pendingVisibility) {
        return null
    }

    return (
        <ScreenContainer
            title="Referee settings"
            headerRight={<ActionButton onPress={onSavePress}>Save</ActionButton>}
        >
            <VStack space="sm">
                <Form.ControlX name="maxConcurrentAssignment" control={control}>
                    <Form.Group label={<Form.Label>Self Assign Limit</Form.Label>}>
                        <Form.Input />
                    </Form.Group>
                </Form.ControlX>
                <Text color="secondary.mute" fontSize="sm">
                    Number of games {pronoun} be assigned to at a time
                </Text>
                <Subheader>Visibility</Subheader>
                <Surface>
                    <VStack space="md">
                        {pendingVisibility.map((visibility) => {
                            const { position, visible } = visibility
                            const { division } = position

                            return (
                                <HStack
                                    alignItems="center"
                                    justifyContent="space-between"
                                    key={position.id}
                                >
                                    <PositionTitle division={division} position={position} />
                                    <Checkbox
                                        isChecked={visible}
                                        isDisabled={!viewerCanUpdatePermit}
                                        onChange={() => {
                                            onPositionVisibilityToggle(
                                                pendingVisibility,
                                                visibility.position.id
                                            )
                                        }}
                                        accessibilityLabel="checkbox"
                                        value=""
                                    />
                                </HStack>
                            )
                        })}
                    </VStack>
                </Surface>
                <Text color="secondary.mute" fontSize="sm">
                    Positions {pronoun} can be assigned to
                </Text>
            </VStack>
        </ScreenContainer>
    )
}
