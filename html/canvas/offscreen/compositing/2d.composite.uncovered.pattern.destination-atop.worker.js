// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.composite.uncovered.pattern.destination-atop
// Description:Pattern fill() draws pixels not covered by the source object as (0,0,0,0), and does not leave the pixels unchanged.
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("Pattern fill() draws pixels not covered by the source object as (0,0,0,0), and does not leave the pixels unchanged.");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

  var canvas = new OffscreenCanvas(100, 50);
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
  ctx.fillRect(0, 0, 100, 50);
  ctx.globalCompositeOperation = 'destination-atop';
  var promise = new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", '/images/yellow.png');
      xhr.responseType = 'blob';
      xhr.send();
      xhr.onload = function() {
          resolve(xhr.response);
      };
  });
  promise.then(function(response) {
      createImageBitmap(response).then(bitmap => {
          ctx.fillStyle = ctx.createPattern(bitmap, 'no-repeat');
          ctx.fillRect(0, 50, 100, 50);
          _assertPixelApprox(canvas, 50,25, 0,0,0,0, 5);
      }, t_fail);
  }).then(t_pass, t_fail);
});
done();
