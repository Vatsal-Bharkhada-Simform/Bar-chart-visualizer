import type { ToolTipState } from "../types/ChartTypes";

export function Tooltip({ data }: { data: ToolTipState }) {
	return (
		<div
			className="fixed pointer-events-none z-30 transition-all flex-row items-center gap-2 p-2 pr-6 border border-gray-300 bg-gray-50 rounded-xl group"
			style={{
				display: data.visible ? "flex" : "none",
				left: data.x,
				top: data.y,
			}}
		>
			<div className="flex-1 flex gap-2">
				<div
					className="justify-self-stretch rounded-lg w-2"
					id="tt-bar"
					style={{
						backgroundColor: data.candleData?.color,
					}}
				></div>
				<div className="flex-1 flex flex-col gap-1 text-gray-700">
					<div className="max-w-3xs">
						<span
							id="tt-label"
							className="text-xl font-bold transition-all inline-block w-full truncate"
						>
							{data.candleData?.label}
						</span>
					</div>
					<div>
						<span className="pr-2 font-semibold">Value:</span>
						<span id="tt-value">{data.candleData?.value}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
