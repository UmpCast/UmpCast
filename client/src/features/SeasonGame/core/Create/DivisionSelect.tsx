import { Select } from 'native-base'

import * as Form from '@/components/Form'
import { SeasonGameCreateDivisionSelect_SeasonFragment } from '@/graphql/generated'

export interface SeasonGameCreateDivisionSelectProps {
    season: SeasonGameCreateDivisionSelect_SeasonFragment
}

export default function SeasonGameCreateDivisionSelect({
    season
}: SeasonGameCreateDivisionSelectProps) {
    const { divisions } = season
    return (
        <Form.Select placeholder="Select Division">
            {divisions.map((division) => (
                <Select.Item key={division.id} label={division.name} value={division.id} />
            ))}
        </Form.Select>
    )
}
