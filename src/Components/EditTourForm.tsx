import React,{ useState } from 'react'
import { Tour, Operators, Poi } from '../Assets/types'
import { Modal, Button, Tab, Row, Col } from 'react-bootstrap'
import Board from './Drag_n_drop/Board'
import Card from './Drag_n_drop/Card'
import PoiDropdown from './PoiDropdown'
import TourService from '../services/Tour'
 
const EditTourForm = ({ tour, show, handleClose, operators}: {tour: Tour, show: boolean, handleClose: () => void, operators: Operators}) => {

    //stores the selected Pois of the tour
    const [selectedPois, setSelectedPois] = useState<Poi[]>(tour.POIs)

    const close = () => {
        handleClose()
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            const tourToBeChanged = tour
            const changedTour = {...tourToBeChanged, POIs: selectedPois}

            TourService
                .update(tour.id, changedTour)
                .then(returnedTour => {
                    operators.setTours(operators.tours.map(t => t.id !== tour.id ? t : returnedTour))
                })
                console.log("Updated Tour " + tour.name)
                close()     
        }catch(exception){
            console.log(exception)
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
        if(board !== null && board.childNodes.length >= 1 && selectedPois.length > 0) {
            board.removeChild(board.childNodes[board.childNodes.length - 1])
            setSelectedPois(selectedPois.slice(0, selectedPois.length - 1))
            console.log(selectedPois)
        }
    }

    return (
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
                    <Tab.Container>
                        <h6>Update the POIs of the selected tour</h6>
                        <Row>
                            <Col sm={5}>
                                    <Board id='selected' className='selectedBoard' onChange={(e: React.DragEvent<HTMLDivElement>) => updateSelected(e)} >
                                        {tour.POIs.map(poi => (
                                            <Card key={poi.id} id={poi.id.toString()} className='card' draggable={true}>
                                                <p>{poi.title}</p>
                                            </Card>
                                        ))}
                                    </Board>   
                            </Col>
                            <Col sm={2} className='dndButtons'>
                                <Button type='button' className='dndButton' variant="secondary" onClick={ () => undo() }>Remove last</Button>
                                <Button type='button' className='dndButton' variant="danger" onClick={ () => reset() }>Clear</Button>   
                            </Col>
                            <Col sm={5}>
                                {operators.buildings.map(building => (
                                    <PoiDropdown key={building.id} building={building} pois={operators.pois} selectedPois={selectedPois} />
                                ))}
                            </Col>
                        </Row>
                    </Tab.Container>
                </Modal.Body>
        
                <Modal.Footer className="FormFooter">
                    <Button type='button' variant="secondary" onClick={ () => close()}>Cancel</Button>
                    <Button type='submit' variant="success">Save</Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default EditTourForm