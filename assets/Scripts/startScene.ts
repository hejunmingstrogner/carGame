// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    

    @property({type:cc.AudioClip})
    bgmuisc = null;
 

    @property(cc.Node)
    helpLayer:cc.Node = null;
  

    onLoad(){
           
            cc.audioEngine.playMusic(this.bgmuisc,true)
            this.createCar()
    
    }
    adsd(){

    }
    @property(cc.Node)
    roadPosList:cc.Node [] = [];

    // 敌人车模型数组
    @property(cc.Prefab)
    modeCarList:cc.Prefab [] = [];

    start(){

         let s = cc.sys.localStorage
         let str = s.getItem('music')

        if(str == '1' || !str){

            cc.audioEngine.setMusicVolume(1)

        }else if(str == '0'){

             cc.audioEngine.setMusicVolume(0)
        }

    }
    
    startGameCallBack()
    {
       cc.director.loadScene('gameScene')

    }

    helpCalBack()
    {

        this.helpLayer.active = true

    }


    createCar()
    {
        let indexpos = Math.random() * 4
        indexpos = Math.floor(indexpos)
        let indexcar = Math.floor(Math.random()* 7)

        let car = cc.instantiate(this.modeCarList[indexcar])
        
        car.setPosition(this.roadPosList[indexpos].getPosition())

         car.y -= 200

         this.node.getChildByName('carParent').addChild(car)

         car.runAction(cc.sequence(cc.moveBy(1,cc.v2(0,cc.winSize.height)),cc.callFunc(()=>{

                this.createCar()
                car.destroy()

         })))

    }

}
