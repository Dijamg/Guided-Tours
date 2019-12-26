import React from 'react'
import TourInfo from './TourInfo'
import { Tour, Building, Operators } from '../Assets/types'
import AddCard from './AddCard'

const Tours = ({ tours, buildings, operators }: {tours: Tour[], buildings: Building[], operators: Operators } ) => {
    
    return(
        <div className='tours-page'>
            <div className='container my-5'>
                {/* title*/}
                <div className='row'>
                    <div className='col-10 mx-auto col-md-6 text-center text-uppercase mb-3'>
                        <h1 className='text-slanted'>Tours</h1>
                    </div>
                </div>
                {/* end of title */}
                <div className='row'>
                    {tours.map(tour => {
                        return <TourInfo key={tour.id} tour={tour} />
                    })}
                    <AddCard buildings={buildings} operators={operators}/>
                </div>
            </div>
        </div>
    )
}

export default Tours