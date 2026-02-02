import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Legend, Tooltip);

function SpendingPie({ transactions }){

    if(transactions.length === 0){
        return;
    }

    // Aggregate totals by category to ensure labels and data match length
    const aggregated = transactions.reduce((acc, item) => {
        const { category, amount } = item;
        if (category.toLowerCase() == "payment") {
            return acc;
        }
        acc[category] = (acc[category] || 0) + Math.abs(amount);
        return acc;
    }, {});

    const data = {
        labels: Object.keys(aggregated),
        datasets: [
        {
            label: "Spending ($)",
            data: Object.values(aggregated),
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
                        return `$${value.toFixed(2)}`;
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