import React, {useState} from 'react'
import { Poi } from '../../Assets/types'

const PoiSelectionBoard = ({ props, selectedPois, setSelectedPois, pois }:{ props: React.HTMLAttributes<HTMLParagraphElement>, selectedPois: Poi[], setSelectedPois: (arg0: React.SetStateAction<Poi[]>) => void, pois: Poi[] }) => {

    const drop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const card_id = e.dataTransfer.getData('card_id')

        const card = document.getElementById(card_id)
        if(card !== null){ 
            card.style.display = 'block'
            e.currentTarget.appendChild(card)
            const addedPoi = pois.find(p => p.id.toString() === card_id)
            if(addedPoi !== undefined){
                setSelectedPois(selectedPois.concat(addedPoi))
            }
        }
        console.log(selectedPois)
    }

    const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()

    }

    return (
        <div
            id={props.id}
            className={props.className}
            onDrop={drop}
            onDragOver={dragOver}
            >
            {props.children}
        </div>
    )

}

export default PoiSelectionBoard