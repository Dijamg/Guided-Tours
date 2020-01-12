import React, { useState } from 'react'
import { Poi } from '../Assets/types'

const PoiInfo = ({ poi }: { poi: Poi }) => {
    const [showDesc, setShowDesc] = useState<boolean>(false)
    const onClick = () => {
        setShowDesc(!showDesc)
    }

    const overlayStyle = showDesc ? {width: '100%', left:'0'} : {width: '0', left:'100%'}
        
    return(
        <div className='InfoContainer' onClick={() => onClick()}>
                <img className='PoiImg'
                    alt='PoiImage'
                    src = {poi.imgUrl}
                />
                <div className="topleft">Click the image</div>
            <div className="overlay" style={overlayStyle}>
                <div className="description">
                    <h2>{poi.title}</h2>
                    <p>{poi.description}</p>
                </div>
            </div>
        </div>
    )
}

export default PoiInfo