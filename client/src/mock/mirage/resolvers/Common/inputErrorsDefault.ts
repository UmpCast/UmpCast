import { AppServerResolver } from '../../createPureMirageServer'

const inputErrorsDefault: AppServerResolver = (parent) => parent.errors

export default inputErrorsDefault
