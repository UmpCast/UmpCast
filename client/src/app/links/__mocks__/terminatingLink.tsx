import { ApolloLink, Observable } from '@apollo/client'

export default function mockTerminatingLink(
    callback: (sub: ZenObservable.SubscriptionObserver<any>) => void
) {
    return new ApolloLink(() => new Observable(callback))
}
