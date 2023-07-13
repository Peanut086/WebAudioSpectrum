(() => {
  // src/ui/config.tsx
  function Config() {
    return /* @__PURE__ */ h("div", null, "\u6D4B\u8BD5");
  }

  // src/draw.ts
  var Draw = class {
    constructor(analyser, ctx2) {
      this._analyser = analyser;
      this._ctx = ctx2;
      this._bufferLength = this._analyser.frequencyBinCount;
      this._dataArray = new Uint8Array(this._bufferLength);
      this._analyser.fftSize = 1024;
    }
    /*
    * 绘制频谱(柱状 纵向)
    * */
    drawBar() {
      requestAnimationFrame(this.drawBar.bind(this));
      this._analyser.getByteFrequencyData(this._dataArray);
      this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
      this._ctx.fillStyle = "rgba(0, 0, 0, .1)";
      this._ctx.fillRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
      const barWidth = this._ctx.canvas.width / this._bufferLength * 14;
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
    }
  };

  // src/main.ts
  plugin.onConfig(() => {
    const element = document.createElement("div");
    ReactDOM.render(Config(), element);
    return element;
  });
  var canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "50%";
  canvas.style.transform = "translateX(-50%)";
  canvas.style.zIndex = "1";
  canvas.style.pointerEvents = "none";
  var draw;
  var ctx = canvas.getContext("2d");
  plugin.onLoad((selfPlugin) => {
    betterncm.utils.waitForElement(".g-single").then((mainPlayer) => {
      mainPlayer.appendChild(canvas);
      window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
    });
    betterncm.utils.waitForElement(".btnp").then((btn) => {
      loadedPlugins.LibFrontendPlay.addEventListener(
        "updateCurrentAudioPlayer",
        (e) => {
          let currentTarget = e.currentTarget;
          let currentAudioAnalyser = currentTarget.currentAudioAnalyser;
          draw = new Draw(currentAudioAnalyser, ctx);
          draw.drawBar();
        }
      );
    });
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3VpL2NvbmZpZy50c3giLCAiLi4vc3JjL2RyYXcudHMiLCAiLi4vc3JjL21haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBmdW5jdGlvbiBDb25maWcoKXtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdj5cdTZENEJcdThCRDU8L2Rpdj5cclxuICAgIClcclxufVxyXG4iLCAiZXhwb3J0IGNsYXNzIERyYXcge1xyXG5cdHByaXZhdGUgX2FuYWx5c2VyOiBBbmFseXNlck5vZGU7XHJcblx0cHJpdmF0ZSBfY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcblx0cHJpdmF0ZSBfZGF0YUFycmF5OiBVaW50OEFycmF5O1xyXG5cdHByaXZhdGUgX2J1ZmZlckxlbmd0aDogbnVtYmVyO1xyXG5cdFxyXG5cdGNvbnN0cnVjdG9yKGFuYWx5c2VyOiBBbmFseXNlck5vZGUsIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XHJcblx0XHR0aGlzLl9hbmFseXNlciA9IGFuYWx5c2VyO1xyXG5cdFx0dGhpcy5fY3R4ID0gY3R4O1xyXG5cdFx0dGhpcy5fYnVmZmVyTGVuZ3RoID0gdGhpcy5fYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnQ7XHJcblx0XHR0aGlzLl9kYXRhQXJyYXkgPSBuZXcgVWludDhBcnJheSh0aGlzLl9idWZmZXJMZW5ndGgpO1xyXG5cdFx0dGhpcy5fYW5hbHlzZXIuZmZ0U2l6ZSA9IDEwMjQ7XHJcblx0fVxyXG5cdFxyXG5cdC8qXHJcblx0KiBcdTdFRDhcdTUyMzZcdTk4OTFcdThDMzEoXHU2N0YxXHU3MkI2IFx1N0VCNVx1NTQxMSlcclxuXHQqICovXHJcblx0ZHJhd0JhcigpIHtcclxuXHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmRyYXdCYXIuYmluZCh0aGlzKSk7XHJcblx0XHR0aGlzLl9hbmFseXNlci5nZXRCeXRlRnJlcXVlbmN5RGF0YSh0aGlzLl9kYXRhQXJyYXkpO1xyXG5cdFx0XHJcblx0XHQvLyBcdTZFMDVcdTdBN0FcdTc1M0JcdTVFMDNcclxuXHRcdHRoaXMuX2N0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5fY3R4LmNhbnZhcy53aWR0aCwgdGhpcy5fY3R4LmNhbnZhcy5oZWlnaHQpO1xyXG5cdFx0Ly8gXHU4RkM3XHU1RUE2XHU2NTQ4XHU2NzlDXHJcblx0XHR0aGlzLl9jdHguZmlsbFN0eWxlID0gJ3JnYmEoMCwgMCwgMCwgLjEpJztcclxuXHRcdHRoaXMuX2N0eC5maWxsUmVjdCgwLCAwLCB0aGlzLl9jdHguY2FudmFzLndpZHRoLCB0aGlzLl9jdHguY2FudmFzLmhlaWdodCk7XHJcblx0XHRcclxuXHRcdC8vIFx1N0VEOFx1NTIzNlx1OTg5MVx1OEMzMVxyXG5cdFx0Y29uc3QgYmFyV2lkdGggPSAodGhpcy5fY3R4LmNhbnZhcy53aWR0aCAvIHRoaXMuX2J1ZmZlckxlbmd0aCkgKiAxNDtcclxuXHRcdGxldCB4ID0gMDtcclxuXHRcdFxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9idWZmZXJMZW5ndGg7IGkrKykge1xyXG5cdFx0XHRjb25zdCBiYXJIZWlnaHQgPSB0aGlzLl9kYXRhQXJyYXlbaV07XHJcblx0XHRcdFxyXG5cdFx0XHQvLyB0aGlzLl9jdHguZmlsbFN0eWxlID0gYHJnYmEoMTQ0LCAyNDAsIDE0NCwgMC4xKWA7XHJcblx0XHRcdGxldCBncmFkaWVudCA9IHRoaXMuX2N0eC5jcmVhdGVSYWRpYWxHcmFkaWVudChcclxuXHRcdFx0XHR0aGlzLl9jdHguY2FudmFzLndpZHRoIC8gMixcclxuXHRcdFx0XHR0aGlzLl9jdHguY2FudmFzLmhlaWdodCAvIDIsXHJcblx0XHRcdFx0MCxcclxuXHRcdFx0XHR0aGlzLl9jdHguY2FudmFzLndpZHRoIC8gMixcclxuXHRcdFx0XHR0aGlzLl9jdHguY2FudmFzLmhlaWdodCAvIDIsXHJcblx0XHRcdFx0dGhpcy5fY3R4LmNhbnZhcy53aWR0aCAvIDIsXHJcblx0XHRcdClcclxuXHRcdFx0Ly8gXHU0RjdGXHU3NTI4cmdiYVx1OEJCRVx1N0Y2RVx1OTg5Q1x1ODI3Mlx1RkYwQ1x1NUU3Nlx1NEUxNFx1OTAwRlx1NjYwRVx1NUVBNlx1OTY4Rlx1Nzc0MFx1OTg5MVx1OEMzMVx1NTNEOFx1NTMxNlxyXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgYHJnYmEoNzYsIDIzNSwgMjQ3LCAwLjEpYCk7XHJcblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCBgcmdiYSg3NiwgMjM1LCAyNDcsICR7YmFySGVpZ2h0IC8gODAwfSlgKTtcclxuXHRcdFx0dGhpcy5fY3R4LmZpbGxTdHlsZT1ncmFkaWVudDtcclxuXHRcdFx0XHJcblx0XHRcdHRoaXMuX2N0eC5maWxsUmVjdCh4LCB0aGlzLl9jdHguY2FudmFzLmhlaWdodCAtIGJhckhlaWdodCwgYmFyV2lkdGgsIGJhckhlaWdodCk7XHJcblx0XHRcdFxyXG5cdFx0XHR4ICs9IGJhcldpZHRoICsgMTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwgImltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi91aS9jb25maWdcIjtcclxuaW1wb3J0IHtEcmF3fSBmcm9tIFwiLi9kcmF3XCI7XHJcblxyXG5wbHVnaW4ub25Db25maWcoKCkgPT4ge1xyXG5cdGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFJlYWN0RE9NLnJlbmRlcihDb25maWcoKSwgZWxlbWVudCk7XHJcblx0cmV0dXJuIGVsZW1lbnQ7XHJcbn0pXHJcblxyXG5cclxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbmNhbnZhcy5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuY2FudmFzLnN0eWxlLnRvcCA9IFwiMFwiO1xyXG5jYW52YXMuc3R5bGUubGVmdCA9IFwiNTAlXCI7XHJcbmNhbnZhcy5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVgoLTUwJSlcIjtcclxuY2FudmFzLnN0eWxlLnpJbmRleCA9IFwiMVwiO1xyXG5jYW52YXMuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xyXG5sZXQgZHJhdztcclxuXHJcbmNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbnBsdWdpbi5vbkxvYWQoKHNlbGZQbHVnaW4pID0+IHtcclxuXHRcclxuXHRiZXR0ZXJuY20udXRpbHMud2FpdEZvckVsZW1lbnQoXCIuZy1zaW5nbGVcIikudGhlbigobWFpblBsYXllcikgPT4ge1xyXG5cdFx0bWFpblBsYXllci5hcHBlbmRDaGlsZChjYW52YXMpO1xyXG5cdFx0d2luZG93Lm9ucmVzaXplID0gKCkgPT4ge1xyXG5cdFx0XHRjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuXHRcdFx0Y2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHRcdH1cclxuXHR9KTtcclxuXHRcclxuXHRiZXR0ZXJuY20udXRpbHMud2FpdEZvckVsZW1lbnQoXCIuYnRucFwiKS50aGVuKChidG4pID0+IHtcclxuXHRcdGxvYWRlZFBsdWdpbnMuTGliRnJvbnRlbmRQbGF5LmFkZEV2ZW50TGlzdGVuZXIoXHJcblx0XHRcdFwidXBkYXRlQ3VycmVudEF1ZGlvUGxheWVyXCIsXHJcblx0XHRcdChlKSA9PiB7XHJcblx0XHRcdFx0bGV0IGN1cnJlbnRUYXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQ7XHJcblx0XHRcdFx0Ly8gXHU1MjA2XHU2NzkwXHU1NjY4XHJcblx0XHRcdFx0bGV0IGN1cnJlbnRBdWRpb0FuYWx5c2VyID0gY3VycmVudFRhcmdldC5jdXJyZW50QXVkaW9BbmFseXNlclxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGRyYXcgPSBuZXcgRHJhdyhjdXJyZW50QXVkaW9BbmFseXNlciwgY3R4KTtcclxuXHRcdFx0XHRkcmF3LmRyYXdCYXIoKTtcclxuXHRcdFx0XHQvLyBkcmF3LmRyYXdMaW5lKCk7XHJcblx0XHRcdH0sXHJcblx0XHQpO1xyXG5cdH0pO1xyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFBTyxXQUFTLFNBQVE7QUFDcEIsV0FDSSxrQkFBQyxhQUFJLGNBQUU7QUFBQSxFQUVmOzs7QUNKTyxNQUFNLE9BQU4sTUFBVztBQUFBLElBTWpCLFlBQVksVUFBd0JBLE1BQStCO0FBQ2xFLFdBQUssWUFBWTtBQUNqQixXQUFLLE9BQU9BO0FBQ1osV0FBSyxnQkFBZ0IsS0FBSyxVQUFVO0FBQ3BDLFdBQUssYUFBYSxJQUFJLFdBQVcsS0FBSyxhQUFhO0FBQ25ELFdBQUssVUFBVSxVQUFVO0FBQUEsSUFDMUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUtBLFVBQVU7QUFDVCw0QkFBc0IsS0FBSyxRQUFRLEtBQUssSUFBSSxDQUFDO0FBQzdDLFdBQUssVUFBVSxxQkFBcUIsS0FBSyxVQUFVO0FBR25ELFdBQUssS0FBSyxVQUFVLEdBQUcsR0FBRyxLQUFLLEtBQUssT0FBTyxPQUFPLEtBQUssS0FBSyxPQUFPLE1BQU07QUFFekUsV0FBSyxLQUFLLFlBQVk7QUFDdEIsV0FBSyxLQUFLLFNBQVMsR0FBRyxHQUFHLEtBQUssS0FBSyxPQUFPLE9BQU8sS0FBSyxLQUFLLE9BQU8sTUFBTTtBQUd4RSxZQUFNLFdBQVksS0FBSyxLQUFLLE9BQU8sUUFBUSxLQUFLLGdCQUFpQjtBQUNqRSxVQUFJLElBQUk7QUFFUixlQUFTLElBQUksR0FBRyxJQUFJLEtBQUssZUFBZSxLQUFLO0FBQzVDLGNBQU0sWUFBWSxLQUFLLFdBQVcsQ0FBQztBQUduQyxZQUFJLFdBQVcsS0FBSyxLQUFLO0FBQUEsVUFDeEIsS0FBSyxLQUFLLE9BQU8sUUFBUTtBQUFBLFVBQ3pCLEtBQUssS0FBSyxPQUFPLFNBQVM7QUFBQSxVQUMxQjtBQUFBLFVBQ0EsS0FBSyxLQUFLLE9BQU8sUUFBUTtBQUFBLFVBQ3pCLEtBQUssS0FBSyxPQUFPLFNBQVM7QUFBQSxVQUMxQixLQUFLLEtBQUssT0FBTyxRQUFRO0FBQUEsUUFDMUI7QUFFQSxpQkFBUyxhQUFhLEdBQUcseUJBQXlCO0FBQ2xELGlCQUFTLGFBQWEsR0FBRyxzQkFBc0IsWUFBWSxNQUFNO0FBQ2pFLGFBQUssS0FBSyxZQUFVO0FBRXBCLGFBQUssS0FBSyxTQUFTLEdBQUcsS0FBSyxLQUFLLE9BQU8sU0FBUyxXQUFXLFVBQVUsU0FBUztBQUU5RSxhQUFLLFdBQVc7QUFBQSxNQUNqQjtBQUFBLElBQ0Q7QUFBQSxFQUNEOzs7QUNsREEsU0FBTyxTQUFTLE1BQU07QUFDckIsVUFBTSxVQUFVLFNBQVMsY0FBYyxLQUFLO0FBQzVDLGFBQVMsT0FBTyxPQUFPLEdBQUcsT0FBTztBQUNqQyxXQUFPO0FBQUEsRUFDUixDQUFDO0FBR0QsTUFBTSxTQUFTLFNBQVMsY0FBYyxRQUFRO0FBQzlDLFNBQU8sUUFBUSxPQUFPO0FBQ3RCLFNBQU8sU0FBUyxPQUFPO0FBQ3ZCLFNBQU8sTUFBTSxXQUFXO0FBQ3hCLFNBQU8sTUFBTSxNQUFNO0FBQ25CLFNBQU8sTUFBTSxPQUFPO0FBQ3BCLFNBQU8sTUFBTSxZQUFZO0FBQ3pCLFNBQU8sTUFBTSxTQUFTO0FBQ3RCLFNBQU8sTUFBTSxnQkFBZ0I7QUFDN0IsTUFBSTtBQUVKLE1BQU0sTUFBTSxPQUFPLFdBQVcsSUFBSTtBQUNsQyxTQUFPLE9BQU8sQ0FBQyxlQUFlO0FBRTdCLGNBQVUsTUFBTSxlQUFlLFdBQVcsRUFBRSxLQUFLLENBQUMsZUFBZTtBQUNoRSxpQkFBVyxZQUFZLE1BQU07QUFDN0IsYUFBTyxXQUFXLE1BQU07QUFDdkIsZUFBTyxRQUFRLE9BQU87QUFDdEIsZUFBTyxTQUFTLE9BQU87QUFBQSxNQUN4QjtBQUFBLElBQ0QsQ0FBQztBQUVELGNBQVUsTUFBTSxlQUFlLE9BQU8sRUFBRSxLQUFLLENBQUMsUUFBUTtBQUNyRCxvQkFBYyxnQkFBZ0I7QUFBQSxRQUM3QjtBQUFBLFFBQ0EsQ0FBQyxNQUFNO0FBQ04sY0FBSSxnQkFBZ0IsRUFBRTtBQUV0QixjQUFJLHVCQUF1QixjQUFjO0FBRXpDLGlCQUFPLElBQUksS0FBSyxzQkFBc0IsR0FBRztBQUN6QyxlQUFLLFFBQVE7QUFBQSxRQUVkO0FBQUEsTUFDRDtBQUFBLElBQ0QsQ0FBQztBQUFBLEVBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsiY3R4Il0KfQo=
