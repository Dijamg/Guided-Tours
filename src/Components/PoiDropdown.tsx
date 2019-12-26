import React, { useState } from 'react'
import { Building, Poi } from '../Assets/types'
import { ListGroup } from 'react-bootstrap'
import Card from './Drag_n_drop/Card'
import Board from './Drag_n_drop/Board'

const PoiDropdown = ({ building, pois }:{ building: Building, pois: Poi[]}) => {
    const [showFull, setShowFull] = useState<boolean>(false)

    const filteredPois = () => pois.filter(poi => poi.BuildingId === building.id)

    const output = () => {
        if(showFull){
            return(
                
                <ListGroup>
                    <h6 onClick={() => setShowFull(!showFull)}>{building.name} <span className='arrowDnd'>&#x25B2;</span></h6>
                    {filteredPois().map(poi => (
                        <Board key={poi.id} id={building.name} className='poiBoard'>
                            <ListGroup.Item>
                                <Card id={poi.id.toString()} className='card' draggable={true}>
                                    <p>{poi.title}</p>
                                </Card>
                            </ListGroup.Item>
                        </Board>
                    ))}
                </ListGroup>
             )
         }else{
             return (<h6 onClick={() => setShowFull(!showFull)}>{building.name} <span className='arrowDnd'>&#x25BC;</span></h6>)
         }
     }

     return (
        <div className='DnD'>
            {output()}
        </div>
    )
 }

 export default PoiDropdown
 //&#x25B2;