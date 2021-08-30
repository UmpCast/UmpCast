import React from 'react'

import { LoaderPromiseWrapperFn } from './useLoaderSubscription'

export const LoaderSubscriptionContext =
    React.createContext<LoaderPromiseWrapperFn | null>(null)
