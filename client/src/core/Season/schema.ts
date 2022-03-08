import { isAfter, isValid } from 'date-fns'
import * as yup from 'yup'

const dateFormat = 'MM/dd/yyyy'

export const seasonSchema = yup.object({
    name: yup
        .string()
        .required()
        .matches(
            /^[A-Za-z0-9 ]*$/,
            'Only alphanumeric characters or space allowed'
        ),
    startDate: yup
        .string()
        .required()
        .isDate(dateFormat)
        .test('start-date', 'Must start after today', function (value) {
            const date = new Date(value as string)
            return isAfter(date, Date.now())
        }),
    endDate: yup
        .string()
        .required()
        .isDate(dateFormat)
        .test('end-date', 'Must end after start date', function (field) {
            const endDate = new Date(field as string)
            const startDate = new Date(
                this.resolve(yup.ref<string>('startDate'))
            )

            if (!isValid(startDate)) return true

            return isAfter(endDate, startDate)
        })
})
