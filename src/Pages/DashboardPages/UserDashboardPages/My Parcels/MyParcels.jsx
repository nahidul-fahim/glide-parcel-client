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
        <div className="container flex flex-col justify-center items-center gap-10 py-5">
            <h2 className="text-5xl font-heading text-third font-bold">My <span className="text-main">Parcels</span></h2>

            {/* total parcels + total cost */}
            <div className="flex flex-col justify-center items-start w-full gap-5 px-5">
                <h3 className="font-body font-semibold text-darkgray text-xl">Total parcels: <span className="text-sub">{parcels.length}</span></h3>
                <h3 className="font-body font-semibold text-darkgray text-xl">Total cost: <span className="text-sub">${totalCost}</span></h3>
            </div>


            {/* all parcels table */}
            <div className="w-full">
                <div className="overflow-x-auto">
                    <table className="table table-sm md:table-md lg:table-lg table-pin-rows table-pin-cols">
                        {/* head */}
                        <thead>
                            <tr className="font-heading text-darkgray text-center">
                                <th>#</th>
                                <th>Parcel type</th>
                                <th>
                                    Req. delivery date <br />
                                    Apprx. delivery date <br />
                                    Booking date
                                </th>
                                {/* 
                                <th>Apprx. del. date</th>
                                <th>Booking date</th> */}

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

                                    {/* serial number */}
                                    <th>
                                        {index + 1}
                                    </th>

                                    {/* parcel type */}
                                    <td>
                                        <h4 className="font-medium font-body text-[14px] text-center">{parcel.parcelType}</h4>
                                    </td>

                                    {/* requested date */}
                                    <td className="text-center">
                                        <h4 className="font-medium font-body text-[14px] text-center">{parcel.delvDate}</h4>

                                        <h4 className="font-medium font-body text-[14px]">{parcel.delvDate}</h4>

                                        <h4 className="font-medium font-body text-[14px]">{parcel.bookingDate}</h4>
                                    </td>

                                    {/* delivery date */}
                                    {/* <td className="font-body font-semibold text-[14px] text-center">
                                        <h4 className="font-medium font-body text-[14px]">{parcel.delvDate}</h4>
                                    </td> */}

                                    {/* booking date */}
                                    {/* <td className="font-body font-semibold text-[14px] text-center">
                                        <h4 className="font-medium font-body text-[14px]">{parcel.bookingDate}</h4>
                                    </td> */}

                                    {/* delivery man */}
                                    <td className="font-body font-semibold text-[14px] text-center">
                                        <h4 className="font-medium font-body text-[14px]">X</h4>
                                    </td>

                                    {/* booking status */}
                                    <td className="font-body font-semibold text-[14px] text-center">
                                        <h4 className="font-medium font-body text-[14px]">Good</h4>
                                    </td>

                                    {/* manage booking */}
                                    <td className="font-body font-semibold text-[14px] flex justify-center items-center gap-3">
                                        <button><GrUpdate className="text-3xl p-1 rounded-full text-[#0084ff]" /></button>
                                        <button><GiCancel className="text-3xl p-1 rounded-full text-[red]" /></button>
                                    </td>

                                    {/* review */}
                                    <th className="font-body font-medium text-[14px]">
                                        <button className="bg-third text-white text-[14px] hover:bg-main duration-300 px-2 py-1 rounded-[20px] font-body">Review</button>
                                    </th>

                                    {/* payment */}
                                    <th className="font-body font-medium text-[14px]">
                                        <button className="bg-[#a51b1b] text-white text-[14px] hover:bg-main duration-300 px-2 py-1 rounded-[20px] font-body">Payment</button>
                                    </th>
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