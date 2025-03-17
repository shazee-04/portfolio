gsap.registerPlugin(Draggable);

const container = document.getElementById("grid-container");

const boxes = gsap.utils.toArray(".boxed");
gsap.to(boxes, {
	autoAlpha: 1,
	duration: 0.8,
	stagger: 0.1,
	ease: "power1.inOut"
});

const colSize = 450;
const rowSize = 300;
const gridRows = 3;
const gridColumns = 4;

function createGrid(gridRows, gridColumns) {
	for (let i = 0; i < gridRows * gridColumns; i++) {
		const y = Math.floor(i / gridColumns) * rowSize;
		const x = (i * colSize) % (gridColumns * colSize);

		const cell = document.createElement("div");
		cell.classList.add("cell");
		cell.style.width = colSize - 1 + "px";
		cell.style.height = rowSize - 1 + "px";
		cell.style.top = y + "px";
		cell.style.left = x + "px";
		container.appendChild(cell);
	}
}

createGrid(gridRows, gridColumns);

let clampCol = gsap.utils.clamp(0, gridColumns - 1);
let clampRow = gsap.utils.clamp(0, gridRows - 1);

let cells = [];

// Map cell locations to array
for (let row = 0; row < gridRows; row++) {
	for (let col = 0; col < gridColumns; col++) {
		cells.push({
			row: row,
			col: col,
			x: col * colSize,
			y: row * rowSize
		});
	}
}

let listItems = gsap.utils.toArray(".boxed").sort(() => 0.5 - Math.random()); // Randomize list items
let sortables = listItems.map(Sortable); // Array of sortables

gsap.to(container, { autoAlpha: 1, duration: 0.5 });

function changeIndex(item, to, sameRow, sameCol) {
	// Check if adjacent to new position
	if ((sameRow && !sameCol) || (!sameRow && sameCol)) {
		// Swap positions in array
		var temp = sortables[to];
		sortables[to] = item;
		sortables[item.index] = temp;
	} else {
		// Change position in array
		arrayMove(sortables, item.index, to);
	}

	// Simple, but not optimized way to change element's position in DOM. Not always necessary.
	sortables.forEach((sortable) => container.appendChild(sortable.element));

	// Set index for each sortable
	sortables.forEach((sortable, index) => sortable.setIndex(index));
}

function Sortable(element, index) {
	let content = element.querySelector(".boxed-content");

	let animation = gsap.to(content, {
		duration: 0.3,
		boxShadow: "rgba(0,0,0,0.8) 0px 16px 32px 0px",
		force3D: true,
		scale: 1.1,
		paused: true
	});

	let dragger = new Draggable(element, {
		onDragStart: downAction,
		onRelease: upAction,
		onDrag: dragAction,
		bounds: '.showcase-section'
	});

	// let position = element._gsTransform;
	let getProp = gsap.getProperty(element);

	// Public properties and methods
	let sortable = {
		cell: cells[index],
		dragger: dragger,
		element: element,
		index: index,
		setIndex: setIndex
	};

	gsap.set(element, {
		x: sortable.cell.x,
		y: sortable.cell.y
	});

	function setIndex(index) {
		let cell = cells[index];
		// var dirty = position.x !== cell.x || position.y !== cell.y;
		let dirty = getProp("x") !== cell.x || getProp("y") !== cell.y;

		sortable.cell = cell;
		sortable.index = index;

		// Don't layout if you're dragging
		if (!dragger.isDragging && dirty) layout();
	}

	function downAction() {
		animation.play();
		this.update();
	}

	function dragAction() {
		let col = clampCol(Math.round(this.x / colSize));
		let row = clampRow(Math.round(this.y / rowSize));

		let cell = sortable.cell;
		let sameCol = col === cell.col;
		let sameRow = row === cell.row;

		// Check if position has changed
		if (!sameRow || !sameCol) {
			// Calculate the new index
			var index = gridColumns * row + col;

			// Update the model
			changeIndex(sortable, index, sameRow, sameCol);
		}
	}

	function upAction() {
		animation.reverse();
		layout();
	}

	function layout() {
		gsap.to(element, {
			duration: 0.3,
			x: sortable.cell.x,
			y: sortable.cell.y
		});
	}

	return sortable;
}

// Changes an elements's position in array
function arrayMove(array, from, to) {
	array.splice(to, 0, array.splice(from, 1)[0]);
}