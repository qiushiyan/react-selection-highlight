import { Popover } from "react-text-selection-popover";
import { PencilIcon } from "./pencil";

export const SelectionPopover = () => {
	const target = document.getElementById("main");

	const highlight = () => {};

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
