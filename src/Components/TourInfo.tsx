import React from 'react'
import { Tour } from '../Assets/types'


const TourInfo = ({tour }:{tour: Tour }) => {
    // //Determines the visibility of the PoiForm
    // const [showForm, setShowForm] = useState<boolean>(false);
    // const handleShowForm = () => setShowForm(true);
    // //Determines the visibility of the PoiList
    // const [showList, setShowList] = useState<boolean>(false);
    // const handleShowList = () => setShowList(true);
    
    // const AddForm = () => <PoiForm building={ building } show={ showForm } handleClose={ () => setShowForm(false)} operators={operators}/>
    // const ViewList = () => <PoiList building={ building } show={ showList } handleClose={ () => setShowList(false)} pois={operators.pois}/>
    
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
                                <button type='button' className='btn btn-primary'>
                                    Edit Tour
                                </button>
                            </div>  
                    </div>
                </div>
            </React.Fragment>
        )
     }

export default TourInfo