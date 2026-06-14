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
    
    // Aggregate totals by category, construct Chart.js data object,
    // and construct chart options.
    const { data, options } = useMemo(() => {
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
        const threshold = totalSum * 0.10;

        const otherMap = {};
        // Combine bottom entries into one
        const aggregated = Object.entries(initial)
            .sort((a, b) => a[1] - b[1])
            .reduce((acc, [category, amount]) => {
                if ( amount + (acc["Other"] || 0) < threshold ) {
                    acc["Other"] = (acc["Other"] || 0) + amount;
                    otherMap[category] = amount;
                } else {
                    acc[category] = amount;
                }
                return acc;
            }, {});

        const isEmpty = !transactions || transactions.length === 0 || Object.keys(aggregated).length === 0;

        const chartData = isEmpty
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

        const chartOptions = {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom",
                },
                tooltip: {
                    enabled: !isEmpty,
                    callbacks: {
                        label: (tooltipItem) => {
                            if (tooltipItem.label === "Other") {
                                return Object.entries(otherMap).map(
                                    ([category, amount]) => ` ${category}: ${amount.toFixed(2)}`
                                );
                            }
                            const value = tooltipItem.raw;
                            return `$${value.toFixed(2)}`;
                        },
                    },
                },
            },
        };

        return { data: chartData, options: chartOptions };
    }, [transactions]);

    return (
        <Pie data={data} options={options}/>
    );
}

export default SpendingPie;