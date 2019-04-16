//modules
import paper from 'paper/dist/paper-core.min';
import ee from 'event-emitter';


export default function canvasView() {

	//emitter
	ee(this);

	// Variables
	this.app = undefined;
	this.path = undefined;
	this.ink = [];
	this.prevPoints = undefined;
	this.lastTimestamp = 0;
	

	//--- Initialize...

	this.init = function(context) {
		this.app = context;
		paper.install(window);
	};

	this.startCanvas = function() {
		const _this = this;

		this.initInk(); // Initialize Ink array ()
		paper.setup('canvas'); // Setup Paper #canvas

		let tool = new paper.Tool(); // Inititalize Paper Tool

		// Paper Tool Mouse Down Event
		tool.onMouseDown = function (event) {

			// New Paper Path and Settings
			_this.path = new paper.Path();
			_this.path.strokeColor = 'black';
			_this.path.strokeWidth = 2; //7;

			// Get Time [ms] for each Guess (needed for accurate Google AI Guessing)
			let eventTimeStamp = event.event.timeStamp;
	
			let timeDelta = eventTimeStamp - _this.lastTimestamp;
			let time = _this.ink[2][_this.ink[2].length - 1] + timeDelta;

			// Get XY point from event w/ time [ms] to update Ink Array
			_this.updateInk(event.point, time);

			// Draw XY point to Paper Path
			_this.path.add(event.point);

			_this.prevPoints = event.point;

			// Reset Timestamps
			_this.lastTimestamp = eventTimeStamp;

		};

		// Paper Tool Mouse Drag Event
		tool.onMouseDrag = function (event) {

			// Get Event Timestamp and Timestamp Delta
			let eventTimeStamp = event.event.timeStamp;
			let timeDelta = eventTimeStamp - _this.lastTimestamp;

			// Get new Time for Ink Array
			let time = _this.ink[2][_this.ink[2].length - 1] + timeDelta;

			// Get XY point from event w/ time [ms] to update Ink Array
			_this.updateInk(event.point, time);

			// Draw XY point to Paper Path
			_this.path.add(event.point);

			// Reset Timestamps
			_this.lastTimestamp = eventTimeStamp;
			
			_this.emit('drawing',eventTimeStamp,_this.ink);

			let canvasSize = _this.getCanvasDimensions();

			if(_this.app.IOon) {
				_this.app.socket.emit('drawing', {
					x0: _this.prevPoints.x / canvasSize.width,
					y0: _this.prevPoints.y / canvasSize.height,
					x1: event.point.x / canvasSize.width,
					y1: event.point.y / canvasSize.height
				});
			}

			_this.prevPoints = event.point;

		};

	};

	//--- Initialize Ink Array
	this.initInk = function() {
		this.ink = [
			[],
			[],
			[]
		];
	};

	//--- Update Ink Array w/ XY Point + Time
	this.updateInk = function(point, time) {
		this.ink[0].push(point.x);
		this.ink[1].push(point.y);
		this.ink[2].push(time);
	};

	//--- Clear Paper Drawing Canvas
	this.clearCanvas = function() {

		// Remove Paper Path Layer
		paper.project.activeLayer.removeChildren();
		paper.view.draw();

		// Init Ink Array
		this.initInk();
	};

	this.stop = function() {
		if (paper.tool) paper.tool.remove();
	};

	//--- Get Paper Canvas Dimensions Width/Height
	this.getCanvasDimensions = function() {
		let w = document.getElementById('canvas').offsetWidth;
		let h = document.getElementById('canvas').offsetHeight;
		return {
			height: h,
			width: w
		};
	};

}