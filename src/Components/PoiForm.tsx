import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { Building } from '../Assets/data';
import  { useField } from '../Components/hooks/hooks'

const PoiForm = (props: Building) => {
    const title = useField('text')
    const description = useField('text')

    return(
        <Modal
            dialogClassName={"CSRModal"}
            show={true}
            onHide={() => console.log("KEK")}
            aria-labelledby="example-modal-sizes-title-lg"
        >
        <Modal.Header closeButton>
        <Modal.Title>Add a POI for {props.name}</Modal.Title>
        </Modal.Header>
    
        
        <form>
            <Modal.Body>
                <div className='form-group col-md-6'>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Title</label>
                        <input id='title' type={title.type} value={title.value} onChange={title.onChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Floor</label>
                        <select className="form-control" id="exampleFormControlSelect1">
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Description of the POI</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlFile1">Image</label>
                        <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
                    </div>
                </div>
                </Modal.Body>
    
                <Modal.Footer>
                <Button variant="secondary">Cancel</Button>
                <Button type='submit' variant="primary">Add POI</Button>
                </Modal.Footer>
    </form>
    </Modal>
    )
}

export default PoiForm