import React,{useState, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Buildings from './Components/Buildings'
import Tours from './Components/Tours'
import { Building, Poi, Tour, Operators } from './Assets/types'
import PoiService from './services/POI'
import BuildingService from './services/Building'
import TourService from './services/Tour'

const App = () => {
  const [buildings, setBuildings] = useState<Building[]>([])
  const [pois, setPois] = useState<Poi[]>([])
  const [tours, setTours] = useState<Tour[]>([])

  //Bundle all states containing pois and buildings for shortening code.
  const operators: Operators = {
    buildings: buildings,
    setBuildings: setBuildings,
    tours: tours,
    setTours: setTours,
    pois: pois,
    setPois: setPois
}

  //Next 2 useEffect functions fetch the buildings and their pois from the "server"
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

  useEffect(() => {
    TourService
        .getAll()
        .then(initialTours => {
          setTours(initialTours)
        })
    }, [])  
      

   return (
      <div>
        <Router>
          <Navbar/>
          <Route exact path="/">
            <Redirect to='/POIs'/>
          </Route>
          <Route exact path="/POIs" render={() => <Buildings operators={operators}/>} />
          <Route exact path="/Tours" render={() => <Tours operators={operators}/>} />
        </Router>
      </div>
    )
   }

export default App