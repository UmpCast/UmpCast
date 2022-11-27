import { Fab, IFabProps } from 'native-base'

export default function ActionFab(props: IFabProps) {
    return (
        <Fab
            mr="20px"
            mb="20px"
            position="absolute"
            placement="bottom-right"
            renderInPortal={false}
            {...props}
        />
    )
}
