import {
    association,
    Model,
    belongsTo,
    hasMany,
    Factory,
    createServer as createMirageServer
} from 'miragejs'
import { subMonths, startOfDay, addMonths } from 'date-fns'
import { loadAppExtra } from '@/app/common/utils/appBuild'

export type AppServerType = ReturnType<typeof createPureMirageServer>

export type AppServerContext = {
    mirageServer: AppServerType
}

export type AppServerResolver = (
    obj: any,
    args: any,
    context: AppServerContext,
    info: any
) => any

export default function createPureMirageServer(environment: string) {
    return createMirageServer({
        environment,
        models: {
            userType: Model.extend({
                userPermit: belongsTo(),
                ownedOrganizationList: hasMany('organizationType')
            }),
            userPermit: Model.extend({
                managerPermitList: hasMany('managerPermit'),
                refereePermitList: hasMany('refereePermit')
            }),
            refereePermit: Model,
            managerPermit: Model.extend({
                season: belongsTo('seasonType')
            }),
            seasonType: Model.extend({
                organization: belongsTo('organizationType')
            }),
            organizationType: Model.extend({})
        },
        factories: {
            userType: Factory.extend({
                userPermit: association(),
                firstName: (i) => `User ${i + 1}`,
                lastName: (i) => `User ${i + 1}`
            }),
            managerPermit: Factory.extend({
                season: association()
            }),
            seasonType: Factory.extend({
                organization: association(),
                startDate: () => subMonths(startOfDay(new Date()), 1),
                endDate: () => addMonths(startOfDay(new Date()), 2),
                name: 'Fall 2021'
            }),
            organizationType: Factory.extend({
                name: (i) => `Organization ${i + 1}`
            })
        },
        routes() {
            this.urlPrefix = loadAppExtra().SERVER_GRAPHQL_URL
            this.passthrough(
                (request: Request) => !request.url.includes('localhost')
            )
        }
    })
}
