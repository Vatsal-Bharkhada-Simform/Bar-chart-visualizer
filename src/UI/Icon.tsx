interface IconProps extends React.SVGProps<SVGSVGElement>{
    path ?: string;
    id : string;
}

export function Icon({
	path = `${import.meta.env.BASE_URL}sprite.svg`,
	id,
	className = "",
    ...props
}: IconProps) {
	return (
		<svg
			className={`pointer-events-none w-[1.2rem] aspect-square ${className}`}
            {...props}
		>
			<use href={`${path}#${id}`}></use>
		</svg>
	);
}
