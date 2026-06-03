import { useContext } from "react";
import Input from "../UI/Input";
import { ChartContext } from "../context/ChartContext";

export default function DataForm() {
	const { addDataItem } = useContext(ChartContext);

	function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const label = formData.get("label");
		const value = formData.get("value");

		if (typeof label !== "string" || typeof value !== "string") return;
		if (isNaN(Number(value))) return;

		addDataItem({ label: label, value: Number(value) });

		e.currentTarget.reset();

		if (e.currentTarget.elements[0] instanceof HTMLInputElement) {
			e.currentTarget.elements[0].focus();
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="p-4 flex flex-col gap-4 border-b border-b-gray-300"
		>
			<Input
				type="text"
				labelText="Label"
				id="labelText"
				name="label"
				maxLength={50}
				placeholder="Enter label"
				autoFocus
			/>
			<Input
				type="number"
				labelText="Value"
				id="value"
				name="value"
				min={0}
				placeholder="Enter value"
			/>
			<button
				type="submit"
				className="w-full px-6 py-2 border-none outline-none rounded-xl bg-blue-400 hover:bg-blue-500 text-white font-semibold focus:ring-3 focus:ring-blue-500"
			>
				Add
			</button>
		</form>
	);
}
