import React,{ useState } from 'react'
import { Tour, Operators } from '../Assets/types'
import EditTourForm from './EditTourForm'


const TourInfo = ({ tour, operators }:{ tour: Tour, operators: Operators }) => {
    // Determines the visibility of the Tour edition form
    const [showForm, setShowForm] = useState<boolean>(false);
    const handleShowForm = () => setShowForm(true);
    
    const EditForm = () => <EditTourForm tour={ tour } show={ showForm } handleClose={ () => setShowForm(false)} operators={operators}/>
    
        return (
            <React.Fragment>
                <div className='col-10 mx-auto col-md-6 col-lg-4 my-3'>
                    <div className='card tour'>
                        <img 
                            src={tour.imgUrl}
                            className='img-card-top'
                            style={{height:'14rem'}}
                            alt='tour'
                            />
                            <div className='card-body text-capitalize'>
                                <h6>{tour.name}</h6>
                                <h6 className='text-warning text-slanted'>
                                    {tour.description}
                                </h6>
                            </div>
                            <div className='card-footer'>
                                <button type='button' className='btn btn-primary' onClick={() => handleShowForm()}>
                                    Edit Tour
                                </button>
                            </div>  
                    </div>
                </div>
                { EditForm() }
            </React.Fragment>
        )
     }

export default TourInfo