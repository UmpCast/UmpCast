import { Actionsheet, useDisclose } from 'native-base'

export default function OrganizationInfoActionsheet() {
    const props = useDisclose(true)
    return (
        <Actionsheet {...props}>
            <Actionsheet.Content></Actionsheet.Content>
        </Actionsheet>
    )
}
