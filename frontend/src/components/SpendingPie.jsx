import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useUser } from "../contexts/UserContext";

ChartJS.register(ArcElement, Legend, Tooltip);

function SpendingPie(){
    const { chart } = useUser();

    // example data
    const data = {
        labels: chart.map(item => item.category),
        datasets: [
        {
            label: "Spending ($)",
            data: chart.map(item => item.total),
            backgroundColor: [
            "#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#3B3EAC", "#0099C6",
            "#DD4477", "#66AA00", "#B82E2E", "#316395", "#994499", "#22AA99", "#AAAA11",
            "#6633CC", "#E67300", "#8B0707", "#329262", "#5574A6", "#651067"
            ],
            borderColor: "#fff",
            borderWidth: 2,
        },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const value = tooltipItem.raw;
                        return `$${value}`;
                    },
                },
            },
        },
    };

    return (
        <Pie data={data} options={options}/>
    )
}

export default SpendingPie;