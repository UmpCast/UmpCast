import React from 'react'

export interface ErrorBoundaryProp {
    children: React.ReactNode
}

export default class ErrorBoundary extends React.Component {
    props: ErrorBoundaryProp

    constructor(props: ErrorBoundaryProp) {
        super(props)
        this.props = props
    }

    componentDidCatch(error: any) {
        // eslint-disable-next-line no-console
        console.log(error)
    }

    render() {
        const { children } = this.props

        return children
    }
}
