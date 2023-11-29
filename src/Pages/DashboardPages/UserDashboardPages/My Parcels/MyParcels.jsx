import useParcels from "../../../../Hooks/useParcels/useParcels";
import { GrUpdate } from "react-icons/gr";
import { GiCancel } from "react-icons/gi";


const MyParcels = () => {

    // hooks and custom hooks
    const [isPending, parcels, refetch] = useParcels();

    // necessary images
    const loadingGif = "https://i.ibb.co/zmckHyD/loading-Gif.gif";
    // Loading state if no data found
    if (isPending) {
        return <div className="h-[100vh] flex justify-center items-center"><img src={loadingGif} alt="" /></div>
    }

    // get the total cost for the price
    const totalCost = parcels.reduce((total, parcel) => total + parcel.cost, 0);




    return (
        <div className="w-full flex flex-col justify-center items-center gap-10 py-5">
            <h2 className="text-5xl font-heading text-third font-bold">My <span className="text-main">Parcels</span></h2>

            {/* total parcels + total cost */}
            <div className="flex flex-col justify-center items-start w-full gap-5 px-5">
                <h3 className="font-body font-semibold text-darkgray text-xl">Total parcels: <span className="text-sub">{parcels.length}</span></h3>
                <h3 className="font-body font-semibold text-darkgray text-xl">Total cost: <span className="text-sub">${totalCost}</span></h3>
            </div>

            {/* all parcels table */}
            <div className="w-full">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="font-inter">
                                <th>#</th>
                                <th>Parcel type</th>
                                <th>Requested delivery date</th>
                                <th>Approximate delivery date</th>
                                <th>Booking date</th>
                                <th>Deliver man</th>
                                <th>Booking status</th>
                                <th>Manage booking</th>
                                <th>Review</th>
                                <th>Payment</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                parcels.map((parcel, index) => <tr key={parcel._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <h4 className="font-medium font-inter text-[14px]">{parcel.parcelType}</h4>
                                    </td>
                                    <td>
                                        <h4 className="font-medium font-inter text-[14px]">{parcel.delvDate}</h4>
                                    </td>
                                    <td className="font-inter font-semibold text-[14px]">
                                        <h4 className="font-medium font-inter text-[14px]">{parcel.delvDate}</h4>
                                    </td>
                                    <td className="font-inter font-semibold text-[14px]">
                                        <h4 className="font-medium font-inter text-[14px]">{parcel.bookingDate}</h4>
                                    </td>
                                    <td className="font-inter font-semibold text-[14px]">
                                        <h4 className="font-medium font-inter text-[14px]">X</h4>
                                    </td>
                                    <td className="font-inter font-semibold text-[14px]">
                                        <h4 className="font-medium font-inter text-[14px]">Good</h4>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyParcels;