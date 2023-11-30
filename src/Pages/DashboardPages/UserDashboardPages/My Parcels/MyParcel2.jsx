// Tried to make the table using tanstack table but the <tbody> data was not displying. Because "rows" was undefined. Need to check later. 





import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import useParcels from "../../../../Hooks/useParcels/useParcels";


const MyParcel2 = () => {

    const [isPending, parcels] = useParcels();



    // declaring columns
    /** @type import('@tanstack/react-table').columnDef<any> */
    const columns = [
        {
            header: "Parcel type",
            accessorKey: "parcelType",
            footer: "Parcel type",
        },
        {
            header: "Req. del. date",
            accessorKey: "delvDate",
            footer: "Req. del. date",
        },
        {
            header: "Apprx. del. date",
            accessorKey: "delvDate",
            footer: "Apprx. del. date",
        },
        {
            header: "Booking date",
            accessorKey: "bookingDate",
            footer: "Booking date",
        },
        {
            header: "Delivery man",
            accessorKey: "bookingDate",
            footer: "Delivery man",
        },
        {
            header: "Booking status",
            accessorKey: "bookingStatus",
            footer: "Booking status",
        },
        {
            header: "Manage booking",
            accessorKey: "bookingStatus",
            footer: "Manage booking",
        },
        {
            header: "Review",
            accessorKey: "bookingStatus",
            footer: "Review",
        },
        {
            header: "Payment",
            accessorKey: "parcelType",
            footer: "Payment",
        },
    ]


    // table from tanstack table
    const table = useReactTable({
        parcels,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })






    if (isPending) {
        return <p>loading</p>
    }

    // necessary images
    // const loadingGif = "https://i.ibb.co/zmckHyD/loading-Gif.gif";

    // Loading state if no data found
    // }

    // get the total cost for the price
    // const totalCost = parcels.reduce((total, parcel) => total + parcel.cost, 0);


    // Demo data
    /*
            "_id": "6568114cbef3d7dc8b698627",
        "name": "Nahid",
        "email": "email@gmail.com",
        "phone": "+1 (981) 917-3574",
        "parcelType": "Confidential",
        "parcelWeight": 1,
        "recvName": "Luke Shaw",
        "recvPhone": "+1 (106) 433-9481",
        "delvAddress": "Ajman, Dubai",
        "delvDate": "2023-12-09",
        "latitude": "25.415645431",
        "longitude": "89.23255656",
        "cost": 50,
        "bookingDate": "2023-11-30",
        "bookingStatus": "pending",
        "deliveryManId": " "
    */




    // get all the header group and rows
    const headerGroups = table.getHeaderGroups();
    const allRows = table.getRowModel();
    console.log(allRows);



    return (
        <div className="w-full border-2 border-darkgray flex flex-col justify-center items-center gap-10">
            <h2 className="text-5xl font-heading text-third font-bold">Table <span className="text-main">Component</span></h2>

            {/* creating table here */}
            <div className="w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg overflow-x-auto">
                <table className="w-full font-body font-normal">
                    <thead>
                        {headerGroups.map(headerGroup =>
                            <tr key={headerGroup._id}
                                className="flex justify-between items-center gap-10 bg-third text-white">
                                {headerGroup.headers.map(header =>
                                    <th className="p-2 font-semibold"
                                        key={header._id}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>)}
                            </tr>)}
                    </thead>


                    {/* <tbody>
                        {table.getRowModel().rows.map((row, index) => (
                            <tr key={index}>
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody> */}



                    <tfoot>
                        <tr>
                            <td>Parcel Type</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

        </div>
    );
};

export default MyParcel2;