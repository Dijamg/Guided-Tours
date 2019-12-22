import React, { useState } from 'react'
import { Poi, Building } from '../Assets/types'

const PoiInfo = ({ poi, building }: {poi: Poi, building: Building}) => {

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