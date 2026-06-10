import { useCallback, useContext } from "react";
import { ChartContext } from "../context/ChartContext";
import type { DataItem } from "../types/ChartTypes";
import { Icon } from "../UI/Icon";
import { barColors } from "../utils/barColors";

export function DataList() {
	const { data, editData } = useContext(ChartContext);

	const isEditMode = editData && editData.id !== "";

	const populateListItems = useCallback(
		function () {
			if (data.length === 0) {
				return (
					<>
						<div className="h-full flex justify-center items-center">
							<span className="font-semibold text-lg text-gray-500">
								Nothing to show
							</span>
						</div>
					</>
				);
			} else {
				return data.map((item) => (
					<DataItem data={item} key={item.id} />
				));
			}
		},
		[data]
	);

	return (
		<ul
			className={`relative list-none p-4 h-full max-h-full flex flex-col gap-2 overflow-y-auto scrollbar-thin ${isEditMode && "pointer-events-none opacity-60"}`}
		>
			{populateListItems()}
		</ul>
	);
}

function DataItem({ data }: { data: DataItem }) {
	const { removeDataItem, setEditData } = useContext(ChartContext);
	const bg = barColors[data.label[0].toUpperCase()];
	console.log("Rendered...");

	return (
		<>
			<li className="flex flex-row items-center gap-2 p-2 border border-gray-300 bg-gray-50 rounded-xl group">
				<div className="flex flex-1 gap-2">
					<div
						className="justify-self-stretch rounded-lg w-2"
						style={{ backgroundColor: bg }}
					></div>
					<div className="flex-1 flex flex-col gap-2 py-2 text-gray-700">
						<div className="w-2xs">
							<span className="text-xl font-bold inline-block w-full truncate">
								{data.label}
							</span>
						</div>
						<div>
							<span className="pr-2 font-semibold">Value:</span>
							<span>{data.value}</span>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<button
						className="p-2 border-none outline-none bg-transparent rounded-lg hover:bg-blue-100 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
						title="Edit item"
						onClick={() => setEditData(data)}
					>
						<Icon id="edit" />
					</button>
					<button
						className="p-2 border-none outline-none bg-transparent rounded-lg hover:bg-red-100 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
						title="Delete item"
						onClick={() => removeDataItem(data)}
					>
						<Icon id="trashBin" />
					</button>
				</div>
			</li>
		</>
	);
}
