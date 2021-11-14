import React from 'react'

import { VStack, Button } from 'native-base'
import { useForm } from 'react-hook-form'

import ControlledInput from 'components/ControlledInput'

export default function CreateOrganizationForm() {
    const { control } = useForm({
        defaultValues: {
            name: ''
        }
    })

    return (
        <VStack mx="4" space={4}>
            <ControlledInput
                label="Name"
                name="name"
                placeholder="Organization name"
                control={control}
                _focus={{ borderColor: 'indigo.500' }}
            />
            <Button colorScheme="indigo">Create</Button>
        </VStack>
    )
}
