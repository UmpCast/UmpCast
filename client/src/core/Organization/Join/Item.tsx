import { OrgInfoItemLayout } from '../Info/Item'
import { Icon, useDisclose } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import OrgJoinModal from './Modal'

export default function OrgJoinItem() {
    const modalState = useDisclose()

    return (
        <>
            <OrgInfoItemLayout
                source={<Icon as={AntDesign} name="plus" color="indigo.500" />}
                title="Join Organization"
                onPress={modalState.onOpen}
            />
            <OrgJoinModal {...modalState} />
        </>
    )
}
