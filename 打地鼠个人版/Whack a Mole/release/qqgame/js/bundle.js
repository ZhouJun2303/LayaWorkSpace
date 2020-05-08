!function(){"use strict";class t extends Laya.Script{constructor(){super(),this.isUp=!1,this.isDown=!1}onAwake(){this.randomUp()}onUpdate(){this.isUp&&(this.owner.transform.translate(new Laya.Vector3(0,.1,0)),this.owner.transform.localPosition.y>=2.5&&(this.isUp=!1,this.owner.transform.localPosition=new Laya.Vector3(0,2.5,0),Laya.stage.timerOnce(1e3,this,function(){this.isDown=!0}))),this.isDown&&(this.owner.transform.translate(new Laya.Vector3(0,-.1,0)),this.owner.transform.localPosition.y<=0&&(this.isDown=!1,this.owner.transform.localPosition=new Laya.Vector3,this.randomUp()))}randomUp(){var t=Math.random();Laya.stage.timerOnce(6e3*t,this,function(){this.isUp=!0})}Knock(){this.owner.transform.localPosition=new Laya.Vector3,this.isUp=!1,this.isDown=!1}}class e extends Laya.Script{constructor(){super()}onAwake(){Laya.stage.timerOnce(2e3,this,function(){this.owner.destroy()})}}class a extends Laya.Script{constructor(){super()}Init(t,e,a){this.camera=t,this.scene=e,this.physicsSimulation=e.physicsSimulation,this.effect=a}onAwake(){this.ray=new Laya.Ray(new Laya.Vector3,new Laya.Vector3),this.hitResult=new Laya.HitResult,Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onDown),Laya.stage.on("GameOver",this,function(){this.isGameOver=!0}),Laya.stage.on("AgainGame",this,function(){this.isGameOver=!1})}onDown(){this.isGameOver||(this.camera.viewportPointToRay(new Laya.Vector2(Laya.stage.mouseX,Laya.stage.mouseY),this.ray),this.physicsSimulation.rayCast(this.ray,this.hitResult)&&this.hitResult.collider.owner.transform.localPosition.y>=2&&(this.targetPos=this.hitResult.collider.owner.transform.position,this.targetPos.y=.35,this.owner.transform.position=new Laya.Vector3(this.targetPos.x,7,this.targetPos.z),Laya.Tween.to(this.owner.transform,{localPositionX:this.targetPos.x,localPositionY:this.targetPos.y,localPositionZ:this.targetPos.z},100,Laya.Ease.linearIn,Laya.Handler.create(this,function(){this.hitResult.collider.owner.getComponent(t).Knock();var a=Laya.Sprite3D.instantiate(this.effect,this.scene);a.transform.position=this.targetPos,a.addComponent(e),Laya.stage.event("AddScore"),Laya.SoundManager.playSound("https://dadishu.oss-cn-beijing.aliyuncs.com/hit.mp3"),Laya.Tween.to(this.owner.transform,{localPositionX:this.targetPos.x,localPositionY:7,localPositionZ:this.targetPos.z},100,Laya.Ease.linearIn,Laya.Handler.create(this,function(){}),0,!0)}),0,!0)))}}class s extends Laya.Script{constructor(){super()}onAwake(){Laya.Scene3D.load("res/scene/LayaScene_Main/Conventional/Main.ls",Laya.Handler.create(this,this.onLoadSceneFinish))}onLoadSceneFinish(e){Laya.SoundManager.playMusic("https://dadishu.oss-cn-beijing.aliyuncs.com/bgm.mp3",0),e.zOrder=-1,Laya.stage.addChild(e);for(var s=e.getChildByName("Moles"),i=0;i<s.numChildren;i++)s.getChildAt(i).getChildAt(0).addComponent(t);var n=e.getChildByName("Explosion"),o=Laya.Sprite3D.instantiate(n);n.active=!1;var r=e.getChildByName("Main Camera");e.getChildByName("Hummer").addComponent(a).Init(r,e,o)}}class i extends Laya.Script{constructor(){super(),this.txt_Time=null,this.txt_Score=null,this.gameoverPanel=null,this.btn_Again=null}onAwake(){this.btn_Again.on(Laya.Event.CLICK,this,this.againGame),this.score=0,this.timer=0,this.time=60,Laya.stage.on("AddScore",this,this.addScore)}addScore(){this.score++,this.txt_Score.text="Score:"+this.score}onUpdate(){this.time<=0&&this.gameover(),this.timer+=Laya.timer.delta/1e3,this.timer>=1&&(this.timer=0,this.time--,this.txt_Time.text="Time:"+this.time+"s")}gameover(){this.txt_Score.visible=!1,this.txt_Time.visible=!1,this.gameoverPanel.visible=!0,Laya.stage.event("GameOver")}againGame(){this.txt_Score.visible=!0,this.txt_Time.visible=!0,this.gameoverPanel.visible=!1,this.timer=0,this.time=60,this.txt_Time.text="Time:"+this.time+"s",this.score=0,this.txt_Score.text="Score:"+this.score,Laya.stage.event("AgainGame")}}class n{static init(){let t=Laya.ClassUtils.regClass;t("scripts/GameRoot.js",s),t("scripts/UICtrl.js",i)}}n.width=1920,n.height=1080,n.scaleMode="fixedheight",n.screenMode="horizontal",n.alignV="middle",n.alignH="center",n.startScene="GameRoot.scene",n.sceneRoot="",n.debug=!1,n.stat=!1,n.physicsDebug=!1,n.exportSceneToJson=!0,n.init();new class{constructor(){window.Laya3D?Laya3D.init(n.width,n.height):Laya.init(n.width,n.height,Laya.WebGL),Laya.Physics&&Laya.Physics.enable(),Laya.DebugPanel&&Laya.DebugPanel.enable(),Laya.stage.scaleMode=n.scaleMode,Laya.stage.screenMode=n.screenMode,Laya.stage.alignV=n.alignV,Laya.stage.alignH=n.alignH,Laya.URL.exportSceneToJson=n.exportSceneToJson,(n.debug||"true"==Laya.Utils.getQueryString("debug"))&&Laya.enableDebugPanel(),n.physicsDebug&&Laya.PhysicsDebugDraw&&Laya.PhysicsDebugDraw.enable(),n.stat&&Laya.Stat.show(),Laya.alertGlobalError=!0,Laya.ResourceVersion.enable("version.json",Laya.Handler.create(this,this.onVersionLoaded),Laya.ResourceVersion.FILENAME_VERSION)}onVersionLoaded(){Laya.AtlasInfoManager.enable("fileconfig.json",Laya.Handler.create(this,this.onConfigLoaded))}onConfigLoaded(){n.startScene&&Laya.Scene.open(n.startScene)}}}();