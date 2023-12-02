import useAllDeliveryMan from "../../../../Hooks/useAllDeliveryMan/useAllDeliveryMan";


// images + gif
const loadingGif = "https://i.ibb.co/zmckHyD/loading-Gif.gif";


const AllDeliveryMan = () => {

    // hooks and custom hooks
    const { deliveryManPending, allDeliveryMan } = useAllDeliveryMan();


    // conditional loading while data fetching
    if (deliveryManPending) {
        return <div className="h-[100vh] flex justify-center items-center"><img src={loadingGif} alt="loading gif" /></div>
    }




    return (
        <div className="container flex flex-col justify-center items-center gap-10 py-5">
            <h2 className="text-5xl font-heading text-third font-bold">All <span className="text-main">Delivery Man</span></h2>

            <h3 className="text-left w-full font-body font-semibold text-xl text-darkgray">Total delivery man: {allDeliveryMan.length}</h3>


            {/* all parcels table */}
            <div className="overflow-x-auto w-full">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="font-body text-white text-center text-[14px] bg-third">
                            <th>#</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Parcel Delivered</th>
                            <th>Avg. Review</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            allDeliveryMan.map((deliveryMan, index) => <tr key={deliveryMan._id}>

                                {/* serial number */}
                                <th>
                                    {index + 1}
                                </th>

                                {/* delivery man name */}
                                <td>
                                    <h4 className="font-medium font-body text-[14px] text-center">{deliveryMan?.name}</h4>
                                </td>

                                {/* delivery man phone */}
                                <td className="text-center">
                                    <h4 className="font-medium font-body text-[14px] text-center">{deliveryMan?.phone || "Unavailable"}</h4>
                                </td>

                                {/* total number of completed delivery */}
                                <td className="font-body font-semibold text-[14px] text-center">
                                    <h4 className="font-medium font-body text-[14px]"> -- </h4>
                                </td>

                                {/* average rating */}
                                <td className="font-body font-semibold text-[14px] text-center">
                                    <h4 className="font-medium font-body text-[14px]"> -- </h4>
                                </td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDeliveryMan;