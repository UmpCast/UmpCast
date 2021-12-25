import { DocumentNode } from 'graphql'

export function getGqlString(doc: DocumentNode) {
    return doc.loc?.source.body
}
