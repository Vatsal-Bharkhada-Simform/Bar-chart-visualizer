import type { RefObject } from "react";

export default function Tooltip({
	ref,
}: {
	ref: RefObject<HTMLDivElement | null>;
}) {
	return (
		<div
			id="tooltip"
			className="fixed top-0 left-0 hidden z-20 transition-all flex-row items-center gap-2 p-2 border border-gray-300 bg-gray-50 rounded-xl group"
			ref={ref}
		>
			<div className="flex-1 flex gap-2">
				<div
					className="justify-self-stretch rounded-lg w-2"
					id="tt-bar"
				></div>
				<div className="flex-1 flex flex-col gap-2 py-2 text-gray-700">
					<div>
						<span
							id="tt-label"
							className="text-xl font-bold"
						></span>
					</div>
					<div>
						<span className="pr-2 font-semibold">Value:</span>
						<span id="tt-value"></span>
					</div>
				</div>
			</div>
		</div>
	);
}
