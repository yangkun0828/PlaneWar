class MyPlane extends egret.Sprite {
	private myPlane: egret.Bitmap;
	private planeBoom: egret.Bitmap;
	public constructor() {
        super();
		this.creatPlane();
	}
	private creatPlane(): void {
		this.myPlane = new egret.Bitmap(RES.getRes("PlaneImg_json.hero_fly1"));
		this.addChild(this.myPlane);
	}
	public beHit(): void {
		this.planeBoom =  GameUtil.createBitmapByName("hero_down3_png");
		this.addChild(this.planeBoom);
	}
}
