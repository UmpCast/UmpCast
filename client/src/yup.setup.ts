import * as yup from 'yup'
import { parse, isValid } from 'date-fns'

yup.setLocale({
    mixed: {
        required: 'Required'
    }
})

yup.addMethod(
    yup.string,
    'isDate',
    function (pattern, message = 'Invalid date') {
        return this.test('is-date', message, (s) => {
            if (!s) return false
            const date = parse(s, pattern, new Date())
            return isValid(date)
        })
    }
)
