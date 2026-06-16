import { useContext, useEffect, useRef } from "react";
import { Input } from "../UI/Input";
import { ChartContext } from "../context/ChartContext";

export function DataForm() {
	const { editData, setEditData, addDataItem, updateDataItem } =
		useContext(ChartContext);
	const formRef = useRef<HTMLFormElement | null>(null);

	const isEditMode = editData && editData.id !== "";

	useEffect(() => {
		if (!formRef.current) return;
		formRef.current.reset();
	}, [editData]);

	function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		let label = formData.get("label");
		const value = formData.get("value");

		if (!label || !value) {
			alert("Please fill all the fields");
			return;
		}

		if (typeof label !== "string" || typeof value !== "string") return;

		label = label.trim();
		const finalValue = Number(value);

		if (!/^(?=.*[A-Za-z])[A-Za-z0-9 ]+$/.test(label)) {
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
			ref={formRef}
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
				required
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
				required
			/>
			{isEditMode ? (
				<div className="flex gap-2">
					<button
						type="submit"
						className="w-full px-6 py-2 border-none outline-none rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold focus:ring-3 focus:ring-blue-600 cursor-pointer"
					>
						Save
					</button>
					<button
						type="button"
						onClick={() => setEditData(null)}
						className="w-full px-6 py-2 border border-gray-300 outline-none rounded-xl bg-white hover:bg-gray-50 font-semibold focus:ring-2 focus:ring-gray-400 cursor-pointer"
					>
						Cancel
					</button>
				</div>
			) : (
				<button
					type="submit"
					className="w-full px-6 py-2 border-none outline-none rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold focus:ring-3 focus:ring-blue-600 cursor-pointer"
				>
					Add
				</button>
			)}
		</form>
	);
}
