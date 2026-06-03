import { useContext } from "react";
import { ChartContext } from "../context/ChartContext";
import type { DataItem } from "../types/ChartTypes";
import Icon from "../UI/Icon";

export default function DataList() {
	const { data } = useContext(ChartContext);

	return (
		<ul className="list-none p-4 max-h-full flex flex-col gap-2 overflow-y-auto scrollbar-thin">
			{data.map((item) => (
				<DataItem data={item} key={item.id} />
			))}
		</ul>
	);
}

function DataItem({ data }: { data: DataItem }) {
	const { removeDataItem } = useContext(ChartContext);

	return (
		<>
			<li className="flex flex-row items-center gap-2 p-4 border border-gray-300 bg-gray-50 rounded-xl group">
				<div className="flex-1 flex flex-col gap-2 text-gray-700">
					<div>
						<span className="pr-2 font-semibold">Label:</span>
						<span className="">{data.label}</span>
					</div>
					<div>
						<span className="pr-2 font-semibold">Value:</span>
						<span>{data.value}</span>
					</div>
				</div>
				<button
					className="p-2 border-none outline-none bg-transparent rounded-lg hover:bg-red-100 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
					onClick={() => removeDataItem(data)}
				>
					<Icon id="trashBin" />
				</button>
			</li>
		</>
	);
}
