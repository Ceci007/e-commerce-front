import React, { useState, useEffect } from 'react';
import Layout from './layout';
import Card from './card';
import { getCategories } from '../admin/apiAdmin';
import { getFilteredProducts } from './apiCore';
import Checkbox from './checkbox';
import Radiobox from './radiobox';
import { prices } from './fixedPrices';

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const [error, setError] = useState(false);

    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    }

    const loadFilteredResults = (newFilters) => {
        getFilteredProducts(skip, limit, newFilters)
        .then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    }

    const loadMore = () => {
        let toSkip = skip + limit;

        getFilteredProducts(toSkip, limit, myFilters.filters)
        .then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore}
                className="btn btn-primary mb-5">
                    Load More
                </button>
            )
        );
    }

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if(filterBy == "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }

        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    }

    const handlePrice = (value) => {
        const data = prices;
        let array = [];

        for(let key in data) {
            if(data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }

        return array;
    }

    return (  
        <Layout title="Shop Page" description="Search and find books of your choice." className="container">
           <div className="row">
               <div className="col-md-4 col-sm-12">
                   <h4>Filter by categories</h4>
                   <ul>
                   <Checkbox categories={ categories } 
                   handleFilters={ filters => handleFilters(filters, "category") } />
                   </ul>
                   <div className="height"></div>
                   <h4>Filter by price range</h4>
                   <div>
                   <Radiobox prices={ prices } 
                   handleFilters={ filters => handleFilters(filters, "price") } />
                   </div>
               </div>
               <div className="col-md-8 col-sm-12">
                   <h2 className="mb-4">Products</h2>
                   <div className="row">
                        { filteredResults.map((product, i) => {
                            return (
                                <div key={ i } className="col-md-6 col-sm-12 mb-3">
                                    <Card key={ i } product={product} />
                                </div>)}) }
                   </div>
                   { loadMoreButton() }
               </div>
           </div>
        </Layout>
    );
}
 
export default Shop;