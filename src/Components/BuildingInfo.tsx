import React,{ useState } from 'react'
import { Building } from '../Assets/data'
import PoiForm from './PoiForm'

const BuildingInfo = (building: Building) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const AddForm = () => <PoiForm building={ building } show={ show } handleClose={ () => setShow(false) }/>
    
        return (
            <React.Fragment>
                <div className='col-10 mx-auto col-md-6 col-lg-4 my-3'>
                    <div className='card'>
                        <img 
                            src={building.imgUrl}
                            className='img-card-top'
                            style={{height:'14rem'}}
                            alt='building'
                            />
                            <div className='card-body text-capitalize'>
                                <h6>{building.name}</h6>
                                <h6 className='text-warning text-slanted'>
                                    {building.description}
                                </h6>
                            </div>
                            <div className='card-footer'>
                                <button type='button' className='btn btn-primary' onClick={() => handleShow()}>
                                    Add a POI
                                </button>
                                <button type='button' className='btn btn-success mx-2 text-capitalize'>
                                    View POIs
                                </button>
                            </div>  
                    </div>
                </div>
                { AddForm() }
            </React.Fragment>
        )
     }

export default BuildingInfo
    
