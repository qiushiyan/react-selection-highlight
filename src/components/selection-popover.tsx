import { Popover } from "react-text-selection-popover";
import { PencilIcon } from "./pencil";

const unwrapElement = (el: Element) => {
	if (el.textContent) {
		const text = document.createTextNode(el.textContent);
		el.parentNode?.replaceChild(text, el);
	}
};

export const SelectionPopover = () => {
	const target = document.getElementById("main");

	const highlight = () => {
		const selection = window.getSelection();
		if (selection) {
			const range = selection.getRangeAt(0);
			const id = crypto.randomUUID();
			const node = document.createElement("span");
			node.id = id;
			node.classList.add("highlight");
			range.surroundContents(node);

			node.addEventListener("click", () => {
				if (confirm("删除？")) {
					unwrapElement(node);
				}
			});
		}
	};

	return (
		<Popover
			target={target as HTMLElement}
			render={(data) => {
				const { clientRect, isCollapsed } = data;
				if (clientRect == null || isCollapsed) return null;

				const style = {
					left: `${clientRect.left + 75}px`,
					top: `${clientRect.top - 60}px`,
				};

				return (
					<div
						className={
							"fixed rounded-md shadow-sm flex flex-row gap-2 border-2 border-gray-100 items-center justify-between -ml-[75px] "
						}
						style={style}
					>
						<button
							className="flex flex-row gap-1 items-center p-2 bg-slate-100 hover:bg-slate-300 duration-100 ease-linear"
							type="button"
							onClick={highlight}
						>
							<PencilIcon />
							标注
						</button>
					</div>
				);
			}}
		/>
	);
};
