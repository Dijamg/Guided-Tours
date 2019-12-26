import React from 'react'

const Board = (props: React.HTMLAttributes<HTMLParagraphElement>) => {

    const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    return (
        <div
            id={props.id}
            className={props.className}
            onDrop={props.onChange}
            onDragOver={dragOver}
            >
            {props.children}
        </div>
    )

}

export default Board