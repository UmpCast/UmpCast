import React from 'react'

import { useDisclose } from 'native-base'

import CreateOrganizationButton from '../components/CreateOrganizationButton'
import CreateOrganizationModal from '../components/CreateOrganizationModal'

export default function CreateOrganizationAction() {
    const { isOpen, onOpen, onClose } = useDisclose()

    return (
        <>
            <CreateOrganizationButton onPress={onOpen} />
            <CreateOrganizationModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}
