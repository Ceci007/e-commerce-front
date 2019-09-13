import React, { useState, useEffect } from 'react';
import { getCategories } from '../admin/apiAdmin';
import { list } from './apiCore';
import Cart from './cart';

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false
    });

    const { categories, category, search, results, searched } = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setData({ ...data, categories: data });
            }
        });
    }

    useEffect(() => {
        loadCategories();
    }, []);

    const searchData = () => {
        if(search) {
            list({ search: search || undefined, category: category })
            .then(response => {
                if(response.error) {
                    console.log(response.error);
                } else {
                    setData({ ...data, results: response, searched: true });
                }
            });
        }
    }

    const searchSubmit = (event) => {
        event.preventDefault();
        searchData();
    }

    const handleChange = (name) => (event) => {
        setData({ ...data, [name]: event.target.value, searched: false });
    }

    const searchMessage = (searched, results) => {
        if(searched && results.length > 0) {
            return (
                <div className="alert alert-success alert-dismissible fade show"  role="alert" >
                { `Found ${results.length} products` }
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
            );
        }

        if(searched && results.length < 1) {
            return (
                <div className="alert alert-danger alert-dismissible fade show" role="alert" >
                { `No products founded.` }
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
            );
        }
    }

    const searchedProducts = (results = []) => {
        return (
            <div>
                <div className="my-4">
                { searchMessage(searched, results) }
                </div>
                <div className="row">
                { results.map((product, i) => 
                    (<Cart key={i} product={product} />)) }
                </div>
            </div>
        );
    }

    const searchForm = () => {
        return (
            <form onSubmit={ searchSubmit }>
                <span className="input-group-text">
                    <div className="input-group input-group-lg">
                        <div className="input-group-prepend">
                            <select className="btn mr-2" onChange={ handleChange("category") }>
                                <option valu="All">Pick category</option>
                                { categories.map((cat, i) => 
                                    (<option key={i} value={cat._id} >
                                    {cat.name}
                                    </option>)) }
                            </select>
                        </div>
                        <input type="search" 
                        className="form-control" 
                        onChange={ handleChange("search") }
                        placeholder="Search by name" />
                    </div>
                    <div className="btn input-group-append" style={{border: "none"}}>
                        <button className="btn btn-primary">
                        <i className="fas fa-search"></i>
                        </button>
                    </div>
                </span>
            </form>
        );
    }

    return (  
        <div className="row">
            <div className="container mb-4">
            { searchForm() }
            </div>
            <div className="container-fluid mb-4">
            { searchedProducts(results) }
            </div>
        </div>
    );
}
 
export default Search;