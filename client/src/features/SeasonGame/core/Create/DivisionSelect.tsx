import * as Form from '@/components/Form'
import { SeasonGameCreateDivisionSelect_SeasonFragment } from '@/generated'
import { Select } from 'native-base'

export interface SeasonGameCreateDivisionSelectProps {
    season: SeasonGameCreateDivisionSelect_SeasonFragment
}

export default function SeasonGameCreateDivisionSelect({
    season
}: SeasonGameCreateDivisionSelectProps) {
    const { divisions } = season
    return (
        <Form.Select placeholder="Select Division">
            {divisions.map((division) => {
                return (
                    <Select.Item
                        label={division.name}
                        value={division.id}
                        key={division.id}
                    />
                )
            })}
        </Form.Select>
    )
}
