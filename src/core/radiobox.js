import React, { useState, useEffect } from 'react';

const Radiobox = ({ prices, handleFilters }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event) => {
        handleFilters(event.target.value);
        setValue(event.target.value);
    }
    
    return prices.map((price, i) => (
        <div key={ i } >
            <input onChange={handleChange} type="radio" 
            value={`${price._id}`} className="my-3" name={ price } />
            <label className="radiobox-label">{ price.name }</label>
        </div>
    ));
}
 
export default Radiobox;