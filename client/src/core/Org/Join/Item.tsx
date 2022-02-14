import { AntDesign } from '@expo/vector-icons'
import { Icon, useDisclose } from 'native-base'

import { OrgInfoItemLayout } from '../Info/Item'

import OrgJoinModal from './Modal'

export default function OrgJoinItem() {
    const modalState = useDisclose()

    return (
        <>
            <OrgInfoItemLayout
                onPress={modalState.onOpen}
                source={<Icon as={AntDesign} color="indigo.500" name="plus" />}
                title="Join Organization"
            />
            <OrgJoinModal {...modalState} />
        </>
    )
}
