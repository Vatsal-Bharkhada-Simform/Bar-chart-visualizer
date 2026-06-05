import { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChartContext } from "../context/ChartContext";
import { barColors } from "../utils/barColors";
import Candle from "../components/Candle";
import type { CandleData, ToolTipState } from "../types/ChartTypes";
import Tooltip from "../components/Tooltip";

export default function Chart() {
	const [candleData, setCandleData] = useState<Array<CandleData>>([]);
    const [toolTip, setToolTip] = useState<ToolTipState>({
        visible: false,
        x: 0,
        y: 0,
        candleData: null
    });

	const { data } = useContext(ChartContext);

    const hideTimer = useRef<number>(0);

	const maxValue = data.reduce((acc, item) => {
		if (item.value > acc) acc = item.value;
		return acc;
	}, 0);

	useLayoutEffect(() => {
        console.log("Layout calculation");
		function populateCandleHeight() {
			const chartArea = document.getElementById("chart-box");
			if (chartArea && chartArea instanceof HTMLDivElement) {
				const totalHeight =
					(chartArea.getBoundingClientRect().height - 56) * (1-(1/11));

				const candles = data.map((item) => {
					return {
						...item,
						height: Math.floor(
							(item.value / maxValue) * totalHeight
						),
						color: String(barColors[item.label[0].toUpperCase()]),
					};
				});
				setCandleData(candles);
			}
		}
		populateCandleHeight();
	}, [data, maxValue]);
    
    const handleCandleHover = useCallback(function (
		e: React.MouseEvent,
		newCandleData: CandleData
	) {
		if (hideTimer.current) clearTimeout(hideTimer.current);

		const barRect = e.currentTarget.getBoundingClientRect();
		const newY = e.clientY;

		setToolTip((prevToolTip) => {
			if (prevToolTip.candleData === newCandleData) {
				return prevToolTip;
			}

			return {
				visible: true,
				x: barRect.left + barRect.width / 2,
				y: newY,
				candleData: newCandleData,
			};
		});
	}, []);

    const handleBarLeave = useCallback(() => {
		hideTimer.current = setTimeout(() => {
			setToolTip((prev) => ({ ...prev, visible: false }));
		}, 1000);
	}, []);

	useEffect(() => {
		return () => {
			if (hideTimer.current) clearTimeout(hideTimer.current);
		};
	}, []);

	return (
		<>
			<section className="flex-1 overflow-hidden p-8 flex flex-col">
				<div className="flex-1 flex overflow-hidden border border-gray-300">
                    <Tooltip data={toolTip} />
                    
					<div className="h-full w-20 border-r border-r-gray-300 pb-14 flex flex-col-reverse">
						{Array.from({ length: 11 }).map((_, index) => {
							return (
								<div className="flex-1 relative" key={index}>
									<span className="text-gray-400 absolute bottom-0 right-0 px-2 translate-y-1/2">
										{(maxValue / 10) * index}
									</span>
								</div>
							);
						})}
					</div>
					<div
						id="chart-box"
						className="relative h-full w-full overflow-x-hidden"
					>
						<div className="h-full w-full flex overflow-x-auto pb-14 px-6">
							{candleData.map((dataItem) => {
								return <Candle candleData={dataItem} key={dataItem.id} onHover={handleCandleHover} onLeave={handleBarLeave} />;
							})}
						</div>
						<div className="absolute inset-0 mb-14 -z-10 flex flex-col pointer-events-none">
							{Array.from({ length: 11 }).map((_, index) => {
								return (
									<div key={index} className="flex-1 border-b border-b-gray-300"></div>
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
