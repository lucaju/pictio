//modules
import paper from 'paper/dist/paper-core.min';
import ee from 'event-emitter';


export default function canvasView() {

	let app;

	//emitter
	ee(this);

	// Variables
	this.path = undefined;
	this.ink = [];
	this.prevPoints = undefined;
	this.lastTimestamp = 0;
	

	//--- Initialize...

	this.init = (context) => {
		app = context;
		paper.install(window);
	};

	this.startCanvas = () => {

		initInk(); // Initialize Ink array ()
		paper.setup('canvas'); // Setup Paper #canvas

		let tool = new paper.Tool(); // Inititalize Paper Tool

		// Paper Tool Mouse Down Event
		tool.onMouseDown = (event) => {

			// New Paper Path and Settings
			this.path = new paper.Path();
			this.path.strokeColor = 'black';
			this.path.strokeWidth = 2; //7;

			// Get Time [ms] for each Guess (needed for accurate Google AI Guessing)
			let eventTimeStamp = event.event.timeStamp;
	
			let timeDelta = eventTimeStamp - this.lastTimestamp;
			let time = this.ink[2][this.ink[2].length - 1] + timeDelta;

			// Get XY point from event w/ time [ms] to update Ink Array
			updateInk(event.point, time);

			// Draw XY point to Paper Path
			this.path.add(event.point);

			this.prevPoints = event.point;

			// Reset Timestamps
			this.lastTimestamp = eventTimeStamp;

		};

		// Paper Tool Mouse Drag Event
		tool.onMouseDrag = (event) => {

			// Get Event Timestamp and Timestamp Delta
			let eventTimeStamp = event.event.timeStamp;
			let timeDelta = eventTimeStamp - this.lastTimestamp;

			// Get new Time for Ink Array
			let time = this.ink[2][this.ink[2].length - 1] + timeDelta;

			// Get XY point from event w/ time [ms] to update Ink Array
			updateInk(event.point, time);

			// Draw XY point to Paper Path
			this.path.add(event.point);

			// Reset Timestamps
			this.lastTimestamp = eventTimeStamp;
			
			this.emit('drawing',eventTimeStamp, this.ink);

			const canvasSize = getCanvasDimensions();

			if (canvasSize) {
				app.socket.emit('drawing', {
					room: app.socket.id,
					x0: this.prevPoints.x / canvasSize.width,
					y0: this.prevPoints.y / canvasSize.height,
					x1: event.point.x / canvasSize.width,
					y1: event.point.y / canvasSize.height
				});
			}
			
			this.prevPoints = event.point;

		};

	};

	//--- Initialize Ink Array
	const initInk = () => {
		this.ink = [
			[],
			[],
			[]
		];
	};

	//--- Update Ink Array w/ XY Point + Time
	const updateInk = (point, time) => {
		this.ink[0].push(point.x);
		this.ink[1].push(point.y);
		this.ink[2].push(time);
	};

	//--- Clear Paper Drawing Canvas
	this.clearCanvas = () => {

		// Remove Paper Path Layer
		paper.project.activeLayer.removeChildren();
		paper.view.draw();

		// Init Ink Array
		initInk();
	};

	this.stop = () => {
		if (paper.tool) paper.tool.remove();
	};

	//--- Get Paper Canvas Dimensions Width/Height
	const getCanvasDimensions = () => {
		if (! document.getElementById('canvas'))  return;

		let w = document.getElementById('canvas').offsetWidth;
		let h = document.getElementById('canvas').offsetHeight;
		return {
			height: h,
			width: w
		};
	};

}