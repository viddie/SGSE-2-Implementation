import { useEffect, useState, useRef } from 'react'

export const OnlineTime = (props) => {
    const propsDate = new Date(props.date)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)
    const [days, setDays] = useState(0)

    function calcDeltaTime() {
        const currentDate = new Date()
        const diff = Math.abs(currentDate - propsDate)
        // Tage
        const dayDiff = Math.floor(diff / (1000 * 3600 * 24))
        setDays(dayDiff)
        // Stunden
        const hourDiff = Math.floor(diff / (1000 * 3600)) - dayDiff * 24
        setHours(hourDiff)
        // Minuten
        const minutesDiff = Math.floor(
            diff / (1000 * 60) - dayDiff * 24 * 60 - hourDiff * 60
        )
        setMinutes(minutesDiff)
    }

    useEffect(() => {
        calcDeltaTime()
        const interval = setInterval(() => {
            calcDeltaTime()
        }, 30000)
        return () => clearInterval(interval)
    }, [propsDate])

    return (
        <div>
            {days} Tagen {hours} Stunden {minutes} Minuten
        </div>
    )
}
