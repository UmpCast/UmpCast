import { AppServerResolver } from '../createPureMirageServer'

const inputErrorDefaultResolver: AppServerResolver = (parent) => parent.errors

export default inputErrorDefaultResolver
