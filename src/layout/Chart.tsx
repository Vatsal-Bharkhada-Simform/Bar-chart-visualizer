import { useContext, useLayoutEffect, useState } from "react";
import { ChartContext } from "../context/ChartContext";
import { barColors } from "../utils/barColors";
import Candle from "../components/Candle";

type CandleData = {
	height: number;
	id: string;
	label: string;
	value: number;
	color: string;
};

export default function Chart() {
	const [candleData, setCandleData] = useState<Array<CandleData>>([]);

	const { data } = useContext(ChartContext);

	const maxValue = data.reduce((acc, item) => {
		if (item.value > acc) acc = item.value;
		return acc;
	}, 0);

	useLayoutEffect(() => {
		function populateCandleHeight() {
			const chartArea = document.getElementById("chart-box");
			if (chartArea && chartArea instanceof HTMLDivElement) {
				const totalHeight =
					(chartArea.getBoundingClientRect().height - 56) * (1-(1/11));

				console.log(totalHeight);

				const candles = data.map((item) => {
					return {
						...item,
						height: Math.floor(
							(item.value / maxValue) * totalHeight
						),
						color: String(barColors[item.label[0]]),
					};
				});
				setCandleData(candles);
			}
		}
		populateCandleHeight();
	}, [data, maxValue]);

	return (
		<>
			<section className="flex-1 overflow-hidden p-8 flex flex-col">
				<div className="flex-1 flex overflow-hidden border border-gray-300">
					<div className="h-full w-20 border-r border-r-gray-300 pb-14 flex flex-col-reverse">
						{Array.from({ length: 11 }).map((_, index) => {
							return (
								<div className="flex-1 relative">
									<span className="text-gray-400 absolute bottom-0 right-0 px-2 translate-y-1/2">
										{((maxValue / 10) * (index))}
									</span>
								</div>
							);
						})}
					</div>
					<div
						id="chart-box"
						className="relative h-full w-full flex gap-6 overflow-x-auto pb-14 px-6"
					>
						{candleData.map((dataItem) => {
							return (
								<Candle
									height={dataItem.height}
									label={dataItem.label}
									color={dataItem.color}
									key={dataItem.id}
								/>
							);
						})}
						<div className="absolute inset-0 mb-14 -z-10 flex flex-col">
							{Array.from({ length: 11 }).map(() => {
								return (
									<div className="flex-1 border-b border-b-gray-300"></div>
								);
							})}
						</div>
					</div>
				</div>
				<div className="w-full p-4 border border-gray-300 border-t-0">
					X-axis
				</div>
			</section>
		</>
	);
}
