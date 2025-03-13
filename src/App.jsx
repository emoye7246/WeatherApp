import { useState, useEffect } from "react"
import { Conditions, Details} from "./SearchBar/Conditions"
import { myIcons } from "./icons"
import { myIconsRight } from "./icons"
import { myBackgrounds } from "./background"
import { format} from "date-fns"
import '/src/index.css'


export const App = () => {
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [weather, setWeather] = useState({})
    const [location, setLocation] = useState('Cupertino')
    const [inputLocation, setInputLocation] = useState('Cupertino')
    const [get5days, set5Days] = useState([])
    const [backgrounds, setBackgrounds] = useState('')
    const ApiKey = 'F3SPHFPC6K3H3WATC6D4VDGV9'


    useEffect(() => {
    const fetchData = async () => {



            try{

                const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${ApiKey}`)
                await response.json().then((response) => {
                    

                    setWeather(response)
                    set5Days(response.days[0].hours.slice(0,5))

                    setBackgrounds(response.currentConditions.icon)
                    
                    console.log(response)




                })
                setLoading(false)

            }catch(err){

                setError(err)
                setLoading(false)


            }
    }
    fetchData()
}, [location, backgrounds])

if(loading) return <div className="flex flex-row max-w-screen min-h-screen items-center justify-center gap-x-10">
    <img src={myIcons["clear-day"]} alt="sunIcon" className=" h-[64px] w-[64px]" />
    <div className="text-white">Hang tight while we fetch that report</div>
</div>
if(error ) return <div className="flex flex-row max-w-screen min-h-screen items-center justify-center gap-x-10">
<img src={myIcons["clear-day"]} alt="sunIcon" className="h-[64px] w-[64px]" />
<div className="text-white">Failed finding report please refresh to try again</div>
</div>






    return (

        <>

            

            <div className="flex flex-col min-h-full text-white" style={{backgroundImage: `url(${myBackgrounds[backgrounds]})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', fontFamily: 'Crimson' }}>


                <div className="flex flex-row max-w-full min-h-full justify-between">

                    <div className="flex flex-col min-h-full items-center gap-y-[20px]">
                        
                            <Conditions 
                            icon={myIcons[weather.currentConditions.icon]}
                            condition={weather.currentConditions.conditions}
                            tempature={weather.currentConditions.temp}
                            timezone={weather.timezone}
                            address={weather.resolvedAddress}
                            />

                            <div className="flex flex-row gap-x-5 text-center">
                                <input type="text" onChange={(e) => setInputLocation(e.target.value)} placeholder="Enter Location" className="flex text-center border-black rounded-[14px] bg-gray-100/35" />
                                <img src={myIcons.search} alt="search" onClick={() => setLocation(inputLocation)} className="w-[24px] h-[24px]" />
                            </div>

                    </div>


                    <div className="flex flex-col min-h-full max-w-full items-center justify-start">
                                <Details details={{

                                    humidityIcon: myIconsRight.humidityIcon,
                                    humidity: weather.currentConditions.humidity, 
                                    highsIcon: myIconsRight.highsIcon,
                                    highs: weather.days[0].tempmax,
                                    chanceIcon: myIconsRight.chance, 
                                    chance: weather.currentConditions.precipprob, 
                                    speedIcon: myIconsRight.speed, 
                                    speed: weather.currentConditions.windspeed

                                }} />
                    </div>

                </div>

                <div className="flex m-10 text-2xl">Weeks Forecast</div>

                <div className="flex flex-row max-w-full justify-evenly">
                
                    {get5days.map((day, i) => 

                        <div className="border-1 border-[#C6C8C0] w-[250px] h-[300px] flex flex-col justify-between rounded-[14px] mb-[30px] bg-white/5 transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer" key={i}>

                            
                            <div className="flex flex-row max-w-full justify-between mt-5 mr-5 ml-5 ">
                                <div>{format(new Date(weather.days[i + 2].datetime), 'E')}</div>
                                <div>{day.conditions}</div>
                            </div>

                            <div className="flex items-center justify-center text-[24px]">{day.temp}</div>
                            <div className="mb-5">Feels Like: {day.feelslike}<span>&#176; F</span></div>

                        </div>
                    )}
                    
                </div>


            </div>
            
        </>
    )
}