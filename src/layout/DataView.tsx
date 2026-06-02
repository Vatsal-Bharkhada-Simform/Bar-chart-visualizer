import DataForm from "../components/DataForm";
import DataList from "../components/DataList";

export default function DataView(){
    return (
		<>
			<aside className="max-h-full flex flex-col border-r border-r-gray-300">
				<DataForm />
                <DataList />
			</aside>
		</>
	);
}
