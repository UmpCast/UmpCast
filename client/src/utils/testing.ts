import { render, RenderAPI } from '@testing-library/react-native'

export const renderAware = (component: JSX.Element) =>
    (process.env.NODE_ENV === 'test'
        ? render(component)
        : component) as RenderAPI
