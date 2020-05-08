export default class startSence extends Laya.Script {

    constructor() {
        super();
        /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
        let intType = 1000;
        /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
        let numType = 1000;
        /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
        let strType = "hello laya";
        /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
        let boolType = true;
        let btnResart = null;
        // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
    }
    //组件激活使用
    onAwake() {
        Laya.Scene3D.load("res/sence/LayaScene_layaMain/Conventional/layaMain.lh", Laya.Handler.create(this, this.loadEnd));

        //按钮被点击的时候
        // Laya.
    }

    loadEnd(res) {
        if (res) {
            console.log("加载成功");
            Laya.stage.addChild(res);
        } else {
            console.log(path);
        }
    }


    onEnable() {}

    onDisable() {}
}