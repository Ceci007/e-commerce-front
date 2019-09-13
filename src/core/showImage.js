import React from 'react';
import { API } from '../config';

const ShowImage = ({ item, url }) => {
    return (  
        <div className="product-image center">
            <img src={ `${API}/${url}/photo/${item._id}` } 
            alt={ item.name } className="img-fluid mb-3"
            style={{maxHeight: "100%", maxWidth: "100%", marginTop: "-30px"}} />
        </div>
    );
}
 
export default ShowImage;