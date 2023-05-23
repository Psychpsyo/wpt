// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.text.draw.space.collapse.start
// Description:Space characters at the start of a line are collapsed (per CSS)
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("Space characters at the start of a line are collapsed (per CSS)");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

  var canvas = new OffscreenCanvas(100, 50);
  var ctx = canvas.getContext('2d');

  var f = new FontFace("CanvasTest", "url('/fonts/CanvasTest.ttf')");
  let fonts = (self.fonts ? self.fonts : document.fonts);
  f.load();
  fonts.add(f);
  fonts.ready.then(function() {
      ctx.font = '50px CanvasTest';
      ctx.fillStyle = '#f00';
      ctx.fillRect(0, 0, 100, 50);
      ctx.fillStyle = '#0f0';
      ctx.fillText(' EE', 0, 37.5);
      _assertPixelApprox(canvas, 25,25, 0,255,0,255, 2);
      _assertPixelApprox(canvas, 75,25, 0,255,0,255, 2);
    }).then(t_pass, t_fail);
});
done();
