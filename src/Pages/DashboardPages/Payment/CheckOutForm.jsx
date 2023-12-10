import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";


const CheckOutForm = () => {

    // declare hooks from react stripe
    const stripe = useStripe();
    const elements = useElements();

    // react hooks and custom hooks
    const [error, setError] = useState('');


    // handle checkout form submission
    const handleCheckOutForm = async (event) => {
        event.preventDefault();


        // return if no 'stripe' or 'elements' is found
        if (!stripe || !elements) {
            return;
        }

        // get the element
        const card = elements.getElement(CardElement);

        // return if no card is found
        if (!card) {
            return;
        }

        // make the payment
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
        }
        else {
            console.log("Payment successful:", paymentMethod)
            setError('');
        }
    }



    return (
        <div className="w-full flex flex-col justify-center items-center mt-[50px] gap-5">

            {/* checkout form */}
            <form onSubmit={handleCheckOutForm}
                className="w-full space-y-5">
                <CardElement className="font-body border-[1px] border-lightgray px-5 py-3 rounded-[40px]"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="bg-main text-white font-body px-4 py-2 rounded-[40px] font-semibold hover:bg-third duration-300 w-full" type="submit" disabled={!stripe}>
                    Make the payment
                </button>
                {
                    error ?
                        <p className="font-body font-medium text-[#b61b1b] text-[15px] text-left">{error}</p>
                        :
                        ''
                }
            </form>

        </div>
    );
};

export default CheckOutForm;