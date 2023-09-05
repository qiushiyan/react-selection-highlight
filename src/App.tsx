import { useEffect } from "react";
import { SelectionPopover } from "./components/selection-popover";

function App() {
	return (
		<main id="main" className="max-3xl mx-auto prose p-4 lg:p-8">
			<h3>React 实现圈选高亮</h3>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, nostrum
				quis <b>quisquam</b> facilis hic atque eaque perspiciatis magnam, vitae
				quo eum corrupti assumenda dolorum! Libero, iste.
				<i>Debitis tempora ut fugiat</i>.
			</p>

			<p>
				Lorem ipsum <code>dolor sit</code> amet consectetur adipisicing elit.
				Fugit neque sit corrupti, nesciunt voluptate, beatae quam eaque
				dignissimos laudantium magnam aperiam nostrum nobis veritatis totam
				doloribus odit eveniet quisquam. Sit!
			</p>

			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis natus
				explicabo repellendus dolore eligendi aliquam, nemo aspernatur quidem
				mollitia magni delectus facilis praesentium inventore sit sunt error
				labore esse? Veritatis.
			</p>
			<SelectionPopover />
		</main>
	);
}

export default App;
