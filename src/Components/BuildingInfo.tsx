import React,{ useState } from 'react'
import { Building, Operators } from '../Assets/types'
import PoiForm from './PoiForm'
import PoiList from './PoiList'

const BuildingInfo = ({building, operators}:{building: Building, operators: Operators}) => {
    //Determines the visibility of the PoiForm
    const [showForm, setShowForm] = useState<boolean>(false);
    const handleShowForm = () => setShowForm(true);
    //Determines the visibility of the PoiList
    const [showList, setShowList] = useState<boolean>(false);
    const handleShowList = () => setShowList(true);
    
    const AddForm = () => <PoiForm building={ building } show={ showForm } handleClose={ () => setShowForm(false)} operators={operators}/>
    const ViewList = () => <PoiList building={ building } show={ showList } handleClose={ () => setShowList(false)} pois={operators.pois}/>
    
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
                                <button type='button' className='btn btn-primary' onClick={() => handleShowForm()}>
                                    Add a POI
                                </button>
                                <button type='button' className='btn btn-success mx-2 text-capitalize' onClick={() => handleShowList()}>
                                    View POIs
                                </button>
                            </div>  
                    </div>
                </div>
                { AddForm() }
                { ViewList() }
            </React.Fragment>
        )
     }

export default BuildingInfo
    
