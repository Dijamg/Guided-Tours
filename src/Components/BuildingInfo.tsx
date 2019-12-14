import React from 'react'
import { Building } from '../Assets/data'

const BuildingInfo = (props: Building) => (
    <React.Fragment>
        <div className='col-10 mx-auto col-md-6 col-lg-4 my-3'>
            <div className='card'>
                <img 
                    src={props.imgUrl}
                    className='img-card-top'
                    style={{height:'14rem'}}
                    alt='building'
                    />
                    <div className='card-body text-capitalize'>
                        <h6>{props.name}</h6>
                        <h6 className='text-warning text-slanted'>
                            {props.description}
                        </h6>
                    </div>
                    <div className='card-footer'>
                        <button type='button' className='btn btn-primary'>
                            Add a POI
                        </button>
                        <button type='button' className='btn btn-success mx-2 text-capitalize'>
                            View POIs
                        </button>
                    </div>  
            </div>
        </div>
    </React.Fragment>
)

export default BuildingInfo
    
