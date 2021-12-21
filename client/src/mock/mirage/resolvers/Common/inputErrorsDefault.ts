import { AppServerResolver } from '../../createPureMirageServer'

const inputErrorDefault: AppServerResolver = (parent) => parent.errors

export default inputErrorDefault
