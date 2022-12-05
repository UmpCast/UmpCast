import { faker } from '@faker-js/faker'

export const genCalendarGames = (n: number) => {
    return [...Array(20)]
        .map(() => {
            return {
                startTime: faker.date.between('2022-11-01', '2022-12-01')
            }
        })
        .sort((a, b) => {
            return a.startTime.getTime() - b.startTime.getTime()
        })
}
