export default class Home extends Laya.Script {

    constructor() {
        super();
    }

    /**
     * 组件激活后执行
     */
    onAwake(){
        // this.button1.on(Laya.Event.CLICK,this,this._$changePIC);
        console.log(this.owner);
        console.log(this.button1)
    }
    /**
     * upData之前,onAwake之后
     */
    onStart(){
        Laya.Scene.load("game")
    }
    /**
     * 启用
     */
    onEnable() {       
    }
    /**
     * 禁用
     */
    onDisable() {
    }
    /**
     * 每一帧都会执行
     */
    onUpdate(){

    }
    /**
     * updata之后执行
     */
    onLateUpdate(){

    }
   
    
    _$changePIC(eve){
        console.log(eve);
        this.spr1.visible = false;

    }
}