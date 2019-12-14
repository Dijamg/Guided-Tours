import React from 'react'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import Tours from './Components/Tours'
import Buildings from './Components/Buildings'
import About from './Components/About'
import PoiForm from './Components/PoiForm'

const App = () => (
  <div>
    <Navbar/>
    <Home/>
    <Buildings/>
    <Tours/>
    <About/>
  </div>
)

export default App