class Bullet extends egret.Sprite{

	public myBullet:egret.Bitmap;//子弹
	public constructor() {
		super();
		this.creatBullet();
	}
//生成子弹
	private creatBullet():void{
		this.myBullet=GameUtil.createBitmapByName("bullet1_png");
		this.addChild(this.myBullet);
	}
//移除子弹
	public removeBullet(): void {
		egret.Tween.removeTweens(this);
		GameUtil.remove_Child(this);
	}
}