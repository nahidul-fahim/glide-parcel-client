import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";

// images + gif
const loadingGif = "https://i.ibb.co/zmckHyD/loading-Gif.gif";


const AllUsers = () => {

    // hooks and custom hooks
    const axiosSecure = useAxiosSecure();


    const { isPending, data: allUsers = [], refetch } = useQuery({
        queryKey: ["allUsers"],
        queryFn: async () => {
            const res = await axiosSecure.get("/allusers")
            return res.data;
        }
    })

    if (isPending) {
        return <div className="h-[100vh] flex justify-center items-center"><img src={loadingGif} alt="loading gif" /></div>
    }




    return (
        <div className="container flex flex-col justify-center items-center gap-10 py-5">
            <h2 className="text-5xl font-heading text-third font-bold">All <span className="text-main">Delivery Man</span></h2>

            <h3 className="text-left w-full font-body font-semibold text-xl text-darkgray">Total users: {allUsers.length}</h3>


            {/* all users table */}
            <div className="overflow-x-auto w-full">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="font-body text-white text-center text-[14px] bg-third">
                            <th>#</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Parcel booked</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            allUsers.map((user, index) => <tr key={user._id}>

                                {/* serial number */}
                                <th>
                                    <p className="font-body font-regular text-darkgray">{index + 1}</p>
                                </th>

                                {/* user name */}
                                <td>
                                    <h4 className="font-semibold font-body text-[14px] text-center">{user?.name}</h4>
                                </td>

                                {/* user phone */}
                                <td className="text-center">
                                    <h4 className="font-medium font-body text-[14px] text-center">{user?.phone || "Unavailable"}</h4>
                                </td>

                                {/* total number of parcel booked */}
                                <td className="text-center">
                                    <h4 className="font-medium font-body text-[14px] text-center">{user?.totalOrder || "No booking yet"}</h4>
                                </td>

                                {/* make delivery man or admin */}
                                <td className="font-body font-semibold text-[14px] text-center flex flex-col md:flex-row justify-center items-center gap-2">

                                    {/* make delivery man */}
                                    <button className="bg-[#20a8d1] text-white text-[14px] hover:bg-third duration-300 px-2 py-1 rounded-[20px] font-body">Make Delivery Man</button>

                                    {/* make admin */}
                                    <button className="bg-[#a01a1a] text-white text-[14px] hover:bg-third duration-300 px-2 py-1 rounded-[20px] font-body">Make Admin</button>
                                </td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>






        </div>
    );
};

export default AllUsers;