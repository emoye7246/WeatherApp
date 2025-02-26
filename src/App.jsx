import { useState, useEffect } from "react"
import { Conditions } from "./SearchBar/Conditions"
import { myIcons } from "./Icons/Backdrops/icons"

export const App = () => {
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [weather, setWeather] = useState({})
    const [location, setLocation] = useState('Cupertino')
    const [inputLocation, setInputLocation] = useState('Cupertino')


    useEffect(() => {
    const fetchData = async () => {



            try{

                const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=F3SPHFPC6K3H3WATC6D4VDGV9`)
                await response.json().then((response) => {
                    

                    setWeather(response)
                    console.log(response)

                })
                setLoading(false)

            }catch(err){

                setError(err)
                setLoading(false)


            }
    }
    fetchData()
}, [location])

if(loading) return <div>Were Looking for the report</div>
if(error ) return <div>FailedLooking for the report</div>



    return (

        <>

            <div>
                <div className="flex flex-col items-center justify-center">
                
                    <Conditions 
                    icon={myIcons[weather.currentConditions.icon]}
                    condition={weather.currentConditions.conditions}
                    tempature={weather.currentConditions.temp}
                    timezone={weather.timezone}
                    address={weather.resolvedAddress}
                    />

                        <div className="flex flex-row">
                            <input type="text" onChange={(e) => setInputLocation(e.target.value)} className="flex text-start border-1 border-black rounded-[14px]" />
                            <button onClick={() => setLocation(inputLocation)}>Search</button>
                        </div>

                </div>
            </div>
            
        </>
    )
}