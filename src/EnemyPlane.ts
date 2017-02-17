class EnemyPlane extends egret.Sprite {

	private enemyPlane: egret.Bitmap;
	private enemyBoom: egret.Bitmap;
	public blood: number;
	public type: number;

	public constructor(_type?: number) {
        super();
		this.type = _type;
		this.creatPlane(this.type);
	}

	//创建小敌机
	public creatPlane(type: number): void {
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
	}
	public beHit(): void {
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
	}
	//移除的时候，处理自己内部的一些事，比如说移除侦听，图片移除	
	public destroy(): void {
		egret.Tween.removeTweens(this);
		GameUtil.remove_Child(this.enemyPlane);
	}
}