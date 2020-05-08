export default class MoleCtrl extends Laya.Script {

    constructor() { 
        super();
        this.isUp=false;
        this.isDown=false;
        this.timer=0;
        this.gamestart=true;
    }
    onAwake(){
        this.randomUp();
       Laya.stage.on("gamestart",this,function()
       {
           this.gamestart=true;
       });
    }
    onUpdate(){
        if(this.gamestart)
        {
            if(this.isUp){
                //沿着y轴正方向移动
                this.owner.transform.translate(new Laya.Vector3(0,0.1,0));
                if(this.owner.transform.localPosition.y>=2.5){
                    this.isUp=false;
                    this.owner.transform.localPosition=new Laya.Vector3(0,2.5,0);
                    //延时调用
                    Laya.stage.timerOnce(1000,this,function(){this.isDown=true;});
                }
                this.timer=0;
            }
            if(this.isDown){
                this.owner.transform.translate(new Laya.Vector3(0,-0.1,0));
                if(this.owner.transform.localPosition.y<=0){
                    this.isDown=false;
                    this.owner.transform.localPosition=new Laya.Vector3();
                    this.randomUp();
                }
                this.timer=0;
            }
            if(this.isDown==false &&this.isUp==false)
            {
                 this.timer+=Laya.timer.delta;
                 if(this.timer>=6000)
                 {
                     this.timer=0;
                     this.isUp=true;
                 }
            }
        }
        
    }
    randomUp(){
        var value=Math.random();
        Laya.stage.timerOnce(value*6000,this,function(){this.isUp=true;});
    }
    //当地鼠被敲击之后调用
    Knock(){
        this.owner.transform.localPosition=new Laya.Vector3();
        this.isUp=false;
        this.isDown=false;
        
    }
}