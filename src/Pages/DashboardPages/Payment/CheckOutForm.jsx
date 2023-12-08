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
            </form>

        </div>
    );
};

export default CheckOutForm;