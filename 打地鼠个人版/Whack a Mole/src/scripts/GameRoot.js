import MoleCtrl from "./MoleCtrl";
import HummerCtrl from "./HummerCtrl";
import UICtrl from "./UICtrl";

export default class GameRoot extends Laya.Script {

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
        // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
    }
    onAwake() {
        Laya.Scene3D.load("res/scene/LayaScene_Main/Conventional/Main.ls", Laya.Handler.create(this, this.onLoadSceneFinish));
        
    }
    //场景加载完成之后的回调方法，参数：加载完成后的场景
    onLoadSceneFinish(loadScene) {
        Laya.stage.designHeight  = 600;
        Laya.stage.designWidth = 240;

        this.bgm = Laya.SoundManager.playMusic("https://dadishu.oss-cn-beijing.aliyuncs.com/bgm.mp3", 0);
        this.bgm.volume = 0;

        Laya.stage.on("gamestart", this, function () {
            this.bgm.volume = 0.4;
        });
        Laya.stage.on("bgm", this, function (a) {
            if (a) {
                this.bgm.volume = 0.4;
            } else {
                this.bgm.volume = 0;
            }

        });
        Laya.stage.on("pause", this, function (a) {

            if (a) {
                this.bgm.pause();
                console.log(8888);
            } else {
                this.bgm.resume();
                console.log(7777);
            }

        });

        loadScene.zOrder = -1;
        Laya.stage.addChild(loadScene);
        var moles = loadScene.getChildByName("Moles");
        for (var i = 0; i < moles.numChildren; i++) {
            moles.getChildAt(i).getChildAt(0).addComponent(MoleCtrl);
        }

        var effect = loadScene.getChildByName("Explosion");
        //制作特效预制体
        var effectPrefab = Laya.Sprite3D.instantiate(effect);
        effect.active = false;

        //获取场景中的摄像机
        var camera = loadScene.getChildByName("Main Camera");

        //获取锤子
        loadScene.getChildByName("Hummer").addComponent(HummerCtrl).Init(camera, loadScene, effectPrefab);
        this.owner.getComponent(UICtrl).init(camera);


        let txt = new Laya.Text();
        txt.text = "文本添加";
        txt.color = "#0ff0ff";
        // txt.bgColor = "#000000";
        txt.width = 300;
        txt.height = 200;
        txt.font = "宋体";
        txt.fontSize  =60;
        txt.align ="center";
        txt.x = Laya.stage.width/2;
        txt.y = Laya.stage.height/2;
        Laya.stage.addChild(txt);

        let textInput = new Laya.TextInput("1");
        //设置文本自动换行
        textInput.wordWrap = true;
        textInput.fontSize = 30;
        console.log(textInput);
        Laya.stage.addChild(textInput);
        
        
    }
}