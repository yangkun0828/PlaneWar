var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super.apply(this, arguments) || this;
    }
    /**
     * 加载进度界面
     * loading process interface
     */
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        Common.stage = this.stage;
        var resM = new ResourceManger();
        resM.startLoad(this.startCreateScene);
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.startCreateScene = function () {
        var main = new mainPage();
        Common.stage.addChild(main);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map