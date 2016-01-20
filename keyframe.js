/**
 * useage:
 * var k = keyframe();
 * k.load($("wrapper"),"your-url",frames,0.1,[0.5,0.5])
 */
define('shop:page/pc/home/lib/keyframes.js', function(require, exports, module){
    module.exports = function(){
        return {
            _currentFrame: 1,
            _timer: null,
            _scales: [],
            load: function (container, imgUrl, frames, interval, achor) {
                var self = this;
                this._$container = $(container);
                this._frames = frames;
                this._interval = interval * 1000;
                this._scales = scales;

                var w = self._$container.width();
                var h = self._$container.height();
                var offset = self._$container.position();
                this._cx1 = self._scales[0] * w + offset.left;
                this._cy1 = self._scales[1] * h + offset.top;
                this._offset = offset;

                var imgObj = new Image();
                $(imgObj).on("load", function () {
                    var currentFrame = self._frames[self._currentFrame++];
                    var pos = self.calPos(currentFrame.w, currentFrame.h)
                    self._$container.css("background", "url(" + imgUrl + ") no-repeat 0 0");
                    self._$container.css({
                        top: pos.y,
                        left: pos.x,
                        width: currentFrame.w,
                        height: currentFrame.h,
                        backgroundPosition: (-1 * currentFrame.x) + "px " + (-1 * currentFrame.y) + "px"
                    });
                    self.start();
                });

                imgObj.src = imgUrl;
            },
            calPos: function (w, h) {
                var gx = this._cx1 - this._scales[0] * w;
                var gy = this._cy1 - this._scales[1] * h;

                return {
                    x: gx,
                    y: gy
                };
            },
            start: function () {
                var self = this;
                setTimeout(function () {
                    var index = (self._currentFrame++) % self._frames.length;
                    var frame = self._frames[index];
                    var pos = self.calPos(frame.w, frame.h);
                    self._$container.css({
                        top: pos.y,
                        left: pos.x,
                        width: frame.w,
                        height: frame.h,
                        backgroundPosition: (-1 * frame.x) + "px " + (-1 * frame.y) + "px"
                    });
                    self.start();
                }, this._interval);
            }
        };
    }
});
