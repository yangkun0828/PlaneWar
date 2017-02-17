var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EnemyPlane = (function (_super) {
    __extends(EnemyPlane, _super);
    function EnemyPlane(_type) {
        var _this = _super.call(this) || this;
        _this.type = _type;
        _this.creatPlane(_this.type);
        return _this;
    }
    //创建小敌机
    EnemyPlane.prototype.creatPlane = function (type) {
        switch (this.type) {
            case 1:
                this.enemyPlane = new egret.Bitmap(RES.getRes("PlaneImg_json.enemy1_fly1"));
                this.blood = 1;
                break;
            case 2:
                this.enemyPlane = new egret.Bitmap(RES.getRes("PlaneImg_json.enemy3_fly1"));
                this.blood = 7;
                break;
        }
        this.addChild(this.enemyPlane);
    };
    EnemyPlane.prototype.beHit = function () {
        this.blood--;
        //血量为0时处理
        if (this.blood <= 0) {
            this.destroy();
            switch (this.type) {
                case 1:
                    this.enemyBoom = new egret.Bitmap(RES.getRes("PlaneImg_json.enemy1_down3"));
                    GameControl.scoreNum += 1000;
                    break;
                case 2:
                    this.enemyBoom = GameUtil.createBitmapByName("enemy3_down4_png");
                    GameControl.scoreNum += 30000;
                    break;
            }
            this.addChild(this.enemyBoom);
            egret.Tween.get(this.enemyBoom)
                .to({ x: 15 }, 50, egret.Ease.sineIn).to({ x: -15 }, 100, egret.Ease.sineIn).to({ x: 0 }, 50, egret.Ease.sineIn)
                .call(GameUtil.remove_Child, this, [this]);
        }
    };
    //移除的时候，处理自己内部的一些事，比如说移除侦听，图片移除	
    EnemyPlane.prototype.destroy = function () {
        egret.Tween.removeTweens(this);
        GameUtil.remove_Child(this.enemyPlane);
    };
    return EnemyPlane;
}(egret.Sprite));
__reflect(EnemyPlane.prototype, "EnemyPlane");
//# sourceMappingURL=EnemyPlane.js.map