export default function Candle({
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
			<div className="relative flex flex-col items-center justify-end">
				<div
					className={`w-16 rounded-t-xl`}
					style={{
						height: height + "px",
						backgroundColor: color,
					}}
				></div>
				<div className="w-full py-4 text-center absolute bottom-0 translate-y-full overflow-hidden text-nowrap text-ellipsis">
					{label}
				</div>
			</div>
		</>
	);
}
