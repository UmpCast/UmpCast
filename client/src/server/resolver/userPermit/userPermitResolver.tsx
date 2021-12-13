import { AppServerResolver } from 'server/createAppServer'
import { mirageGraphQLFieldResolver } from '@miragejs/graphql'
import { isWithinInterval } from 'date-fns'

export const managerPermitListResolver: AppServerResolver = (
    userPermit,
    args,
    context,
    info
) => {
    const { active, ...rest } = args

    const { managerPermitList } = userPermit

    const newManagerPermitList = managerPermitList.filter(
        (managerPermit: any) => {
            if (active !== undefined) {
                const { startDate, endDate } = managerPermit.season
                const isActive = isWithinInterval(new Date(), {
                    start: startDate,
                    end: endDate
                })

                if (active !== isActive) return false
            }

            return true
        }
    )

    return mirageGraphQLFieldResolver(
        { ...userPermit, managerPermitList: newManagerPermitList },
        rest,
        context,
        info
    )
}

export default {
    managerPermitList: managerPermitListResolver
}
