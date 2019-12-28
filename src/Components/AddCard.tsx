import React, {useState}  from 'react'
import { Operators } from '../Assets/types'
import TourForm from './TourForm'


const AddCard = ({ operators }: { operators: Operators }) => {

       // //Determines the visibility of the TourForm
       const [showForm, setShowForm] = useState<boolean>(false);
       const handleShowForm = () => setShowForm(true);
       
       const AddForm = () => <TourForm show={ showForm } handleClose={ () => setShowForm(false)} operators={operators}/>
    
        return (
            <React.Fragment>
                <div className='col-10 mx-auto col-md-6 col-lg-4 my-3'>
                    <div className='card add' onClick={() => handleShowForm()}>
                        <img 
                            src="data:image/png;base64,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"
                            className='img-card-top'
                            style={{height:'14rem'}}
                            alt='add'
                            />
                            <div className='card-body add text-capitalize'>
                                <h6>Add a new Tour!</h6>
                            </div>
                    </div>
                    {AddForm()}
                </div>
            </React.Fragment>
        )
     }

export default AddCard