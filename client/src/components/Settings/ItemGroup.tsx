import { Divider, StyledProps, VStack } from 'native-base'
import { cloneElement, ReactElement } from 'react'

import SettingsCard, { SettingsCardProps } from './Card'

export interface SettingsItemGroupChildProps
    extends Pick<StyledProps, 'borderTopRadius' | 'borderBottomRadius'> {}

type SettingsItemGroupChild =
    | ReactElement<SettingsItemGroupChildProps>
    | null
    | false

export interface SettingsItemGroupProps extends SettingsCardProps {
    children: SettingsItemGroupChild[] | SettingsItemGroupChild
}

export default function SettingsItemGroup({
    children,
    ...rest
}: SettingsItemGroupProps) {
    const arrChildren = Array.isArray(children) ? children : [children]

    const dividedChildren = arrChildren
        .filter((child) => !!child)
        .flatMap((child, index, arr) => {
            if (!child) return []

            const isFirst = index === 0
            const isLast = index === arr.length - 1

            const clonedChild = cloneElement(child, {
                borderTopRadius: isFirst ? 5 : 0,
                borderBottomRadius: isLast ? 5 : 0,
                key: index
            })

            return isLast
                ? clonedChild
                : [
                      clonedChild,
                      <Divider key={`${index}-divider`} bg="blueGray.200" />
                  ]
        })

    return (
        <SettingsCard {...rest}>
            <VStack>{dividedChildren}</VStack>
        </SettingsCard>
    )
}
