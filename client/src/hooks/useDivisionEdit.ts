import { useDisclose } from 'native-base'
import { useState } from 'react'

import { useDeleteDivisionMutation } from '@/generated'

export default function useDivisionEdit() {
    const [_, deleteDivision] = useDeleteDivisionMutation()

    const [selectedDivision, setSelectedDivision] = useState<any>(null)

    const confirmModal = useDisclose()
    const actionModal = useDisclose()

    const startDivisionEdit = (division: any) => {
        setSelectedDivision(division)
        actionModal.onOpen()
    }

    const confirmDivisionDelete = async () => {
        confirmModal.onClose()
        actionModal.onClose()
        await deleteDivision({ id: selectedDivision.id })
    }

    return {
        confirmModal,
        actionModal,
        startDivisionEdit,
        confirmDivisionDelete,
        selectedDivision
    }
}
