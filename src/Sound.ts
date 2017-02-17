class Sound extends egret.DisplayObjectContainer{
	public bulletSound:egret.Sound;
	public enemy1Sound:egret.Sound;
	public enemy3Sound:egret.Sound;
	public over:egret.Sound;

	public constructor() {
		super();
	}
	//子弹声音
	public bullet_S():void {
        this.bulletSound = new egret.Sound();
        this.bulletSound.load("resource/assets/bullet.mp3");
        this.bulletSound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);      
    }
	//小飞机爆炸声音
	public enemy1_S():void {
        this.enemy1Sound = new egret.Sound();
        this.enemy1Sound.load("resource/assets/enemy1_down.mp3");
        this.enemy1Sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);      
    }
	//大飞机爆炸声音
	public enemy3_S():void {
        this.enemy3Sound = new egret.Sound();
        this.enemy3Sound.load("resource/assets/enemy3_down.mp3");
        this.enemy3Sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);      
    }
	//游戏结束声音
	public game_over():void {
        this.over = new egret.Sound();
        this.over.load("resource/assets/game_over.mp3");
        this.over.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);      
    }
    //播放声音
    private onLoadComplete(event:egret.Event):void {
        //获取加载到的 Sound 对象
        var sound:egret.Sound = <egret.Sound>event.target;
        //播放音乐
        var channel:egret.SoundChannel = sound.play(0,1);
    }
}
 