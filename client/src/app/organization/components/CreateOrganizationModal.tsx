import React from 'react'

import { Modal } from 'native-base'

export default function AddOrganizationModal({
    isOpen,
    onClose
}: {
    isOpen: boolean
    onClose: () => void
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>Create Organization</Modal.Header>
                <Modal.Body />
            </Modal.Content>
        </Modal>
    )
}
