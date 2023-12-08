import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";



// TODO: Add a publishable key here
const stripePromise = loadStripe("")

const Payment = () => {
    return (
        <div className="container flex flex-col justify-center items-center gap-10 py-5">
            <h2 className="text-5xl font-heading text-third font-bold">Make <span className="text-main">Payment</span></h2>


            {/* TODO: A checkout form */}
            <Elements stripe={stripePromise}>
                
            </Elements>

        </div>
    );
};

export default Payment;