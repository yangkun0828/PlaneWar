var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var bgMap = (function (_super) {
    __extends(bgMap, _super);
    function bgMap() {
        var _this = _super.call(this) || this;
        /**控制滚动速度*/
        _this.speed = 2;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    //初始化
    bgMap.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        var texture = RES.getRes("background_png");
        this.textureHeight = texture.textureHeight; //保留原始纹理的高度，用于后续的计算
        this.rowCount = Math.ceil(this.stageH / this.textureHeight) + 1; //计算在当前屏幕中，需要的图片数量
        this.bmpArr = [];
        //创建这些图片，并设置y坐标，让它们连接起来
        for (var i = 0; i < this.rowCount; i++) {
            var bgBmp = new egret.Bitmap(texture);
            bgBmp.y = this.textureHeight * i - (this.textureHeight * this.rowCount - this.stageH);
            this.bmpArr.push(bgBmp);
            this.addChild(bgBmp);
            this.start();
        }
    };
    //开始滚动
    bgMap.prototype.start = function () {
        // this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    //逐帧运动
    bgMap.prototype.enterFrameHandler = function (event) {
        for (var i = 0; i < this.rowCount; i++) {
            var bgBmp = this.bmpArr[i];
            bgBmp.y += this.speed;
            //判断超出屏幕后，回到队首，这样来实现循环反复
            if (bgBmp.y > this.stageH) {
                bgBmp.y = this.bmpArr[0].y - this.textureHeight;
                this.bmpArr.pop();
                this.bmpArr.unshift(bgBmp);
            }
        }
    };
    //暂停滚动
    bgMap.prototype.pause = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    return bgMap;
}(egret.DisplayObjectContainer));
__reflect(bgMap.prototype, "bgMap");
//# sourceMappingURL=bgMap.js.map