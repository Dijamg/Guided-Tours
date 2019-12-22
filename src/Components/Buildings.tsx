import React from 'react'
import BuildingInfo from './BuildingInfo'
import { Building, Poi, Operators } from '../Assets/types'

const Buildings = ({buildings, setBuildings, pois, setPois}: {buildings: Building[], setBuildings: (arg0: React.SetStateAction<Building[]>) => void, pois: Poi[], setPois: (arg0: React.SetStateAction<Poi[]>) => void  }) => {
    
    //Bundle all states containing pois and buildings for shortening code.
    const operators: Operators = {
        buildings: buildings,
        setBuildings: setBuildings,
        pois: pois,
        setPois: setPois
    }

    return(
        <div className='buildings-page' id='buildings-page'>
            <div className='container my-5'>
                {/* title*/}
                <div className='row'>
                    <div className='col-10 mx-auto col-md-6 text-center text-uppercase mb-3'>
                        <h1 className='text-slanted'>list of buildings</h1>
                    </div>
                </div>
                {/* end of title */}
                <div className='row'>
                    {buildings.map(building => {
                        return <BuildingInfo key={building.id} building={building} operators={operators} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Buildings