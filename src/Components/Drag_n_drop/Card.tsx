import React from 'react'

const Card = (props: React.HTMLAttributes<HTMLParagraphElement>) => {

    const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
        const target = e.currentTarget

        e.dataTransfer.setData('card_id', target.id)

    }


    const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }
    return (
        <div
            id={props.id}
            className={props.className}
            draggable={props.draggable}
            onDragStart={dragStart}
            onDragOver={dragOver}
        >
            {props.children}
        </div>
    )
}

export default Card