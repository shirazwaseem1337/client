import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";

// its optional param as by default its not 
const OverviewChart = ({ isDashboard = false, view }) => {
    const theme = useTheme();
    const { data, isLoading } = useGetSalesQuery();

    const [totalSalesLine, totalUnitsLine] = useMemo(() => {
        // no data return
        if (!data) return [];

        // grabbing monthlydata from data
        const { monthlyData } = data;

        // data start from empty
        // nivo says ye 3 data hu
        const totalSalesLine = {
            id: "totalSales",  // what the line represents
            color: theme.palette.secondary.main,      // x,y ka color
            data: [],
        };

        // 2nd line
        const totalUnitsLine = {
            id: "totalUnits",
            color: theme.palette.secondary[600],
            data: [],
        };


        // monthly data sy cheze grab
        Object.values(monthlyData).reduce(
            (acc, { month, totalSales, totalUnits }) => {
                const curSales = acc.sales + totalSales;
                const curUnits = acc.units + totalUnits;

                // putting values in data
                totalSalesLine.data = [
                    ...totalSalesLine.data,
                    { x: month, y: curSales },
                ];

                totalUnitsLine.data = [
                    ...totalUnitsLine.data,
                    { x: month, y: curUnits },
                ];

                return { sales: curSales, units: curUnits };
            },
            { sales: 0, units: 0 } // accum values
        );

        return [[totalSalesLine], [totalUnitsLine]];
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!data || isLoading) return "Loading...";


    return (
        <ResponsiveLine
            data={view === "sales" ? totalSalesLine : totalUnitsLine}  // changed this
            // we put the theme
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: theme.palette.secondary[200],
                        },
                    },
                    legend: {
                        text: {
                            fill: theme.palette.secondary[200],
                        },
                    },
                    ticks: {
                        line: {
                            stroke: theme.palette.secondary[200],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: theme.palette.secondary[200],
                        },
                    },
                },
                legends: {
                    text: {
                        fill: theme.palette.secondary[200],
                    },
                },
                tooltip: {
                    container: {
                        color: theme.palette.primary.main,
                    },
                },
            }}
            margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
            xScale={{ type: "point" }}
            yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,        // true sy false aik dosry ke upper ajati
                reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"          // for curvy lines
            enableArea={isDashboard}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                format: (v) => {          // we did for responsive and for dashboard page
                    if (isDashboard) return v.slice(0, 3);
                    return v;
                },
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? "" : "Month",      // we put
                legendOffset: 36,
                legendPosition: "middle",
            }}
            axisLeft={{
                orient: "left",
                tickValues: 5,
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard // we put
                    ? ""
                    : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
                legendOffset: -60,
                legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={
                !isDashboard // we did
                    ? [
                        {
                            anchor: "bottom-right",
                            direction: "column",
                            justify: false,
                            translateX: 30,
                            translateY: -40,
                            itemsSpacing: 0,
                            itemDirection: "left-to-right",
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: "circle",
                            symbolBorderColor: "rgba(0, 0, 0, .5)",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemBackground: "rgba(0, 0, 0, .03)",
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]
                    : undefined
            }
        />
    );
};

export default OverviewChart;