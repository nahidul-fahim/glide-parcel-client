import useParcels from "../../../../Hooks/useParcels/useParcels";


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

            <div className="flex justify-between items-center w-full px-5">
                <h3 className="font-body font-semibold text-darkgray text-xl">Total parcels: <span className="text-third">{parcels.length}</span></h3>
                <h3 className="font-body font-semibold text-darkgray text-xl">Total cost: <span className="text-third">${totalCost}</span></h3>
            </div>
        </div>
    );
};

export default MyParcels;