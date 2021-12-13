import React from 'react'

import { ArrowForwardIcon, Button, Text } from 'native-base'

import { Season } from '../models/Season'

export type SeasonSelectableProps = {
    season: Season
    isSelected: boolean
    onSelect: (id: string) => void
}

export default function SeasonSelectable({
    season: { name, id, organization },
    isSelected,
    onSelect
}: SeasonSelectableProps) {
    return (
        <Button
            onPress={() => onSelect(id)}
            justifyContent="flex-start"
            leftIcon={<ArrowForwardIcon />}
            variant="outline"
            colorScheme="light"
            borderColor={isSelected ? 'indigo.500' : null}
            testID={isSelected ? 'selected-organization-selectable' : undefined}
        >
            <Text>{name}</Text>
            <Text fontSize="xs" color="muted.500">
                {organization.name}
            </Text>
        </Button>
    )
}
