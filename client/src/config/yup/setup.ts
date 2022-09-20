import { parse, isValid } from 'date-fns'
import * as yup from 'yup'

yup.setLocale({
    mixed: {
        required: 'Required'
    }
})

function isDate(this: yup.StringSchema, pattern: string, message = 'Invalid date') {
    return this.test('is-date', message, (s) => {
        if (!s) return false
        const date = parse(s, pattern, new Date())
        return isValid(date)
    })
}

yup.addMethod(yup.string, 'isDate', isDate)
