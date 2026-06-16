import { DataForm } from "../components/DataForm";
import { DataList } from "../components/DataList";
import { Chart } from "./Chart";

export function DataView() {
	return (
		<>
			<aside className="max-h-full flex flex-col border-r border-r-gray-300 md:min-w-sm">
				<DataForm />
				<DataList />
			</aside>
			<Chart />
		</>
	);
}
