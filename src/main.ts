import {Config} from "./ui/config";
import {Draw} from "./draw";

plugin.onConfig(() => {
	const element = document.createElement("div");
	ReactDOM.render(Config(), element);
	return element;
})


const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "50%";
canvas.style.transform = "translateX(-50%)";
canvas.style.zIndex = "1";
canvas.style.pointerEvents = "none";
let draw;

const ctx = canvas.getContext("2d");
plugin.onLoad((selfPlugin) => {
	
	betterncm.utils.waitForElement(".g-single").then((mainPlayer) => {
		mainPlayer.appendChild(canvas);
		window.onresize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}
	});
	
	betterncm.utils.waitForElement(".btnp").then((btn) => {
		loadedPlugins.LibFrontendPlay.addEventListener(
			"updateCurrentAudioPlayer",
			(e) => {
				let currentTarget = e.currentTarget;
				// 分析器
				let currentAudioAnalyser = currentTarget.currentAudioAnalyser
				
				draw = new Draw(currentAudioAnalyser, ctx);
				draw.drawBar();
				// draw.drawLine();
			},
		);
	});
});
