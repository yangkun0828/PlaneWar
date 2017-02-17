var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this = _super.call(this) || this;
        _this.creatBullet();
        return _this;
    }
    //生成子弹
    Bullet.prototype.creatBullet = function () {
        this.myBullet = GameUtil.createBitmapByName("bullet1_png");
        this.addChild(this.myBullet);
    };
    //移除子弹
    Bullet.prototype.removeBullet = function () {
        egret.Tween.removeTweens(this);
        GameUtil.remove_Child(this);
    };
    return Bullet;
}(egret.Sprite));
__reflect(Bullet.prototype, "Bullet");
//# sourceMappingURL=Bullet.js.map