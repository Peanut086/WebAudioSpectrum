export class Draw {
	private _analyser: AnalyserNode;
	private _ctx: CanvasRenderingContext2D;
	private _dataArray: Uint8Array;
	private _bufferLength: number;
	
	constructor(analyser: AnalyserNode, ctx: CanvasRenderingContext2D) {
		this._analyser = analyser;
		this._ctx = ctx;
		this._bufferLength = this._analyser.frequencyBinCount;
		this._dataArray = new Uint8Array(this._bufferLength);
		this._analyser.fftSize = 1024;
	}
	
	drawBar() {
		this._analyser.getByteFrequencyData(this._dataArray);
		
		this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
		this._ctx.fillStyle = 'rgba(0, 0, 0, .1)';
		this._ctx.fillRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
		
		const barWidth = (this._ctx.canvas.width / this._bufferLength) * 14;
		let x = 0;
		
		for (let i = 0; i < this._bufferLength; i++) {
			const barHeight = this._dataArray[i];
			
			let gradient = this._ctx.createRadialGradient(
				this._ctx.canvas.width / 2,
				this._ctx.canvas.height / 2,
				0,
				this._ctx.canvas.width / 2,
				this._ctx.canvas.height / 2,
				this._ctx.canvas.width / 2
			);
			
			gradient.addColorStop(0, `rgba(76, 235, 247, 0.1)`);
			gradient.addColorStop(1, `rgba(76, 235, 247, ${barHeight / 800})`);
			this._ctx.fillStyle = gradient;
			
			this._ctx.fillRect(x, this._ctx.canvas.height - barHeight, barWidth, barHeight);
			
			x += barWidth + 1;
		}
		
		requestAnimationFrame(this.drawBar.bind(this));
	}

	/*
	* @Description: 清除画布方法
	* */
	clear() {
		this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
	}
}
