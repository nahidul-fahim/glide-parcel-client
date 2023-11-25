import CountUp from 'react-countup';

const Statistics = () => {


    // Background image
    const bg = "https://i.ibb.co/6BxjCqj/3.png";

    return (
        <div className="py-10 md:py-[150px] mt-[50px] md:mt-[70px] lg:mt-[100px]"
            style={{
                backgroundImage: `linear-gradient(to bottom, #001447C9, #001447C9), url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'left',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}>
            <div className='flex flex-col md:flex-row justify-between items-center px-5 container mx-auto gap-[80px] md:gap-0'>
                {/* parcels booked */}
                <div className='flex flex-col justify-center items-center gap-3 w-full md:w-[33%]'>
                    <CountUp className='text-6xl lg:text-7xl font-bold font-body text-white text-center'
                        start={0}
                        end={122}
                        duration={4}
                        startOnMount='false'
                        enableScrollSpy='true'
                    />
                    <h3 className='text-2xl lg:text-4xl font-body font-semibold text-lightgray text-center'>Parcels Booked</h3>
                </div>

                {/* parcels delivered */}
                <div className='flex flex-col justify-center items-center gap-3 w-full md:w-[33%]'>
                    <CountUp className='text-6xl lg:text-7xl font-bold font-body text-white text-center'
                        start={0}
                        end={115}
                        duration={4}
                        enableScrollSpy='true'
                    />
                    <h3 className='text-2xl lg:text-4xl font-body font-semibold text-lightgray'>Parcels Delivered</h3>
                </div>

                {/* total users */}
                <div className='flex flex-col justify-center items-center gap-3 w-full md:w-[33%]'>
                    <CountUp className='text-6xl lg:text-7xl font-bold font-body text-white text-center'
                        start={0}
                        end={576}
                        duration={4}
                        enableScrollSpy='true'
                    />
                    <h3 className='text-2xl lg:text-4xl font-body font-semibold text-lightgray'>Registered Users</h3>
                </div>
            </div>
        </div>
    );
};

export default Statistics;