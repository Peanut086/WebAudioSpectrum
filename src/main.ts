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
let currentTarget;
let currentAudioAnalyser;

window.onresize = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

const ctx = canvas.getContext("2d");
plugin.onLoad((selfPlugin) => {
	
	betterncm.utils.waitForElement(".g-single").then((mainPlayer) => {
		mainPlayer.appendChild(canvas);
		
		// 监听mainPlayer是否在可视区域
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].intersectionRatio <= 0) {
				draw.clear();
			} else {
				if (currentTarget) {
					draw = new Draw(currentAudioAnalyser, ctx);
					draw.drawBar();
				}
			}
		})
		
		observer.observe(mainPlayer);
	});
	
	betterncm.utils.waitForElement(".btnp").then((btn) => {
		loadedPlugins.LibFrontendPlay.addEventListener(
			"updateCurrentAudioPlayer",
			(e) => {
				currentTarget = e.currentTarget;
				// 分析器
				currentAudioAnalyser = currentTarget.currentAudioAnalyser
				// draw = new Draw(currentAudioAnalyser, ctx);
				// draw.drawBar();
				
				currentTarget.currentAudioPlayer.addEventListener("pause", (e) => {
					draw.clear();
				})
				currentTarget.currentAudioPlayer.addEventListener("play", (e) => {
					draw = new Draw(currentAudioAnalyser, ctx);
					draw.drawBar();
				})
			},
		);
	});
});
