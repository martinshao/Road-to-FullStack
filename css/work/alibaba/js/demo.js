console.info(ArcProgress);

const customText = [{ text: '', size: '12px', color: '#000', x: 142, y: 102 }];

const arcProgress = new ArcProgress({
  el: "#progress-container",
  progress: .78,
  speed: 20,
  text: '2980801',
  size: 68,
  fillColor: '#0070CC',
  thickness: 3,
  customText,
  textStyle: {
    size: "12px",
    color: "#000000"
  },
  arcStart: -90,
  arcEnd: 270,
  emptyColor: "#ebf4f8",
  observer(e, t) {
    console.log('observer the animation', e, t);
  },
  animationEnd: function (t) {
    var e = t.progress;
    setTimeout(function () {
      .7826 === e ? arcProgress.updateProgress({
        progress: .3423,
        text: "34.23"
      }) : .3423 === e && arcProgress.updateProgress({
        progress: .8016,
        text: "80.16"
      })
    }, 500)
  }
});