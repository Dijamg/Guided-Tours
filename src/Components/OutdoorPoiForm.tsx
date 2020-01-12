import React, { useState } from 'react'
import { Modal, Button, Tab } from 'react-bootstrap'
import { Poi, Operators } from '../Assets/types';
import  { useField } from '../Components/hooks/hooks'
import firebase from '../config/firebase'
import PoiService from '../services/POI'
import { Coords } from 'google-map-react';
import Map from './Map'

const OutdoorPoiForm = ({ show, handleClose, operators }: { show: boolean, handleClose: () => void, operators: Operators }) => {
    const title = useField('text')
    //Stores the written description of the POI
    const[description, setDescription] = useState<string>('')
    //Stores selected image file 
    const [fileSelected, setFileSelected] = useState<File>()
    //Displays the upload progress
    const [progress, setProgress] = useState<number>(0)

    const [markerCoords, setMarkerCoords] = useState<Coords>({
        lat: 60.184570,
        lng: 24.826775
      })

    const [nextSelected, setNextSelected] = useState<boolean>(false)

    //Resets the fields and closes the form
    const close = () => {
        title.reset();
        setDescription('')
        setFileSelected(undefined)
        setNextSelected(false)
        setMarkerCoords({
            lat: 60.184570,
            lng: 24.826775
          })
        setProgress(0)
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

    //Generates random id for added poi.
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

    //Uploads the selected Tour image to firebase and adds the new Tour object as Json data to JSON server.
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            var filename = fileSelected?.name
            var storageRef = firebase.storage().ref('/TourImages/' + filename)
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
                            BuildingId: -999,
                            title: title.value,
                            floor: 0,
                            description: description,
                            imgUrl: downloadURL,
                            location: {xm: markerCoords.lat, ym: markerCoords.lng}
                        }
                        PoiService.add(newPOI).then((responseData: Poi) => {
                            console.log(responseData)
                            operators.setPois(operators.pois.concat(responseData))
                            })
                        console.log("Added new Poi " + newPOI.title)
                        close()
                    });
                })
            }
        }catch(exception){
            console.log(exception)
        }
    }

    //Return the current page of the form.
    const formPage = () => {
        if(!nextSelected){
            return(
                <div className='form-group'>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input id='title' type={title.type} value={title.value} required onChange={title.onChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description of the POI</label>
                            <textarea className="form-control" id="description" value={description} required onChange={(e) => _onDescriptionChange(e)} rows={3}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <input type="file" className="form-control-file" id="image" accept="image/x-png,image/gif,image/jpeg" required onChange={e => _fileSelectedHandler(e.target.files)}/>
                        </div>
                    </div>
            )
        }else{
            return (
                <Tab.Container>
                    <Map markerCoords={markerCoords} setMarkerCoords={setMarkerCoords}/>
                    <p>Pick the location of the POI</p>
                </Tab.Container>
            )
        }
    }

    //Changes the page if all the fields have been filled.
    const nextPage = (e: React.MouseEvent) => {
        e.preventDefault()
        if(title.value !== '' && description !== '' && fileSelected !== undefined){
            setNextSelected(true)
        }else{
            alert('Fill all the fields')
        }
    }

    //Return different pair of buttons depending on which page user is on
    const formButtons = () => {
        if(!nextSelected){
            return (
                <>
                    <Button type='button' variant="secondary" onClick={ () => close() }>Cancel</Button>
                    <Button type='button' variant="primary" onClick={ (e: React.MouseEvent<HTMLButtonElement,MouseEvent>) => nextPage(e)}>Next</Button>
                </>
            )
        }else{
            return (
                <>
                    <Button type='button' variant="secondary" onClick={ () => setNextSelected(false)}>Back</Button>
                    <Button type='submit' variant="success">Submit</Button>
                </>    
                )
        }
    }

    return(
        <Modal
            dialogClassName={"CSRModal"}
            show={show}
            onHide={() => close()}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Add a new POI!</Modal.Title>
            </Modal.Header>
    
        
            <form onSubmit={(e) => onSubmit(e)}>
                <Modal.Body>
                    {formPage()}
                </Modal.Body>
        
                <Modal.Footer className="FormFooter">
                        {formButtons()}
                        {progressBar(progress)}
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default OutdoorPoiForm