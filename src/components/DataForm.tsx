import { useContext } from "react";
import Input from "../UI/Input";
import { ChartContext } from "../context/ChartContext";

export default function DataForm() {
	const { editData, addDataItem, updateDataItem } = useContext(ChartContext);

	const isEditMode = editData && editData.id !== "";

	function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		let label = formData.get("label");
		const value = formData.get("value");

		if (!label || !value) return;
		if (typeof label !== "string" || typeof value !== "string") return;

		label = label.trim();
		const finalValue = Number(value);

		if (!/^[-A-Za-z. ]+$/.test(label)) {
			alert("Please provide a proper label");
			return;
		}
		if (isNaN(finalValue)) return;

		if (isEditMode) {
			updateDataItem({
				...editData,
				label: label,
				value: finalValue,
			});
		} else {
			addDataItem({ label: label, value: finalValue });
		}

		e.currentTarget.reset();

		if (e.currentTarget.elements[0] instanceof HTMLInputElement) {
			e.currentTarget.elements[0].focus();
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={`p-4 flex flex-col gap-4 border-b border-b-gray-300 ${isEditMode && "bg-orange-100"}`}
		>
			<Input
				type="text"
				labelText="Label"
				id="labelText"
				name="label"
				defaultValue={
					isEditMode && editData?.label !== "" ? editData.label : ""
				}
				maxLength={50}
				placeholder="Enter label"
				autoFocus
			/>
			<Input
				type="number"
				labelText="Value"
				id="value"
				name="value"
				defaultValue={
					isEditMode && editData?.value ? editData.value : ""
				}
				min={0}
				step={"any"}
				placeholder="Enter value"
			/>
			<button
				type="submit"
				className="w-full px-6 py-2 border-none outline-none rounded-xl bg-blue-400 hover:bg-blue-500 text-white font-semibold focus:ring-3 focus:ring-blue-500"
			>
				{isEditMode ? "Save" : "Add"}
			</button>
		</form>
	);
}
