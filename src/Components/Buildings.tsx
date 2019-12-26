import React from 'react'
import BuildingInfo from './BuildingInfo'
import { Building, Operators } from '../Assets/types'

const Buildings = ({buildings, operators }: {buildings: Building[], operators: Operators}) => {


    return(
        <div className='buildings-page'>
            <div className='container my-5'>
                {/* title*/}
                <div className='row'>
                    <div className='col-10 mx-auto col-md-6 text-center text-uppercase mb-3'>
                        <h1 className='text-slanted'>Buildings</h1>
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