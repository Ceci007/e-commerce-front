import React, { useState, useEffect } from 'react';
import Layout from './layout';
import { read, listRelated } from './apiCore';
import Card from './card';


const Product = (props) => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                listRelated(data._id).then(data => {
                    if(data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                        setSuccess(true);
                    }
                });
            }
        });
    }

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    const showRelatedProducts = (relatedProduct) => {
       if(relatedProduct.length == 0) {
        return (
            <div className="alert alert-info alert-dismissible fade show"  role="alert" style={{ display: success ? "" : "none" }}>
            There are no related products
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
        );
       }
    }

    return (  
        <Layout title={product && product.name} description={product && product.description} className="container">
           <div className="row">
               {product && product.description && 
               <div className="col-md-12 col-sm-12 mb-3">
                    <Card product={product} showViewProductButton={false} 
                    showOtherDetails={true}/>
               </div>}
               <div className="col-sm-12 mb-3">
               <h2 className="my-4 center">
                    Related Products
                </h2>  
                {showRelatedProducts(relatedProduct)}
                {relatedProduct.map((product, i) => (
                    <div key={ i } className="col-md-4 col-sm-12 mb-3">
                        <Card key={ i } product={ product } />
                    </div>))}
               </div>
           </div>
        </Layout>
    );
}
 
export default Product;