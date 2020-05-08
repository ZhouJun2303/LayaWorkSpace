export default class UICtrl extends Laya.Script {

    constructor() { 
        super();
        /** @prop {name:txt_Time, tips:"倒计时显示文本", type:Node, default:null}*/
        this.txt_Time=null;
        /** @prop {name:txt_Score, tips:"成绩显示文本", type:Node, default:null}*/
        this.txt_Score=null;
        /** @prop {name:gameoverPanel, tips:"游戏结束", type:Node, default:null}*/
        this.gameoverPanel=null;
        /** @prop {name:btn_Again, tips:"再来一局按钮", type:Node, default:null}*/

        
        /** @prop {name:gamestartPanel, tips:"再来一局按钮", type:Node, default:null}*/
        this.gamestartPanel=null;
        /** @prop {name:gamepanel, tips:"再来一局按钮", type:Node, default:null}*/
        this.gamepanel=null;
        /** @prop {name:overpanel, tips:"再来一局按钮", type:Node, default:null}*/
        this.overpanel=null;


        /** @prop {name:addscore, tips:"再来一局按钮", type:Prefab, default:null}*/
        this.addscore=null;


        /** @prop {name:startBT, tips:"再来一局按钮", type:Node, default:null}*/
        this.startBT=null;

        /** @prop {name:pauseBT, tips:"再来一局按钮", type:Node, default:null}*/
        this.pauseBT=null;

        /** @prop {name:hscore, tips:"再来一局按钮", type:Node, default:null}*/
        this.hscore=null;

        /** @prop {name:settingBT, tips:"再来一局按钮", type:Node, default:null}*/
        this.settingBT=null;
        /** @prop {name:soundBT, tips:"再来一局按钮", type:Node, default:null}*/
        this.soundBT=null;
        /** @prop {name:BGMBT, tips:"再来一局按钮", type:Node, default:null}*/
        this.BGMBT=null;

        /** @prop {name:ExitBT, tips:"再来一局按钮", type:Node, default:null}*/
        this.ExitBT=null;
        /** @prop {name:settingPanel, tips:"再来一局按钮", type:Node, default:null}*/
        this.settingPanel=null;
        /** @prop {name:testButton, tips:"再来一局按钮", type:Node, default:null}*/
        this.testButton=null;

       


        this.btn_Again=null;
    //    this.bgm=true;

    }
    init(camera)
    {
        this.camera=camera;
    }
    onAwake(){

      
        this.pause=false;
        this.hscore.text="Highest:"+Laya.LocalStorage.getItem("hscore");
        this.settingBT.on(Laya.Event.CLICK,this,function()
        {
            //显示设置页面
            this.settingPanel.visible=true;
        });
        this.ExitBT.on(Laya.Event.CLICK,this,function()
        {
            this.settingPanel.visible=false;
        });
        this.BGMBT.on(Laya.Event.CLICK,this,function()
        {        
            Laya.stage.event("bgm",this.BGMBT.selected);
            
        });
        this.soundBT.on(Laya.Event.CLICK,this,function()
        {
            Laya.stage.event("sound",this.soundBT.selected);
        });

        this.pauseBT.on(Laya.Event.CLICK,this,function()
        {
            if(this.pause)
            {
                Laya.timer.scale=1;
                this.pause=false;
                this.pauseBT.skin="comp/pause2.png";
                Laya.stage.event("pause",this.pause);
            }else
            {

                Laya.timer.scale=0;
                this.pause=true;
               //暂停游戏  更换为开始的图标
               this.pauseBT.skin="comp/pause1.png";
               Laya.stage.event("pause",this.pause);
            }
        });

        this.testButton.on(Laya.Event.CLICK,this,(e)=>{
            console.log("textButton点击");
            console.log(e);
        })
        this.pos1=new Laya.Vector3();
        //监听再来一局按钮按下
        this.btn_Again.on(Laya.Event.CLICK,this,this.againGame);
        this.score=0;
        //计时器
        this.timer=0;
        this.time=20;
        //侦听器，侦听AddScore事件类型广播
        Laya.stage.on("AddScore",this,this.addScore);
        this.gamepanel.visible=false;
        this.overpanel.visible=false;
        this.gamestartPanel.visible=true;
        this.gamestart=false;
        this.startBT.on(Laya.Event.CLICK,this,function()
        {
            Laya.stage.event("gamestart");
        });
        Laya.stage.on("gamestart",this,function()
        {
            this.gamepanel.visible=true;        
            this.gamestartPanel.visible=false;
            this.gamestart=true;
            
           
        });
    }
    //增加成绩
    addScore(pos){
        this.score++;
        this.txt_Score.text="Score:"+this.score;
        Laya.Node

       var temp= Laya.Pool.getItemByCreateFun("addscore",function()
        {
           return this.addscore.create();
        },this);
        Laya.stage.addChild(temp);     
        
        this.camera.worldToViewportPoint(pos,this.pos1);
        temp.pos(this.pos1.x,this.pos1.y);


        Laya.Tween.to(temp,{y:this.pos1.y-100},300,Laya.Ease.backIn,Laya.Handler.create
            (
                this,function()
                {
                    temp.removeSelf();
                    Laya.Pool.recover("addscore",temp);
                }
            ),100)

    }
    onUpdate(){
        //倒计时结束，游戏结束
        if(this.gamestart)
        {
            if(this.time<=0){
                this.gameover();
            }
            this.timer+=(Laya.timer.delta/1000);
            if(this.timer>=1){
                this.timer=0;
                this.time--;
                this.txt_Time.text="Time:"+this.time+"s";
            }
        }
       
    }
    //游戏结束
    gameover(){
        this.txt_Score.visible=false;
        this.txt_Time.visible=false;
        //this.gameoverPanel.visible=true;
        this.overpanel.visible=true;
        Laya.stage.event("GameOver");
        Laya.LocalStorage.setItem("hscore",this.score);
    }
    //再来一局按钮按下
    againGame(){
        this.hscore.text="Highest:"+Laya.LocalStorage.getItem("hscore");
        this.txt_Score.visible=true;
        this.txt_Time.visible=true;
        this.overpanel.visible=false;
        this.timer=0;
        this.time=20;
        this.txt_Time.text="Time:"+this.time+"s";
        this.score=0;
        this.txt_Score.text="Score:"+this.score;
        //派发AgainGame事件码
        Laya.stage.event("AgainGame");
    }
}