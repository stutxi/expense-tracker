import { useEffect, useState } from "react"

export const useWindowSize = () => {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight])
    
    useEffect(() => {
        const handleResize = () => {
            setSize([window.innerWidth, window.innerHeight])
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return {
        width: size[0],
        height: size[1]
    }
}