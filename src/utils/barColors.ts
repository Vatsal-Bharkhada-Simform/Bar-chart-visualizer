export const barColors = [
	"#FF6B81",
	"#6EC6FF",
	"#7ED957",
	"#FFB86B",
	"#B388FF",
	"#4DD0E1",
	"#F06292",
	"#64B5F6",
	"#81C784",
	"#FF8A65",
	"#9575CD",
	"#4DB6AC",
	"#E57373",
	"#7986CB",
	"#AED581",
	"#FF7043",
	"#BA68C8",
	"#4FC3F7",
	"#66BB6A",
	"#FFA726",
	"#AB47BC",
	"#26C6DA",
	"#EF5350",
	"#5C6BC0",
	"#9CCC65",
	"#EC407A",
];

const DEFAULT_COLOR = "#aaa";

export function getBarColor(label: string) {
	const trimmed = label.trim();
	if (!trimmed) return DEFAULT_COLOR;

	let index = 0;
	for (let i = 0; i < trimmed.length; i++) {
		index += trimmed[i].charCodeAt(0);
	}

	index %= barColors.length;

	return barColors[index] || "#aaa";
}
