import React, { useState, ImgHTMLAttributes } from 'react'
import { Modal, Button, InputGroup } from 'react-bootstrap';
import { Building } from '../Assets/data';
import  { useField } from '../Components/hooks/hooks'
import pohjakartta from '../Assets/vare1.png'
import marker from '../Assets/marker.png'

const PoiForm = ({ building, show, handleClose }: {building: Building, show: boolean, handleClose: () => void}) => {
    const title = useField('text')
    const description = useField('text')
    /* Map coordinates */
    const [xm, setXM] = useState(0)
    const [ym, setYM] = useState(0)
    /* Click coordinates */
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [h, setH] = useState(0)
    var maxHeight = document.getElementById('x')?.offsetHeight
    var maxWidth = document.getElementById('x')?.offsetWidth
    
    const close = () => {
        title.reset();
        description.reset()
        handleClose()
    }

    const _onMouseDown = (e: React.MouseEvent) => {
            if((maxWidth != null) && (maxHeight != null)) {
                setXM(e.nativeEvent.offsetX * (100/maxWidth))
                setYM(e.nativeEvent.offsetY * (50/maxHeight))
            }
            setX(e.nativeEvent.offsetX)
            setY(e.nativeEvent.offsetY)
    }

    const onLoad = () => {
        maxHeight = document.getElementById('x')?.offsetHeight
        maxWidth = document.getElementById('x')?.offsetWidth
    }

    const location = () => {
        return (<p>[{xm.toFixed(2)},  {ym.toFixed(2)}]</p>)
    }

    const markerStyle = {
        left: `${x-5}px`,
        top: `${y-5}px`
    }

    var maxHeight = document.getElementById('x')?.offsetHeight
    var maxWidth = document.getElementById('x')?.offsetWidth

    return(
        <Modal
            dialogClassName={"CSRModal"}
            show={show}
            onHide={() => handleClose()}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Add a POI for {building.name}</Modal.Title>
            </Modal.Header>
    
        
            <form>
                <Modal.Body>
                    <div className='row'>
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
                        <div className='form-group col-md-6'>
                            <div className='form-group'>
                                <h5>Mark the POIs location </h5>
                                <div className='locationSelector'>
                                    <img 
                                    src={pohjakartta}
                                    className='map'
                                    alt='pohjakartta'
                                    onMouseDown={e => _onMouseDown(e)}
                                    onLoad={() => onLoad()}
                                    id='x'
                                    />
                                    <img 
                                    src={marker}
                                    className='marker'
                                    alt='marker'
                                    style={markerStyle}
                                    />
                                </div>
                            </div>
                            {location()}
                        </div>
                    </div>
                </Modal.Body>
        
                <Modal.Footer>
                    <Button variant="secondary" onClick={ () => close() }>Cancel</Button>
                    <Button type='submit' variant="primary">Add POI</Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default PoiForm