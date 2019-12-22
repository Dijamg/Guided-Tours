import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { Building, Poi, Operators } from '../Assets/types';
import  { useField } from '../Components/hooks/hooks'
import firebase from '../config/firebase'
import POIService from '../services/POI'

const PoiForm = ({ building, show, handleClose, operators }: {building: Building, show: boolean, handleClose: () => void, operators: Operators}) => {
    const title = useField('text')
    //Stores floor selection
    const [floorSelected, setFloorSelected] = useState<number>(building.baseMaps[0].floor)
    //Stores the written description of the POI
    const[description, setDescription] = useState<string>('')
    //Storest selected image file 
    const [fileSelected, setFileSelected] = useState<File>()
    //Displays the upload progress
    const [progress, setProgress] = useState<number>(0)
    /* Map coordinates */
    const [xm, setXM] = useState<number>(0)
    const [ym, setYM] = useState<number>(0)
    /* Click coordinates */
    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)
    // Height and width of the base map.
    var maxHeight = document.getElementById('x')?.offsetHeight
    var maxWidth = document.getElementById('x')?.offsetWidth

    //Resets the fields and closes the form
    const close = () => {
        title.reset();
        setDescription('')
        setProgress(0)
        setFloorSelected(0)
        setX(0)
        setY(0)
        setXM(0)
        setYM(0)
        handleClose()
    }

    //Updates the description field.
    const _onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }

    //Updates the selected image file.
    const _fileSelectedHandler = (e: FileList | null) => {
        if( e != null) setFileSelected(e[0])
    }

    //Generates random id for added POI.
    const generateId = () => (
        Math.floor(Math.random() * 1000) + 1
    )

    //If a form is being submitted, display the progress.
    const progressBar = (progress: number) => {
        const text = (progress === 100) ? 'Updating database' : `Uploading ${progress}%`
        if(progress > 0){
            return(
            <div className="success">
                {text}
            </div>
            )
        }else{
            return (<></>)
        }
    }

    //Uploads the selected POI image to firebase and adds the new Poi object as Json data to JSON server.
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            var filename = fileSelected?.name
            var storageRef = firebase.storage().ref('/PoiImages/' + filename)
            if(fileSelected !== undefined ){
                var uploadTask = storageRef.put(fileSelected)
                
                uploadTask.on('state_changed', (snapshot) => {
                    setProgress(Math.floor(snapshot.bytesTransferred / snapshot.totalBytes * 100))
                }, (error) => {
                    console.log(error)
                }, () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        const newPOI: Poi = {
                            id: generateId(),
                            BuildingId: building.id,
                            title: title.value,
                            floor: floorSelected,
                            description: description,
                            imgUrl: downloadURL,
                            location: {xm, ym}
                        }
                        POIService.add(newPOI).then((responseData: Poi) => {
                            console.log(responseData)
                            operators.setPois(operators.pois.concat(responseData))
                            })
                        console.log("Added new POI " + newPOI.title + " to " + building.name)
                        close()
                    });
                })
            }
        }catch(exception){
            console.log(exception)
        }
    }

    //Updates the location selector on click.
    const _onMouseDown = (e: React.MouseEvent) => {
        if((maxWidth != null) && (maxHeight != null)) {
            setXM(e.nativeEvent.offsetX * (100/maxWidth))
            setYM(e.nativeEvent.offsetY * (50/maxHeight))
        }
        setX(e.nativeEvent.offsetX)
        setY(e.nativeEvent.offsetY)
    }

    //Changes the floor selection
    const _handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
        setFloorSelected(parseInt(event.currentTarget.value))
        setX(0)
        setY(0)
        setXM(0)
        setYM(0)
    }

    //Gets the current height and width of the base map.
    const onLoad = () => {
        maxHeight = document.getElementById('x')?.offsetHeight
        maxWidth = document.getElementById('x')?.offsetWidth
    }

    //Displays selected location to the user.
    const location = () => {
        return (<p>[{xm.toFixed(2)},  {ym.toFixed(2)}]</p>)
    }

    const markerStyle = {
        left: `${x-5}px`,
        top: `${y-5}px`
    }

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
    
        
            <form onSubmit={(e) => onSubmit(e)}>
                <Modal.Body>
                    <div className='row'>
                        <div className='form-group col-md-6'>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input id='title' type={title.type} value={title.value} required onChange={title.onChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="floor">Floor</label>
                                <select className="form-control" id="floor" onChange={e => _handleChange(e)}>
                                    {building.baseMaps.map(a => <option key={a.floor}>{a.floor}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description of the POI</label>
                                <textarea className="form-control" id="description" required onChange={(e) => _onDescriptionChange(e)} rows={3}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Image</label>
                                <input type="file" className="form-control-file" id="image" accept="image/x-png,image/gif,image/jpeg" required onChange={e => _fileSelectedHandler(e.target.files)}/>
                            </div>
                        </div>
                        <div className='form-group col-md-6'>
                            <div className='form-group'>
                                <h5>Mark the POIs location </h5>
                                <div className='locationSelector'>
                                    <img 
                                    src={building.baseMaps.find(a => a.floor === floorSelected)?.map}
                                    className='map'
                                    alt='pohjakartta'
                                    onMouseDown={e => _onMouseDown(e)}
                                    onLoad={() => onLoad()}
                                    id='x'
                                    />
                                    <img 
                                    src={'https://firebasestorage.googleapis.com/v0/b/aalto-guided-tours-8c9d0.appspot.com/o/marker.png?alt=media&token=0a2b08d4-579f-4379-880d-2280b5579854'}
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
        
                <Modal.Footer className="FormFooter">
                        <Button variant="secondary" onClick={ () => close() }>Cancel</Button>
                        <Button type='submit' variant="primary">Add POI</Button>
                        {progressBar(progress)}
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default PoiForm