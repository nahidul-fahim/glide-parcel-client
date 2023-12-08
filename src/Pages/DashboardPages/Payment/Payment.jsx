import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";



// TODO: Add a publishable key here
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_SECRET_KEY)

const Payment = () => {
    return (
        <div className="container flex flex-col justify-center items-center gap-10 py-5">
            <h2 className="text-5xl font-heading text-third font-bold">Make <span className="text-main">Payment</span></h2>


            {/* TODO: A checkout form */}
            <div className="w-2/3">
                <Elements stripe={stripePromise}>
                    <CheckOutForm />
                </Elements>
            </div>

        </div>
    );
};

export default Payment;