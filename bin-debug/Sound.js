var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Sound = (function (_super) {
    __extends(Sound, _super);
    function Sound() {
        return _super.call(this) || this;
    }
    //子弹声音
    Sound.prototype.bullet_S = function () {
        this.bulletSound = new egret.Sound();
        this.bulletSound.load("resource/assets/bullet.mp3");
        this.bulletSound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
    };
    //小飞机爆炸声音
    Sound.prototype.enemy1_S = function () {
        this.enemy1Sound = new egret.Sound();
        this.enemy1Sound.load("resource/assets/enemy1_down.mp3");
        this.enemy1Sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
    };
    //大飞机爆炸声音
    Sound.prototype.enemy3_S = function () {
        this.enemy3Sound = new egret.Sound();
        this.enemy3Sound.load("resource/assets/enemy3_down.mp3");
        this.enemy3Sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
    };
    //游戏结束声音
    Sound.prototype.game_over = function () {
        this.over = new egret.Sound();
        this.over.load("resource/assets/game_over.mp3");
        this.over.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
    };
    //播放声音
    Sound.prototype.onLoadComplete = function (event) {
        //获取加载到的 Sound 对象
        var sound = event.target;
        //播放音乐
        var channel = sound.play(0, 1);
    };
    return Sound;
}(egret.DisplayObjectContainer));
__reflect(Sound.prototype, "Sound");
//# sourceMappingURL=Sound.js.map