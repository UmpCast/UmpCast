import { ApolloLink, Observable } from '@apollo/client'

export default function createTerminatingLink(
    callback: (sub: ZenObservable.SubscriptionObserver<any>) => void
) {
    return new ApolloLink(() => new Observable(callback))
}
