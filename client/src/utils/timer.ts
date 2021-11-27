import { useState, useEffect } from 'react'

export default function useTimer(ms: number) {
    const [passed, setPassed] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setPassed(true), ms)
        return () => clearTimeout(timer)
    }, [setTimeout, setPassed])

    return passed
}
