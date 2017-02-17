class mainPage extends eui.Component{
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/startP.exml";
		this.showbutton1();

	}
		private showbutton1():void{
			var button1:egret.Bitmap =  new egret.Bitmap(RES.getRes("PlaneImg_json.开始按钮"));
			button1.x = 120;
			button1.y = 700;
			this.addChild(button1);
			button1.touchEnabled=true;
			button1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_begin,this);
		} 
		private onclick_begin(){
			var play:GameControl= new GameControl();
			this.parent.addChild(play);
			this.parent.removeChild(this);
		}
}