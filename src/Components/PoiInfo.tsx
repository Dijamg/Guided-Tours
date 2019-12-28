import React from 'react'
import { Poi } from '../Assets/types'

const PoiInfo = ({ poi }: { poi: Poi }) => {

    return(
        <div className='InfoContainer'>
                <img className='PoiImg'
                    alt='PoiImage'
                    src = {poi.imgUrl}
                />
                <div className="topleft">Hover the image</div>
            <div className="overlay">
                <div className="description">
                    <h2>{poi.title}</h2>
                    <p>{poi.description}</p>
                </div>
            </div>
        </div>
    )
}

export default PoiInfo