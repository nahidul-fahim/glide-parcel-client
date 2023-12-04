import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import useAllParcels from '../../../../Hooks/useAllParcels/useAllParcels';

// images
const loadingGif = "https://i.ibb.co/zmckHyD/loading-Gif.gif";


const Statistics = () => {


    // hooks and custom hooks
    const { isPending, allparcels } = useAllParcels();
    const [state, setState] = useState({
        series: [{
            data: [0]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
                    'United States', 'China', 'Germany'
                ],
            }
        }
    });



    useEffect(() => {
        const loadingChartData = () => {
            const bookingDate = allparcels.map(item => item.bookingDate);

            // get the single unique day
            const dateCounts = bookingDate.reduce((total, date) => {
                total[date] = (total[date] || 0) + 1;
                return total;
            }, {});

            // get the totalorders for the unique single day
            const totalOrders = Object.keys(dateCounts).map(date => dateCounts[date]);
            const uniqueDatesSet = new Set(bookingDate);
            const uniqueDate = Array.from(uniqueDatesSet);


            setState({
                series: [{
                    data: totalOrders
                }],
                options: {
                    chart: {
                        type: 'bar',
                        height: 350
                    },
                    plotOptions: {
                        bar: {
                            borderRadius: 0,
                            horizontal: false,
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    xaxis: {
                        categories: uniqueDate,
                    }
                },
            });
        };

        if (!isPending) {
            loadingChartData();
        }
    }, [isPending, allparcels]);

    if (isPending) {
        return <div className="h-[100vh] flex justify-center items-center"><img src={loadingGif} alt="loading gif" /></div>;
    }


    return (
        <div className="container flex flex-col justify-center items-center gap-10 py-5">
            <h2 className="text-5xl font-heading text-third font-bold"><span className="text-main">Statistics</span></h2>

            <div id="chart" className='w-full p-10 font-body'>
                <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
            </div>


        </div>
    );
};

export default Statistics;