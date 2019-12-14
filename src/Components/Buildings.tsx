import React from 'react'
import { listOfBuildings } from '../Assets/data'
import BuildingInfo from './BuildingInfo'

const Buildings = () => (
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
                {listOfBuildings.map(building => {
                    return <BuildingInfo key={building.id} id={building.id} name = {building.name} imgUrl={building.imgUrl} description={building.description}/>
                })}
            </div>
        </div>
    </div>
)

export default Buildings