var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameControl = (function (_super) {
    __extends(GameControl, _super);
    function GameControl() {
        var _this = _super.call(this) || this;
        _this.speed = 3000;
        _this.score = new egret.TextField(); //分数
        _this.enemyBFightersTimer = new egret.Timer(8000); //生成大敌机的时间间隔	
        _this.bulletTimer = new egret.Timer(200); //生成子弹的时间间隔
        _this.sound = new Sound(); //创建声音
        //背景滚动
        _this.bg = new bgMap();
        _this.addChild(_this.bg);
        _this.once(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    GameControl.prototype.init = function () {
        this.addPlane(); //创建本机
        this.creatTimer(); //创建小敌机
        this.bulletTimer.addEventListener(egret.TimerEvent.TIMER, this.addBullet, this); //创建子弹
        this.enemyBFightersTimer.addEventListener(egret.TimerEvent.TIMER, this.creatBigEnemy, this); //创建大敌机	
        this.bulletTimer.start();
        this.enemyBFightersTimer.start();
        this.addEventListener(egret.Event.ENTER_FRAME, this.gameHitTest, this); //侦听碰撞
        this.addEventListener(egret.Event.ENTER_FRAME, this.scoreShow, this); //侦听分数
    };
    //生成敌机速度越来越快
    GameControl.prototype.creatTimer = function () {
        if (GameControl.scoreNum <= 100000) {
            this.creatSpeed = 400;
        }
        else if (GameControl.scoreNum > 100000 && GameControl.scoreNum <= 200000) {
            this.creatSpeed = 300;
        }
        else if (GameControl.scoreNum > 200000) {
            this.creatSpeed = 200;
        }
        this.enemyFightersTimer = new egret.Timer(this.creatSpeed, 0);
        this.enemyFightersTimer.addEventListener(egret.TimerEvent.TIMER, this.creatEnemy, this);
        this.enemyFightersTimer.start();
    };
    //生成飞机
    GameControl.prototype.addPlane = function () {
        this.myP = new MyPlane();
        this.addChild(this.myP);
        this.myP.x = 180;
        this.myP.y = 1000;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
    };
    //鼠标拖动
    GameControl.prototype.touchMove = function (e) {
        this.myP.x = e.localX - this.myP.width * 0.5;
        this.myP.y = e.localY - this.myP.height * 0.5;
    };
    //生成子弹，运动轨迹
    GameControl.prototype.addBullet = function () {
        var bul = new Bullet();
        this.addChild(bul);
        bul.x = this.myP.x + 45;
        bul.y = this.myP.y;
        GameControl.bulletArr.push(bul);
        egret.Tween.get(bul)
            .to({ y: bul.y - 1100 }, 1200, egret.Ease.sineIn).call(this.removeBullet.bind(this), bul, [bul]);
        this.sound.bullet_S();
    };
    //删除子弹
    GameControl.prototype.removeBullet = function (bullet) {
        var index = -1;
        for (var i = GameControl.bulletArr.length - 1; i >= 0; i--) {
            if (GameControl.bulletArr[i] == bullet) {
                index = i;
            }
        }
        if (bullet && bullet.parent) {
            bullet.parent.removeChild(bullet);
            if (index != -1)
                GameControl.bulletArr.splice(index, 1);
        }
    };
    //生成敌机
    GameControl.prototype.creatEnemy = function () {
        var enemy1 = new EnemyPlane(1);
        this.addChild(enemy1);
        var position = Math.floor(Math.random() * 420); //随机位置
        enemy1.x = position;
        enemy1.y = -50;
        GameControl.enemyFighters.push(enemy1);
        this.speed -= 5;
        egret.Tween.get(enemy1)
            .to({ y: 1200 }, this.speed, egret.Ease.sineIn)
            .call(this.removeEnemy, enemy1, [enemy1]);
    };
    //生成大敌机
    GameControl.prototype.creatBigEnemy = function () {
        var enemy2 = new EnemyPlane(2);
        this.addChild(enemy2);
        var position = Math.floor(Math.random() * 320); //随机位置
        enemy2.x = position;
        enemy2.y = -300;
        GameControl.enemyFighters.push(enemy2);
        egret.Tween.get(enemy2)
            .to({ y: 1200 }, 6000, egret.Ease.sineIn)
            .call(this.removeEnemy, enemy2, [enemy2]);
    };
    //删除敌机
    GameControl.prototype.removeEnemy = function (ePlane) {
        var index = -1;
        for (var i = 0; i <= GameControl.enemyFighters.length; i++) {
            if (GameControl.enemyFighters[i] == ePlane) {
                index = i;
            }
        }
        if (ePlane && ePlane.parent) {
            ePlane.parent.removeChild(ePlane);
            if (index != -1)
                GameControl.enemyFighters.splice(index, 1);
        }
    };
    //碰撞方法
    GameControl.prototype.gameHitTest = function () {
        //我的子弹碰撞
        for (var i = GameControl.bulletArr.length - 1; i >= 0; i--) {
            var bullet = GameControl.bulletArr[i];
            //子弹与敌机的碰撞
            for (var j = GameControl.enemyFighters.length - 1; j >= 0; j--) {
                var theFighter = GameControl.enemyFighters[j];
                if (GameUtil.hitTest(theFighter, bullet)) {
                    theFighter.beHit();
                    bullet.removeBullet();
                    // this.scoreNum += 1000;
                    if (bullet) {
                        GameControl.bulletArr.splice(i, 1);
                    }
                    if (theFighter.blood <= 0) {
                        GameControl.enemyFighters.splice(j, 1);
                    }
                    i--;
                    break;
                }
                if (GameUtil.hitTest(theFighter, this.myP)) {
                    this.gameOver();
                }
            }
        }
    };
    //分数
    GameControl.prototype.scoreShow = function () {
        this.score.text = "你的分数：" + GameControl.scoreNum;
        this.score.x = 10;
        this.score.y = 10;
        this.addChild(this.score);
    };
    //游戏结束
    GameControl.prototype.gameOver = function () {
        var _this = this;
        this.sound.game_over(); //爆炸声音
        //移除所有侦听和动画
        this.bg.pause();
        this.myP.beHit();
        egret.Tween.removeAllTweens();
        this.bulletTimer.removeEventListener(egret.TimerEvent.TIMER, this.addBullet, this);
        this.enemyFightersTimer.removeEventListener(egret.TimerEvent.TIMER, this.creatEnemy, this);
        this.enemyBFightersTimer.removeEventListener(egret.TimerEvent.TIMER, this.creatBigEnemy, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.gameHitTest, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.scoreShow, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        GameControl.bulletArr = []; //清空子弹数组
        GameControl.enemyFighters = []; //清空敌机数组
        //背景图
        var initGame = GameUtil.createBitmapByName("分数_png");
        this.addChild(initGame);
        initGame.x = 45;
        initGame.y = 400;
        //显示最后分数
        var btntxt = new egret.TextField();
        btntxt.background = false;
        btntxt.fontFamily = "楷体";
        btntxt.textColor = 0x465976;
        btntxt.size = 35;
        btntxt.textAlign = "center";
        btntxt.width = 200;
        btntxt.height = 50;
        btntxt.x = 130;
        btntxt.y = 550;
        btntxt.text = "" + GameControl.scoreNum;
        this.addChild(btntxt);
        initGame.touchEnabled = true;
        initGame.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //重新开始
            GameControl.scoreNum = 0;
            var main = new mainPage();
            _this.parent.addChild(main);
            _this.parent.removeChild(_this);
        }, this);
    };
    return GameControl;
}(egret.DisplayObjectContainer));
GameControl.scoreNum = 0;
GameControl.bulletArr = []; //创建子弹数组
GameControl.enemyFighters = []; //创建敌机数组
__reflect(GameControl.prototype, "GameControl");
//# sourceMappingURL=GameControl.js.map