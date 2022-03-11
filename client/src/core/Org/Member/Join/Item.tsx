import { AntDesign } from '@expo/vector-icons'
import { Icon, useDisclose } from 'native-base'

import { OrgInfoItemLayout } from '../../Info/Item'

import OrgJoinModal from './Modal'

export default function OrgJoinItem() {
    const modalState = useDisclose()

    return (
        <>
            <OrgInfoItemLayout
                name="Join Organization"
                onPress={modalState.onOpen}
                source={<Icon as={AntDesign} color="indigo.500" name="plus" />}
            />
            <OrgJoinModal {...modalState} />
        </>
    )
}
