import { useDeleteDivisionMutation } from '@/generated'
import { EditStructService } from '@/machines/editStructMachine'
import { useSelector } from '@xstate/react'
import { Actionsheet, Box, Heading, Text, useDisclose } from 'native-base'
import DivisionDeleteModal from './DivisionDeleteModal'

export default function DivisionActionSheet({
    division
}: {
    division: {
        id: string
        name?: string
    } | null
}) {
    const confirmDivDelete = useDisclose(true)
    const [_, deleteDivision] = useDeleteDivisionMutation()
    const onConfirm = async () => {
        confirmDivDelete.onClose()
        await deleteDivision({ id: '1' })
    }

    return (
        <Actionsheet isOpen={confirmDivDelete.isOpen}>
            <DivisionDeleteModal
                isOpen={confirmDivDelete.isOpen}
                onClose={confirmDivDelete.onClose}
                onConfirm={onConfirm}
            />
        </Actionsheet>
    )
}
