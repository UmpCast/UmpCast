import { Button } from 'native-base'
import { IButtonProps } from 'native-base/lib/typescript/components/primitives/Button/types'

export default function SolidButton(props: IButtonProps) {
    return (
        <Button
            borderWidth={2}
            colorScheme="blueGray"
            variant="outline"
            {...props}
        />
    )
}
