import { Divider, StyledProps, VStack } from 'native-base'
import { cloneElement, ReactElement } from 'react'

import SeasonSettingsCard, { SeasonSettingsCardProps } from './Card'

export interface SeasonSettingsItemGroupChildProps
    extends Pick<StyledProps, 'borderTopRadius' | 'borderBottomRadius'> {}

type SeasonSettingsItemGroupChild =
    | ReactElement<SeasonSettingsItemGroupChildProps>
    | null
    | false

export interface SeasonSettingsItemGroupProps extends SeasonSettingsCardProps {
    children: SeasonSettingsItemGroupChild[] | SeasonSettingsItemGroupChild
}

export default function SeasonSettingsItemGroup({
    children,
    ...rest
}: SeasonSettingsItemGroupProps) {
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
        <SeasonSettingsCard {...rest}>
            <VStack>{dividedChildren}</VStack>
        </SeasonSettingsCard>
    )
}
