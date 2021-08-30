import usePrepareApp from '../hooks/usePrepareApp'

export default function AppBootstrapper({
    children
}: {
    children: JSX.Element
}) {
    const appPrepared = usePrepareApp()
    if (!appPrepared) return null

    return children
}
