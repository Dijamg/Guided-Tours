import React from 'react'
import PoiForm from './PoiForm'
import BuildingInfo from './BuildingInfo'
import { listOfBuildings } from '../Assets/data'

const building = listOfBuildings[0]

const About = () => (
    <div className='about-page' id='about-page'>
        THIS IS THE 4th PAGE
        <PoiForm id={building.id} name = {building.name} imgUrl={building.imgUrl} description={building.description}/>
    </div>
)

export default About