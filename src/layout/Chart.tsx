import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { ChartContext } from "../context/ChartContext";
import { barColors } from "../utils/barColors";
import type { CandleData, LabelType, ToolTipState } from "../types/ChartTypes";
import Candle from "../components/Candle";
import Tooltip from "../components/Tooltip";
import LabelsTooltip from "../components/LabelsTooltip";

export default function Chart() {
	const [toolTip, setToolTip] = useState<ToolTipState>({
		visible: false,
		x: 0,
		y: 0,
		candleData: null,
	});

	const [labels, setLabels] = useState<LabelType>({
		labelX: "X-axis",
		labelY: "Y-axis",
	});

	const { data } = useContext(ChartContext);

	const hideTimer = useRef<number>(0);

	const maxValue = data.reduce((acc, item) => {
		if (item.value > acc) acc = item.value;
		return acc;
	}, 0);

	const candleData = useMemo(() => {
		return data.map((item) => {
			return {
				...item,
				height: (item.value / maxValue) * 90.9,
				color: String(barColors[item.label[0].toUpperCase()]),
			};
		});
	}, [data, maxValue]);

	const handleCandleHover = useCallback(function (
		e: React.MouseEvent<HTMLDivElement>,
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

					<div className="relative h-full p-7 border-r border-r-gray-300">
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tracking-[.8rem]">
							<div
								className="uppercase text-center max-h-2/3 overflow-hidden text-ellipsis text-nowrap"
								style={{
									writingMode: "vertical-rl",
                                    textOrientation: "upright"
								}}
							>
								{labels.labelY}
							</div>
						</div>
					</div>
					<div className="relative h-full w-20 border-r border-r-gray-300 pb-14 flex flex-col-reverse">
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
						className="relative h-full w-full overflow-x-hidden mb-4"
					>
						<div className="absolute top-0 right-0 z-10 p-4 w-sm">
							<LabelsTooltip
								labels={labels}
								setLabels={setLabels}
							/>
						</div>
						<div className="h-full w-full flex overflow-x-auto pb-14 px-6 scrollbar-gutter-stable">
							<div className="flex">
								{candleData.map((dataItem) => {
									return (
										<Candle
											candleData={dataItem}
											key={dataItem.id}
											onHover={handleCandleHover}
											onLeave={handleBarLeave}
										/>
									);
								})}
							</div>
						</div>
						<div className="absolute inset-0 mb-14 -z-10 flex flex-col pointer-events-none">
							{Array.from({ length: 11 }).map((_, index) => {
								return (
									<div
										key={index}
										className="flex-1 border-b border-b-gray-300"
									></div>
								);
							})}
						</div>
					</div>
				</div>
				<div className="w-full p-4 border border-gray-300 border-t-0">
					<div className="w-full tracking-[1rem] uppercase text-center">
						{labels.labelX}
					</div>
				</div>
			</section>
		</>
	);
}
