import { useEffect, useState } from "react"
import { formatInTimeZone } from "date-fns-tz"
import { add, addHours, getHours } from "date-fns"
import { myBackgrounds } from "../Icons/Backdrops/background"


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

            
            <div className="flex flex-col gap-y-[10px] ml-5 mt-5 items-center">

                <img src={icon} alt="" className="h-[200px] w-[200px]"/>
                <div className="text-[36px]">{condition}</div>
                <div>{tempature}<span>&#176; F</span></div>
                <div>{time}</div>
                <div className="text-2xl">{address}</div>


            </div>
        
        </>
    )
}

 

export const Details = ({details}) => {


    return (

        <>

            <div className="flex flex-col items-center justify-center text-2xl  gap-y-[10px]">

                <div className="flex flex-col items-center gap-y-[10px] m-5">

                    <div className="flex flex-row gap-x-10 items-center "> 
                        <img src={details.humidityIcon} alt="humidityIcon" className="h-[48px] w-[48px]" />
                        <div>Humidity</div>
                    </div>
                    
                    <div>{details.humidity} %</div>
                </div>

                <div className="flex flex-col items-center gap-y-10 m-5">

                    <div className="flex flex-row gap-x-10 "> 
                        <img src={details.highsIcon} alt="humidityIcon" className="h-[48px] w-[48px]" />
                        <div>Todays Highs</div>
                    </div>
                    
                    <div>{details.highs}<span>&#176; F</span></div>
                </div>

                <div className="flex flex-col items-center gap-y-10 m-5">

                    <div className="flex flex-row gap-x-10 "> 
                        <img src={details.chanceIcon} alt="humidityIcon" className="h-[48px] w-[48px]" />
                        <div>Chance of Rain</div>
                    </div>
                    
                    <div>{details.chance} %</div>
                </div>

                <div className="flex flex-col items-center gap-y-10 m-5">

                    <div className="flex flex-row gap-x-10 "> 
                        <img src={details.speedIcon} alt="humidityIcon" className="h-[48px] w-[48px]" />
                        <div>Wind Speed</div>
                    </div>
                    
                    <div>{details.speed} km/h</div>
                </div>
            </div>

        </>
    )



}

