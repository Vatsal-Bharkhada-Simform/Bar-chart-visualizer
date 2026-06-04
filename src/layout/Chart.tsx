import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChartContext } from "../context/ChartContext";
import { barColors } from "../utils/barColors";
import Candle from "../components/Candle";
import type { CandleData } from "../types/ChartTypes";
import Tooltip from "../components/Tooltip";

export default function Chart() {
	const [candleData, setCandleData] = useState<Array<CandleData>>([]);

	const { data } = useContext(ChartContext);

    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const lastElementRef = useRef<Element | null>(null);

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

    function getBarData(id: string){
        return data.find(item => item.id === id);
    }

    function handleShowTooltip(e: MouseEvent){
        const belowElement = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;

        if(belowElement?.dataset.type !== "BAR") return;
        
        if(lastElementRef.current){
            if(lastElementRef.current === belowElement) return;
            lastElementRef.current = belowElement;

            const belowElementRect = belowElement.getBoundingClientRect();
            const barData = getBarData(belowElement.id);
            if(!barData) return;

            tooltipRef.current.style.display = "flex";
            tooltipRef.current.style.top = e.clientY+"px";
            tooltipRef.current.style.left = (belowElementRect.left + belowElementRect.width/2)+"px";

            const ttBar = tooltipRef.current.querySelector("#tt-bar") as HTMLElement; 
            const ttLabel = tooltipRef.current.querySelector("#tt-label") as HTMLElement; 
            const ttValue = tooltipRef.current.querySelector("#tt-value") as HTMLElement; 
            ttBar.style.backgroundColor = barColors[barData.label[0].toUpperCase()];
            ttLabel.innerText = barData.label;
            ttValue.innerText = String(barData.value);
        }
        else {
            lastElementRef.current = belowElement;
        }
    }
    
    useEffect(() => {
        const chartBox = document.getElementById("chart-box");
        if(!chartBox || !(chartBox instanceof HTMLDivElement)) return;
    
        chartBox.addEventListener("mousemove", handleShowTooltip);

        return () => {
            chartBox.removeEventListener("mousemove", handleShowTooltip);
        }
    }, []);

	return (
		<>
			<section className="flex-1 overflow-hidden p-8 flex flex-col">
				<div className="flex-1 flex overflow-hidden border border-gray-300">
                    <Tooltip ref={tooltipRef} />
                    
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
						<div className="h-full w-full flex gap-6 overflow-x-auto pb-14 px-6">
							{candleData.map((dataItem) => {
								return <Candle candleData={dataItem} key={dataItem.id} />;
							})}
						</div>
						<div className="absolute inset-0 mb-14 -z-10 flex flex-col">
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
