// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.fillStyle.parse.hsla-clamp-4
// Description:
// Note:<p class="notes">

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

  var canvas = new OffscreenCanvas(100, 50);
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = '#f00';
  ctx.fillStyle = 'hsla(120, 100%, -200%, 1)';
  ctx.fillRect(0, 0, 100, 50);
  _assertPixel(canvas, 50,25, 0,0,0,255);
  t.done();
});
done();
