import React,{useState, useEffect} from 'react'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import Tours from './Components/Tours'
import Buildings from './Components/Buildings'
import About from './Components/About'
import { Building, Poi } from './Assets/types'
import PoiService from './services/POI'
import BuildingService from './services/Building'

const App = () => {
  const [buildings, setBuildings] = useState<Building[]>([])
  const [pois, setPois] = useState<Poi[]>([])

  useEffect(() => {
      BuildingService
          .getAll()
          .then(initialBuildings => {
            setBuildings(initialBuildings)
          })
      }, [])

  useEffect(() => {
      PoiService
          .getAll()
          .then(initialPois => {
            setPois(initialPois)
          })
      }, [])

   return (
      <div>
        <Navbar/>
        <Home/>
        <Buildings
            buildings={buildings}
            setBuildings={(arg0: React.SetStateAction<Building[]>) => setBuildings(arg0)}
            pois={pois}
            setPois={(arg0: React.SetStateAction<Poi[]>) => setPois(arg0)}/>
        <Tours/>
        <About/>
      </div>
    )
   }

export default App