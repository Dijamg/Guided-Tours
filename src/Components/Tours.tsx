import React from 'react'
import TourInfo from './TourInfo'
import { Operators } from '../Assets/types'
import AddCard from './AddCard'

const Tours = ({ operators }: { operators: Operators } ) => {
    
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
                    {operators.tours.map(tour => {
                        return <TourInfo key={tour.id} tour={tour} operators={operators} />
                    })}
                    <AddCard operators={operators}/>
                </div>
            </div>
        </div>
    )
}

export default Tours