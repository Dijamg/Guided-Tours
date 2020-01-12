import React from 'react'
import { Modal, Button, ListGroup, Tab, Row, Col } from 'react-bootstrap'
import { Poi } from '../Assets/types'
import PoiInfo from './PoiInfo'

const OutdoorPois = ({ show, handleClose, pois }: { show: boolean, handleClose: () => void, pois: Poi[] }) => {

    const close = () => handleClose()
    const currentPois = () => pois.filter(poi => poi.BuildingId === -999)

    //If there are no Pois, it return a text that says so, otherwise it return the list of Pois of the selected building.
    const output = () => {
        if(currentPois().length !== 0){
                return(<Tab.Container>
                            <Row>
                                <Col sm={9}>
                                <Tab.Content>
                                    {currentPois().map(currentPoi => (
                                        <Tab.Pane key={currentPoi.id} eventKey={`#${currentPoi.id}`}>
                                            <PoiInfo key={currentPoi.id} poi={currentPoi} />
                                        </Tab.Pane>
                                    ))}
                                </Tab.Content>
                                </Col>
                                <Col sm={3}>
                                <ListGroup>
                                    {currentPois().map(poi => (
                                        <ListGroup.Item key={poi.id} action href={`#${poi.id}`}>
                                            {poi.title}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                                </Col>
                            </Row>
                        </Tab.Container>)
        }else{
            return <div className='noPois'>There are no outdoor POIs</div>
        }
    }


    return(
        <Modal
            dialogClassName={"CSRModal"}
            show={show}
            onHide={() => handleClose()}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Outdoor POIs</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    {output()}
                </Modal.Body>       
                <Modal.Footer className="FormFooter">
                        <Button variant="secondary" onClick={ () => close() }>Close</Button>
                </Modal.Footer>
        </Modal>
    )
}

export default OutdoorPois
