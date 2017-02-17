var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MyPlane = (function (_super) {
    __extends(MyPlane, _super);
    function MyPlane() {
        var _this = _super.call(this) || this;
        _this.creatPlane();
        return _this;
    }
    MyPlane.prototype.creatPlane = function () {
        this.myPlane = new egret.Bitmap(RES.getRes("PlaneImg_json.hero_fly1"));
        this.addChild(this.myPlane);
    };
    MyPlane.prototype.beHit = function () {
        this.planeBoom = GameUtil.createBitmapByName("hero_down3_png");
        this.addChild(this.planeBoom);
    };
    return MyPlane;
}(egret.Sprite));
__reflect(MyPlane.prototype, "MyPlane");
//# sourceMappingURL=MyPlane.js.map