import faker from 'faker'

export const idField = (field: string) =>
    [field, faker.datatype.uuid()].join('-')
