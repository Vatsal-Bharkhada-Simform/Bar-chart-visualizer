import { memo, useLayoutEffect, useRef } from "react";
import type { CandleData } from "../types/ChartTypes";

const Candle = memo( function ({
	candleData,
	onHover,
    onLeave
}: {
	candleData: CandleData;
	onHover: (e: React.MouseEvent, candleData: CandleData) => void;
	onLeave: () => void;
}) {
	const ref = useRef(0);

	useLayoutEffect(() => {
        console.log("HEHE");
		const barElement = document.getElementById(candleData.id);
		if (!barElement) return;

		const keyframes = [{ height: candleData.height + "%" }];
		if (!ref.current) {
			keyframes.unshift({ height: "0%" });
			ref.current = candleData.height;
		}
		const timing: KeyframeAnimationOptions = {
			easing: "ease",
			duration: 1000,
			fill: "forwards",
		};

		barElement.animate(keyframes, timing);
	}, [candleData.height, candleData.id]);

	return (
		<>
			<div
				className="relative flex flex-col items-center justify-end px-3 hover:bg-blue-200/50 transition-all h-full"
				data-type="BAR_CONT"
			>
				<div
					id={candleData.id}
					className={`w-20 rounded-t-xl`}
					data-type={"BAR"}
					style={{
						height: (candleData.height + "%"),
						backgroundColor: candleData.color,
					}}
					onMouseMove={(e) => onHover(e, candleData)}
                    onMouseLeave={onLeave}
				></div>
				<div className="w-full py-4 text-center absolute bottom-0 translate-y-full overflow-hidden text-nowrap text-ellipsis pointer-events-none">
					{candleData.label}
				</div>
			</div>
		</>
	);
});

export default Candle;
