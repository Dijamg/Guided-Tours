import React, { useState } from 'react'
import { Modal, Button, Tab, Row, Col } from 'react-bootstrap'
import { Building, Poi, Operators, Tour } from '../Assets/types';
import  { useField } from '../Components/hooks/hooks'
import PoiDropdown from './PoiDropdown'
import Board from './Drag_n_drop/Board'
import firebase from '../config/firebase'
import TourService from '../services/Tour'

const TourForm = ({ buildings, show, handleClose, operators}: {buildings: Building[], show: boolean, handleClose: () => void, operators: Operators}) => {
    const title = useField('text')
    //Stores the written description of the POI
    const[description, setDescription] = useState<string>('')
    //Stores selected image file 
    const [fileSelected, setFileSelected] = useState<File>()
    //Displays the upload progress
    const [progress, setProgress] = useState<number>(0)
    //stores the selected Pois of the tour
    const [selectedPois, setSelectedPois] = useState<Poi[]>([])
    
    const [nextSelected, setNextSelected] = useState<boolean>(false)

    //Resets the fields and closes the form
    const close = () => {
        title.reset();
        setDescription('')
        setFileSelected(undefined)
        setNextSelected(false)
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

    //Generates random id for added tour.
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
                        const newTour: Tour = {
                            id: generateId(),
                            name: title.value,
                            description: description,
                            imgUrl: downloadURL,
                            POIs: selectedPois
                        }
                        TourService.add(newTour).then((responseData: Tour) => {
                            console.log(responseData)
                            operators.setTours(operators.tours.concat(responseData))
                            })
                        console.log("Added new Tour " + newTour.name)
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
        console.log(nextSelected)
        if(!nextSelected){
            return(
                <div className='form-group'>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input id='title' type={title.type} value={title.value} required onChange={title.onChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description of the Tour</label>
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
                    <h6>Select the POIs for the new tour</h6>
                    <Row>
                        <Col sm={5}>
                                <Board id='selected' className='selectedBoard' onChange={(e: React.DragEvent<HTMLDivElement>) => updateSelected(e)} >
                                </Board>   
                        </Col>
                        <Col sm={2} className='dndButtons'>
                            <Button type='button' className='dndButton' variant="secondary" onClick={ () => undo() }>Undo</Button>
                            <Button type='button' className='dndButton' variant="danger" onClick={ () => reset() }>reset</Button>   
                        </Col>
                        <Col sm={5}>
                            {buildings.map(building => (
                                <PoiDropdown key={building.id} building={building} pois={operators.pois} />
                            ))}
                        </Col>
                    </Row>
                </Tab.Container>
            )
        }
    }

    //Updates the state of the dragged POIs.
    const updateSelected = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        //First drop the card
        const card_id = e.dataTransfer.getData('card_id')
        const card = document.getElementById(card_id)
        if(card !== null){ 
            card.style.display = 'block'
            e.currentTarget.appendChild(card)
        }

        //Then update the state
        const board = document.getElementById('selected')
        if(board !== null) {
            const children = board.children
            var array: number[] = []
            var i;
            for(i = 0; i < children.length; i++){
                array[i] = Number(children[i].id)
            }
        }
        console.log(operators.pois.filter(poi => array.includes(poi.id)))
        setSelectedPois(operators.pois.filter(poi => array.includes(poi.id)))
    }

    //Resets all dragged cards
    const reset = () => {
        const board = document.getElementById('selected')
        if(board !== null){
            while (board.firstChild) {
                board.removeChild(board.firstChild);
            }
        }
        setSelectedPois([])
    }

    //Removes the most recently added card
    const undo = () => {
        const board = document.getElementById('selected')
        if(board !== null) {
            board.removeChild(board.childNodes[board.childNodes.length - 1])
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
                <Modal.Title>Add a new tour!</Modal.Title>
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

export default TourForm