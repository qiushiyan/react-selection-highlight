import { Popover } from "react-text-selection-popover";
import { PencilIcon } from "./pencil";

const unwrapElement = (el: Element) => {
	if (el.textContent) {
		const text = document.createTextNode(el.textContent);
		el.parentNode?.replaceChild(text, el);
	}
};

const getSafeRanges = (dangerousRange: Range) => {
	const commonAncestor = dangerousRange.commonAncestorContainer;

	const s = new Array(0);
	const rs: Range[] = new Array(0);
	if (dangerousRange.startContainer !== commonAncestor) {
		for (
			let i = dangerousRange.startContainer;
			i !== commonAncestor;
			i = i.parentNode as Node
		)
			s.push(i);
	}

	if (s.length > 0) {
		for (let j = 0; j < s.length; j++) {
			const xs = document.createRange();
			if (j) {
				xs.setStartAfter(s[j - 1]);
				xs.setEndAfter(s[j].lastChild);
			} else {
				xs.setStart(s[j], dangerousRange.startOffset);
				xs.setEndAfter(
					s[j].nodeType === Node.TEXT_NODE ? s[j] : s[j].lastChild,
				);
			}
			rs.push(xs);
		}
	}

	const e = new Array(0);
	const re = new Array(0);
	if (dangerousRange.endContainer !== commonAncestor) {
		for (
			let k = dangerousRange.endContainer;
			k !== commonAncestor;
			k = k.parentNode as Node
		)
			e.push(k);
	}

	if (e.length > 0) {
		for (let m = 0; m < e.length; m++) {
			const xe = document.createRange();
			if (m) {
				xe.setStartBefore(e[m].firstChild);
				xe.setEndBefore(e[m - 1]);
			} else {
				xe.setStartBefore(
					e[m].nodeType === Node.TEXT_NODE ? e[m] : e[m].firstChild,
				);
				xe.setEnd(e[m], dangerousRange.endOffset);
			}
			re.unshift(xe);
		}
	}

	const xm = document.createRange();
	if (s.length > 0 && e.length > 0) {
		xm.setStartAfter(s[s.length - 1]);
		xm.setEndBefore(e[e.length - 1]);
	} else {
		return [dangerousRange];
	}

	rs.push(xm);

	const result = rs.concat(re);
	return result.filter((r) => r.toString().trim() !== "");
};

export const SelectionPopover = () => {
	const target = document.getElementById("main");

	const highlight = () => {
		const selection = window.getSelection();
		if (selection) {
			const range = selection.getRangeAt(0);
			const safeRanges = getSafeRanges(range);
			const id = crypto.randomUUID();
			safeRanges.forEach((r) => {
				const node = document.createElement("span");
				node.classList.add("highlight");
				node.dataset.highlightId = id;
				r.surroundContents(node);

				const els = document.querySelectorAll(`[data-highlight-id="${id}"]`);
				els.forEach((el) => {
					el.addEventListener("click", () => {
						els.forEach(unwrapElement);
					});
				});
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
