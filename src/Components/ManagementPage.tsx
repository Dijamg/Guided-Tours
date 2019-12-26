import React, { useState } from 'react'
import { Building, Tour, Operators } from '../Assets/types'
import Buildings from './Buildings'
import Tours from './Tours'

const ManagementPage = ({ buildings, tours, operators}: {buildings: Building[], tours: Tour[], operators: Operators}) => {

    const [buildingsSelected, setBuildingsSelected] = useState<boolean>(true)

    //Return list of buildings or tours depending on selection
    const output = () => buildingsSelected ? <Buildings buildings={buildings} operators={operators}/> : <Tours tours={tours} buildings={buildings} operators={operators}/>

    //Next 2 styles make the selected button appear red
    const buildingButtonStyle = () => {
       if(buildingsSelected) return { color: 'red' }; else {};
    }

    const tourButtonStyle = () => {
        if(!buildingsSelected) return { color: 'red' }; else {};
     }

    return (
        <div className='management-page' id='management-page'>
            <button className="buttonLink" onClick={ () => setBuildingsSelected(true)} style={buildingButtonStyle()}>
                Buildings
            </button>
            <button className="buttonLink" onClick={ () => setBuildingsSelected(false)} style={tourButtonStyle()}>
                Tours
            </button>
            {output()}
        </div>
    )  
}

export default ManagementPage