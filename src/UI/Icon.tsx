export default function Icon({
	path = `${import.meta.env.BASE_URL}sprite.svg`,
	id = "",
	className = "",
}: {
	path?: string;
	id: string;
	className?: string;
}) {
	return (
		<svg
			className={`pointer-events-none w-[1.2rem] aspect-square ${className}`}
		>
			<use href={`${path}#${id}`}></use>
		</svg>
	);
}
