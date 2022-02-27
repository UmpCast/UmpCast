import React from 'react'
export default class ErrorBoundary extends React.Component {
    constructor(props: any) {
        super(props)
    }

    componentDidCatch(error: any) {
        console.log(error)
    }

    render() {
        return this.props.children
    }
}
