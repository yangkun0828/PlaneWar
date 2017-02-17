var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mainPage = (function (_super) {
    __extends(mainPage, _super);
    function mainPage() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/startP.exml";
        _this.showbutton1();
        return _this;
    }
    mainPage.prototype.showbutton1 = function () {
        var button1 = new egret.Bitmap(RES.getRes("PlaneImg_json.开始按钮"));
        button1.x = 120;
        button1.y = 700;
        this.addChild(button1);
        button1.touchEnabled = true;
        button1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_begin, this);
    };
    mainPage.prototype.onclick_begin = function () {
        var play = new GameControl();
        this.parent.addChild(play);
        this.parent.removeChild(this);
    };
    return mainPage;
}(eui.Component));
__reflect(mainPage.prototype, "mainPage");
//# sourceMappingURL=mainPage.js.map