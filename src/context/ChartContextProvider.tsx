import { useState, type ReactElement } from "react";
import type { DataItem, DataItemProp } from "../types/ChartTypes";
import { ChartContext } from "./ChartContext";

const defaultValue: Array<DataItem> = [
	{
		id: crypto.randomUUID(),
		label: "Apple",
		value: 300,
	},
	{
		id: crypto.randomUUID(),
		label: "Banana",
		value: 140,
	},
	{
		id: crypto.randomUUID(),
		label: "Orange",
		value: 250,
	},
	{
		id: crypto.randomUUID(),
		label: "Mango",
		value: 400,
	},
	{
		id: crypto.randomUUID(),
		label: "Papaya",
		value: 210,
	},
	{
		id: crypto.randomUUID(),
		label: "Watermelon",
		value: 180,
	},
];

export default function ChartContextProvider({
	children,
}: {
	children: ReactElement;
}) {
	const [data, setData] = useState<Array<DataItem>>(defaultValue);
	const [editData, setEditData] = useState<DataItem | null>(null);

	function addDataItem(newItem: DataItemProp) {
		const dataItem: DataItem = {
			...newItem,
			id: crypto.randomUUID(),
		};
		setData((prev) => [...prev, dataItem]);
	}

	function removeDataItem(dataItem: DataItem) {
		setData((prev) => prev.filter((item) => item.id !== dataItem.id));
	}

	function updateDataItem(dataItem: DataItem) {
		setData((prev) =>
			prev.map((item) => (item.id === dataItem.id ? dataItem : item))
		);
		setEditData(null);
	}

	const ctxValue = {
		data: data,
		editData,
		setEditData,
		addDataItem,
		removeDataItem,
		updateDataItem,
	};

	return (
		<ChartContext.Provider value={ctxValue}>
			{children}
		</ChartContext.Provider>
	);
}
