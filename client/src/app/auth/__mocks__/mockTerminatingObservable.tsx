import Observable from 'zen-observable'

export default function mockTerminatingObservable(value: any): Observable<any> {
    return new Observable((sub) => {
        sub.next(value)
        sub.complete()
    })
}
