import { VStack, HStack } from 'native-base'
import { Control } from 'react-hook-form'

import * as Form from '@/components/Form'
import { SeasonCreateInput } from '@/core/OrgSeason/Create/useSeasonCreateForm'

export interface SeasonCreateFormProp {
    control: Control<SeasonCreateInput>
}

export default function SeasonCreateForm({ control }: SeasonCreateFormProp) {
    return (
        <VStack space={6}>
            <VStack space={4}>
                <Form.Controller
                    control={control}
                    defaultValue=""
                    name="name"
                    render={() => (
                        <Form.Control>
                            <Form.Label>Name</Form.Label>
                            <Form.Input />
                            <Form.ErrorMessage />
                        </Form.Control>
                    )}
                />
                <HStack space={4}>
                    <Form.Controller
                        control={control}
                        defaultValue=""
                        name="startDate"
                        render={() => (
                            <Form.Control>
                                <Form.Label>Start date</Form.Label>
                                <Form.Input />
                                <Form.ErrorMessage />
                            </Form.Control>
                        )}
                    />
                    <Form.Controller
                        control={control}
                        defaultValue=""
                        name="endDate"
                        render={() => (
                            <Form.Control>
                                <Form.Label>End date</Form.Label>
                                <Form.Input />
                                <Form.ErrorMessage />
                            </Form.Control>
                        )}
                    />
                </HStack>
            </VStack>
        </VStack>
    )
}
