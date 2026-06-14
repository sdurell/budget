import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Legend, Tooltip);

const SPENDING_COLORS = [
    "#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#3B3EAC", "#0099C6",
    "#DD4477", "#66AA00", "#B82E2E", "#316395", "#994499", "#22AA99", "#AAAA11",
    "#6633CC", "#E67300", "#8B0707", "#329262", "#5574A6", "#651067"
];

function SpendingPie({ transactions = [] }){
    
    // Aggregate totals by category to ensure labels and data match length
    const aggregated = useMemo(() => {
        const initial = transactions.reduce((acc, item) => {
            const { category, amount } = item;
            if (category.toLowerCase() === "payment") {
                return acc;
            }
            acc[category] = (acc[category] || 0) + Math.abs(amount);
            return acc;
        }, {});

        const totalSum = Object.values(initial).reduce((acc, val) => {
            return acc + val;
        }, 0);
        let threshold = totalSum * 0.10;

        // Combine bottom entries into one
        return Object.entries(initial)
            .sort((a, b) => a[1] - b[1])
            .reduce((acc, [category, amount]) => {
                if ( amount < threshold && threshold - amount > 0 ) {
                    acc["Other"] = (acc["Other"] || 0) + amount;
                    threshold -= amount;
                } else {
                    acc[category] = amount;
                }
                return acc;
            }, {});
    }, [transactions]);

    const isEmpty = !transactions || transactions.length === 0 || Object.keys(aggregated).length === 0;

    const data = isEmpty
        ? {
            labels: ["No Transactions"],
            datasets: [
                {
                    label: "Spending ($)",
                    data: [1],
                    backgroundColor: ["#E5E7EB"],
                    borderColor: "#fff",
                    borderWidth: 2,
                },
            ],
        }
        : {
            labels: Object.keys(aggregated),
            datasets: [
                {
                    label: "Spending ($)",
                    data: Object.values(aggregated),
                    backgroundColor: SPENDING_COLORS,
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
                enabled: !isEmpty,
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
    );
}

export default SpendingPie;