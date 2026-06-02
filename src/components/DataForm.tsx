import { useContext } from "react";
import Input from "../UI/Input";
import { ChartContext } from "../context/ChartContext";

export default function DataForm(){
    const { addDataItem } = useContext(ChartContext);

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const label = formData.get("label");
        const value = formData.get("value");

        if(typeof label !== "string" || typeof value !== "string") return;
        if (isNaN(Number(value))) return;

		addDataItem({ label: label, value: Number(value) });

        e.currentTarget.reset();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="py-2 flex flex-col gap-4"
        >
            <Input 
                type="text"
                labelText="Label"
                id="labelText"
                name="label"
                placeholder="Enter label"
            />
            <Input 
                type="number"
                labelText="Value"
                id="value"
                name="value"
                placeholder="Enter value"
            />
            <button 
                type="submit"
                className="w-full px-6 py-2 border-none outline-none rounded-xl bg-blue-400 hover:bg-blue-500 text-white font-semibold"
            >
                Add
            </button>
        </form>
    )
}
