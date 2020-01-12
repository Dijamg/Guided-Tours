import React, { useState } from 'react'
import { Poi } from '../../Assets/types'
import { ListGroup } from 'react-bootstrap'
import Card from './Card'
import Board from './Board'

const OutdoorPoiDropdown = ({ pois, selectedPois }:{ pois: Poi[], selectedPois: Poi[]}) => {
    const [showFull, setShowFull] = useState<boolean>(false)

    const filteredPois = () =>{
        return pois.filter(poi => (poi.BuildingId === -999 && (!selectedPois.map(p => p.id).includes(poi.id))))
    }

    const output = () => {
        if(showFull){
            return(
                
                <ListGroup>
                    <h6 onClick={() => setShowFull(!showFull)}>Outdoor <span className='arrowDnd'>&#x25B2;</span></h6>
                    {filteredPois().map(poi => (
                        <Board key={poi.id} id='outdoor' className='poiBoard'>
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
             return (<h6 onClick={() => setShowFull(!showFull)}>Outdoor <span className='arrowDnd'>&#x25BC;</span></h6>)
         }
     }

     return (
        <div className='DnD'>
            {output()}
        </div>
    )
 }

 export default OutdoorPoiDropdown
 //&#x25B2;