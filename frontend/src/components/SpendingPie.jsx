import { ArcElement, Chart as ChartJS, Colors, Legend, Tooltip } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";
import { useTransaction } from "../contexts/TransactionContext";

ChartJS.register(ArcElement, Legend, Tooltip);
ChartJS.register(Colors);

function SpendingPie(){
    const { chartData, chartLoading } = useTransaction();

    // example data
    const data = {
        labels: chartData.map(item => item.category),
        datasets: [
        {
            label: "Spending ($)",
            data: chartData.map(item => item.total),
            backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0"
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