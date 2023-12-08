import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";


const CheckOutForm = () => {

    // declare hooks from react stripe
    const stripe = useStripe();
    const elements = useElements();


    // checkout form submission
    const handleCheckOutForm = event => {
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



    }



    return (
        <div>

            {/* checkout form */}
            <form onSubmit={handleCheckOutForm}>
                <CardElement
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
                <button type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>

        </div>
    );
};

export default CheckOutForm;