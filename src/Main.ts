class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    protected createChildren(): void {
        super.createChildren();
        Common.stage = this.stage;
        var resM:ResourceManger = new ResourceManger();
        resM.startLoad(this.startCreateScene);
       
    }
   
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void {
       var main:mainPage=new mainPage();
       Common.stage.addChild(main);      
    }


}
