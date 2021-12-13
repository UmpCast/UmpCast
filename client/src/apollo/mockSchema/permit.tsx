import { gql } from '@apollo/client'

const permitSchema = gql`
    extend type UserType {
        userPermit: UserPermit!
    }

    type UserPermit {
        managerPermitList(active: Boolean): [ManagerPermit!]!
        refereePermitList: [RefereePermit!]!
    }

    interface Permit {
        season: SeasonType!
    }

    type ManagerPermit implements Permit {
        season: SeasonType!
        permission: [Int]
    }

    type RefereePermit implements Permit {
        season: SeasonType!
        maxCast: Int
    }
`
export default permitSchema
