import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { emptyCart } from './cartHelpers';
import Layout from './layout';
import { getProducts, getBraintreeClientToken, processPayment, createOrder } from './apiCore';
import Card from './card';
import { isAuthenticated } from '../auth';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({ products }) => {
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: "",
        instance: {},
        address: ""
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if(data.error) {
                setData({ ...data, error: data.error });
            } else {
                setData({ clientToken: data.clientToken });
            }
        });
    }

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const handleAddress = (event) => {
        setData({ ...data, address: event.target.value });
    }

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count*nextValue.price;
        }, 0);
    }

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Signin to Checkout</button>
            </Link>
        )
    }

    let deliveryAddress = data.address;

    const buy = () => {
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
        .then(data => {
            //console.log(data);
            nonce = data.nonce;
            //console.log("send nonce and total to process: ", nonce, getTotal(products));
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)
            }

            processPayment(userId, token, paymentData)
            .then(response => {
                //console.log(response)
                const createOrderData = {
                    products: products,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount,
                    address: deliveryAddress 
                }

                createOrder(userId, token, createOrderData)
                .then(response => {
                    emptyCart(() => {
                        window.location = "/cart";
                        setData({ ...data, success: true })
                    });
                })
                .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
        })
        .catch(error => {
            //console.log("dropin error: ", error);
            setData({ ...data, error: error.message });
        });
    }

    const showDropIn = () => {
        return (
            <div onBlur={() => setData({...data, error: ""})}>
                {data.clientToken !== null && products.length > 0 ? (
                    <div>
                        <div className="form-group my-3">
                            <textarea onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..." />
                        </div>
                        <DropIn options={{
                            authorization: data.clientToken
                        }} onInstance={instance => (data.instance = instance)} />
                        <button onClick={buy} className="btn btn-success btn-block center">Pay</button>
                    </div>
                ) : null}
            </div>
        );
    }

    const showError = error => {
        return (
            <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ display: error ? "" : "none" }}>
            { error }
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
        );
    }

    const showSuccess = success => {
        return (
            <div className="alert alert-info alert-dismissible fade show" role="alert" style={{ display: success ? "" : "none" }}>
                Your payment was successfull!
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
        );
    }


    return (  
        <div>
            <h2 className="text-center">Total {`${getTotal()}`}</h2>
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    );
}
 
export default Checkout;