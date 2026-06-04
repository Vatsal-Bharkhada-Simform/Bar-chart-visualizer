import { useLayoutEffect, useRef } from "react";
import type { CandleData } from "../types/ChartTypes";

export default function Candle({candleData}: {candleData: CandleData}) {
    const ref = useRef(0);
    
    useLayoutEffect(() => {
        const whiteRabbit = document.getElementById(candleData.id);

        const keyframes = [{ height: candleData.height + "px" }];
        if(!ref.current){
            keyframes.unshift({height: "0px"});
            ref.current = candleData.height;
        }
        const timing: KeyframeAnimationOptions = { easing: "ease" ,duration: 1000, fill: "forwards" }

        whiteRabbit.animate(keyframes, timing);
    }, [candleData.height, candleData.id]);
    
	return (
		<>
			<div className="relative flex flex-col items-center justify-end">
				<div
                    id={candleData.id}
					className={`w-18 rounded-t-xl`}
                    data-type={"BAR"}
					style={{
						height: candleData.height + "px",
						backgroundColor: candleData.color,
					}}
				></div>
				<div className="w-full py-4 text-center absolute bottom-0 translate-y-full overflow-hidden text-nowrap text-ellipsis">
					{candleData.label}
				</div>
			</div>
		</>
	);
}
