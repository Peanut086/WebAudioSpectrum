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
					console.log(`%c𝒑𝒆𝒂𝒏𝒖𝒕\n😏😣😆😁🤣😂\n调试时间:2023/7/15 19:14\n源文件:main.ts\n行号:49\n调试数据:`,'color:rgba(250,212,0,.85);background:rgba(199,21,133,.29);','暂停触发')
					draw.clear();
				})
				currentTarget.currentAudioPlayer.addEventListener("play", (e) => {
					console.log(`%c𝒑𝒆𝒂𝒏𝒖𝒕\n😏😣😆😁🤣😂\n调试时间:2023/7/15 19:15\n源文件:main.ts\n行号:52\n调试数据:`,'color:rgba(250,212,0,.85);background:rgba(199,21,133,.29);','播放触发')
					draw = new Draw(currentAudioAnalyser, ctx);
					draw.drawBar();
				})
			},
		);
	});
});
