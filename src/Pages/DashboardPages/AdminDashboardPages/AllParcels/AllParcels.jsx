import useAllParcels from "../../../../Hooks/useAllParcels/useAllParcels";


// images
const loadingGif = "https://i.ibb.co/zmckHyD/loading-Gif.gif";

const AllParcels = () => {



    // hooks and custom hooks
    const { isPending, allparcels, refetch } = useAllParcels();


    // conditional loading state
    if (isPending) {
        return <div className="h-[100vh] flex justify-center items-center"><img src={loadingGif} alt="loading gif" /></div>
    }






    return (
        <div className="container flex flex-col justify-center items-center gap-10 py-5">
            <h2 className="text-5xl font-heading text-third font-bold">All <span className="text-main">Parcels</span></h2>


            {/* all parcels table */}
            <div className="w-full">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="font-body text-white text-center text-[14px] bg-third">
                                <th>#</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Booking date</th>
                                <th>Req. del. date</th>
                                <th>Cost</th>
                                <th>Booking status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                allparcels.map((parcel, index) => <tr key={parcel._id}>

                                    {/* serial number */}
                                    <th>
                                        {index + 1}
                                    </th>

                                    {/* Booker name */}
                                    <td>
                                        <h4 className="font-medium font-body text-[14px] text-center">{parcel.name}</h4>
                                    </td>

                                    {/* booker phone */}
                                    <td className="text-center">
                                        <h4 className="font-medium font-body text-[14px] text-center">{parcel.phone}</h4>
                                    </td>

                                    {/* booking date */}
                                    <td className="font-body font-semibold text-[14px] text-center">
                                        <h4 className="font-medium font-body text-[14px]">{parcel.bookingDate}</h4>
                                    </td>

                                    {/* requested delivery date */}
                                    <td className="font-body font-semibold text-[14px] text-center">
                                        <h4 className="font-medium font-body text-[14px]">{parcel.delvDate}</h4>
                                    </td>

                                    {/* cost */}
                                    <td className="font-body font-semibold text-[14px] text-center">
                                        <h4 className="font-medium font-body text-[14px]">${parcel.cost}</h4>
                                    </td>

                                    {/* booking status */}
                                    <td className="font-body font-semibold text-[14px] text-center">
                                        <h4
                                            className={`font-semibold capitalize font-body text-[14px]
                                            ${parcel.bookingStatus === "pending" ? "text-[#ff9100]" : 'text-black'}
                                            ${parcel.bookingStatus === "cancelled" ? "text-[#ff0000]" : 'text-black'}
                                            ${parcel.bookingStatus === "delivered" ? "text-[#219e40]" : 'text-black'}
                                            ${parcel.bookingStatus === "on the way" ? "text-[#008cff]" : 'text-black'}
                                            ${parcel.bookingStatus === "returned" ? "text-[#8c00ff]" : 'text-black'}`}>
                                            {parcel.bookingStatus}
                                        </h4>
                                    </td>

                                    {/* manage button (action) */}
                                    <td className="font-body font-semibold text-[14px]">
                                        <button className="bg-main text-white font-body font-medium px-3 py-1 rounded-[20px] hover:bg-third duration-300">
                                            Manage
                                        </button>
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

export default AllParcels;