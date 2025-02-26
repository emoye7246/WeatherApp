import { useEffect, useState } from "react"
import { formatInTimeZone } from "date-fns-tz"


export const Conditions = ({icon, condition, tempature, timezone, address}) => {

    const [time, setTime] = useState(formatInTimeZone(new Date(), timezone, 'h : m aaa'))


    useEffect(() => {
        const updateTime = () => {
            setTime(formatInTimeZone(new Date(), timezone, "h:mm aaa"))
        };

        updateTime()
        const interval = setInterval(updateTime, 60000)

        return () => clearInterval(interval)
    }, [timezone])



    return (

        <>
            <div className="flex flex-col">

                <img src={icon} alt="" className="h-[200px] w-[200px]"/>
                <div>{condition}</div>
                <div>{tempature}</div>
                <div>{time}</div>
                <div>{address}</div>



            </div>
        
        </>
    )
}