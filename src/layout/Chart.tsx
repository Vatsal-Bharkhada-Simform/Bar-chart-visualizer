import { useContext, useLayoutEffect, useState } from "react";
import { ChartContext } from "../context/ChartContext";

type CandleData = {
	height: number;
	id: number;
	label: string;
	value: number;
};

export default function Chart() {
	const [candleData, setCandleData] = useState<CandleData[]>([]);

	const { data } = useContext(ChartContext);

	useLayoutEffect(() => {
		function populateCandleHeight() {
			const chartArea = document.getElementById("chart-box");
			if (chartArea && chartArea instanceof HTMLDivElement) {
				const totalHeight =
					chartArea.getBoundingClientRect().height - 10;
				const maxVlaue = data.reduce((acc, item) => {
					if (item.value > acc) acc = item.value;
					return acc;
				}, 0);
				const candles = data.map((item) => {
					return {
						...item,
						height: Math.floor(
							(item.value / maxVlaue) * totalHeight
						),
					};
				});
				setCandleData(candles);
			}
		}
		populateCandleHeight();
	}, [data]);

	return (
		<>
			<section className="flex-1 overflow-hidden p-8 flex flex-col">
				<div className="flex-1 flex overflow-hidden border border-gray-300">
					<div className="h-full p-2 border-r border-r-gray-300">
						Y-axis
					</div>
					<div
						id="chart-box"
						className="h-full flex-1 flex gap-4 overflow-x-auto px-4 pt-6"
					>
						{candleData.map((dataItem) => {
							return (
								<Candle
									height={dataItem.height}
									label={dataItem.label}
								/>
							);
						})}
					</div>
				</div>
				<div className="w-full p-4 border border-gray-300 border-t-0">
					X-axis
				</div>
			</section>
		</>
	);
}

function Candle({
	label,
	height,
	color = "#555",
}: {
	label: string;
	height: number;
	color?: string;
}) {
	return (
		<>
			<div className="flex flex-col items-center justify-end">
				<div
					className={`w-16 rounded-t-xl`}
					style={{
						height: height + "px",
						backgroundColor: color,
					}}
				></div>
				<span>{label}</span>
			</div>
		</>
	);
}
