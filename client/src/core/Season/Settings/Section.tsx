import { Divider, StyledProps, VStack } from 'native-base'
import SeasonSettingsCard, { SeasonSettingsCardProps } from './Card'
import { cloneElement, ReactElement } from 'react'

export interface SeasonSettingsSectionChildProps
    extends Pick<StyledProps, 'borderTopRadius' | 'borderBottomRadius'> {}

type SeasonSettingsSectionChild =
    | ReactElement<SeasonSettingsSectionChildProps>
    | null
    | false

export interface SeasonSettingsSectionProps extends SeasonSettingsCardProps {
    children: SeasonSettingsSectionChild[] | SeasonSettingsSectionChild
}

export default function SeasonSettingsSection({
    children,
    ...rest
}: SeasonSettingsSectionProps) {
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
                      <Divider bg="blueGray.200" key={index + '-divider'} />
                  ]
        })

    return (
        <SeasonSettingsCard {...rest}>
            <VStack>{dividedChildren}</VStack>
        </SeasonSettingsCard>
    )
}
