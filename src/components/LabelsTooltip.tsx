import { memo, useState, type SubmitEvent } from "react";
import type { LabelType } from "../types/ChartTypes";
import Input from "../UI/Input";
import Icon from "../UI/Icon";

const LabelsTooltip = memo(function ({
	labels,
	setLabels,
}: {
	labels: LabelType;
	setLabels: React.Dispatch<React.SetStateAction<LabelType>>;
}) {
	const [isOpen, setIsOpen] = useState(true);

	function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		let labelX = formData.get("labelX");
		let labelY = formData.get("labelY");

		if (!labelX || !labelY) return;
		if (typeof labelX !== "string" || typeof labelY !== "string") return;
		labelX = labelX.trim();
		labelY = labelY.trim();

		if (labelX === labels.labelX && labelY === labels.labelY) return;

		if (!/^[-A-Za-z. ]+$/.test(labelX)) {
			alert("Please provide a proper label for x-axis");
			return;
		}
		if (!/^[-A-Za-z. ]+$/.test(labelY)) {
			alert("Please provide a proper label for y-axis");
			return;
		}

		setLabels({
			labelX,
			labelY,
		});
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-2 border border-gray-300 rounded-2xl p-4 bg-white shadow-md"
		>
			<div className="flex justify-between items-center">
				<h2 className="text-lg font-semibold">Labels</h2>
				<button
					className={`p-2 cursor-pointer rounded-3xl hover:bg-gray-200 transition-all ${isOpen && "rotate-180"}`}
					title="Toggle tooltip"
					onClick={() => setIsOpen((prev) => !prev)}
					type="button"
				>
					<Icon id="chevron-down" />
				</button>
			</div>
			<div className={`flex flex-col gap-2 ${!isOpen && "hidden"}`}>
				<Input
					type="text"
					labelText="X-axis label"
					name="labelX"
					defaultValue={labels.labelX}
					id="label-x"
				/>
				<Input
					type="text"
					labelText="Y-axis label"
					name="labelY"
					defaultValue={labels.labelY}
					id="label-y"
				/>
				<button
					type="submit"
					className="w-full px-6 py-2 border-none outline-none rounded-xl bg-blue-400 hover:bg-blue-500 text-white font-semibold focus:ring-3 focus:ring-blue-500 cursor-pointer"
				>
					Save
				</button>
			</div>
		</form>
	);
});

export default LabelsTooltip;
