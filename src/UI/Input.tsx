interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	labelText?: string;
}

export default function Input({ labelText = "", id, type, ...props }: InputProps) {
	if (labelText) {
		return (
			<div className="flex flex-col gap-1">
				<label
					htmlFor={id}
					className="text-base md:text-md font-inter tracking-tight text-primary"
				>
					{labelText}
				</label>
				<input
					type={type}
					id={id}
					className="w-full px-4 py-2 bg-white border-2 border-gray-300 focus:border-blue-400 outline-none rounded-xl tracking-tight"
					{...props}
				/>
			</div>
		);
	}

	return (
		<input
			type={type}
			className="w-full px-4 py-2 bg-white border-2 border-gray-300 focus:border-blue-400 outline-none rounded-xl tracking-tight"
			{...props}
		/>
	);
}
