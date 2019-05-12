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

    @property(cc.Prefab)
    modeCarList:cc.Prefab [] = [] // 敌人车模型数组

    @property(cc.Prefab)
    modeGoldList:cc.Prefab [] = [] // 金币
    carleftDirection:boolean = false
    carRightDirection:boolean = true
    carBeforeDirection:boolean = false
    carAfterDirection:boolean = false
    speed:number = 10


    speedothercar:number = 6
    
    @property(cc.Node)
    carLeft:cc.Node = undefined

    @property(cc.Node)
    carRight:cc.Node = undefined

    @property(cc.Node)
    gameEndLayer:cc.Node = undefined

    @property(cc.Node)
    gamePauseLayer:cc.Node = undefined


    @property(cc.Node)
    bg:cc.Node = undefined

    @property(cc.Label)
    scoreLabel:cc.Label = undefined

    @property(cc.Node)
    bg1:cc.Node = undefined

    otherCarParent:cc.Node = undefined

    goldParent:cc.Node = undefined

    timeCount:number = 0

    gameOver:boolean = false

    gamePause:boolean = false

    carPosList:number[] = []

    goldPosList:number[] = []

    gameScore:number = 0

    gameGoldNum:number = 0

    goldList:cc.Node[] = []

    protected callbackmusic:any = null


    @property({type:cc.AudioClip})
    protected bgmusic = null;        // 背景音乐

    @property({type:cc.AudioClip})
    protected hitmusic = null;       // hit音乐

    @property({type:cc.AudioClip})
    protected gameovermusic = null;  // 失败音乐

    @property({type:cc.AudioClip})
    protected  gameEatMusic = null    // 引挚音乐

    onLoad(){

        cc.audioEngine.playMusic(this.bgmusic,true)

        var manager = cc.director.getCollisionManager();
        manager.enabled = true

        this.init()
        this.upDateTimeCount()
        cc.director.on('gameover',this.gameOverFun,this)

        cc.director.on('collins',this.goldCollins,this)

        cc.director.on('continu',this.continueGame,this)

        this.callbackmusic = event=>{

                let play = event.detail.play

                if(play)
                {
                    // audio.play()
                    cc.audioEngine.setMusicVolume(1)
                }else{
                    
                    // audio.stop()
                    cc.audioEngine.setMusicVolume(0)

                }


        }


        cc.director.on('change_music',this.callbackmusic,this)

    }

    continueGame()
    {

        this.gamePause = false
        this.gamePauseLayer.active = false


    }
    pauseGame(){

            if(this.gameOver)
            {

                return
            }

            this.gamePause = true
            this.gamePauseLayer.active = true

    }
    testMethod(event,car)
    {
        let vara = event
        let varb = car


    }
    goldCollins(other)
    {

            console.log('金币碰撞了')

            let coinnode:cc.Node = other.gold
            let index = this.goldList.indexOf(coinnode)

            this.goldList.splice(index,1)

            let goldIconPos = this.node.getChildByName("allNode").getChildByName("goldicon").getPosition()
            let wgoldPos = this.node.convertToWorldSpaceAR(goldIconPos)
            let lgoldPos = coinnode.parent.convertToNodeSpaceAR(wgoldPos)
            cc.audioEngine.play(this.gameEatMusic,false,1)
            coinnode.runAction(cc.sequence(cc.moveTo(0.5,lgoldPos),cc.callFunc(()=>{

                    coinnode.destroy()
                    this.gameGoldNum += 1
                    this.upDateGold()

            })))

    }
    gameOverFun(event)
    {
        let act1 = cc.moveBy(0.1,cc.p(-16,0))
        let act2 = cc.moveBy(0.1,cc.p(16,0))
        let act3 = cc.sequence(act1,act2)
        let act4 = cc.repeat(act3,4)
        this.node.getChildByName("allNode").runAction(act4)
        this.gameOver = true
        this.showGameEndLayer()
        cc.audioEngine.play(this.hitmusic,false,1)
        cc.audioEngine.play(this.gameovermusic,false,1)

    }
    gamePauseFun(event)
    {

        

    }
    init()
    {
        this.otherCarParent = this.node.getChildByName("allNode").getChildByName("otherCarParent")
        this.goldParent = this.node.getChildByName("allNode").getChildByName("goldParent")
        this.carPosList[0] = -281
        this.carPosList[1] = -88
        this.carPosList[2] = 105
        this.carPosList[3] = 293
    
        this.goldPosList[0] = -279
        this.goldPosList[1] = -90
        this.goldPosList[2] = 105
        this.goldPosList[3] = 291
       // this.onEvent()
        this.onKeyboardEvent()

    }
    showGameEndLayer()
    {
        this.gameEndLayer.active = true
        this.gameEndLayer.getComponent("gameEndLayer").setHightScore(Math.round(this.gameScore / 2))
        this.gameEndLayer.getComponent("gameEndLayer").setCurentScore(Math.round(this.gameScore / 2))

    }
    onEvent()
    {
        let leftbut = this.node.getChildByName("allNode").getChildByName("btn_screen_left")
        leftbut.on(cc.Node.EventType.TOUCH_START,function(){

                this.carleftDirection = true

        },this)
        leftbut.on(cc.Node.EventType.TOUCH_END,function(){

                 this.carleftDirection = false
                 console.log('左边按钮结束'+this.speed)
        },this)
        leftbut.on(cc.Node.EventType.TOUCH_CANCEL,function(){

                 this.carleftDirection = false
                 console.log('左边按钮取消'+this.speed)

        },this)
        let rightbut = this.node.getChildByName("allNode").getChildByName("btn_screen_right")

        rightbut.on(cc.Node.EventType.TOUCH_START,function(){

            this.carRightDirection = false
            console.log("右边按钮开始")

        },this)

        rightbut.on(cc.Node.EventType.TOUCH_END,function(){

                this.carRightDirection = true
                console.log("右边按钮结束" + this.speed)

        },this)

        rightbut.on(cc.Node.EventType.TOUCH_CANCEL,function(){

                this.carRightDirection = true
                console.log("右边按钮取消" + this.speed)

        },this)

    }

     start(){



     }
     update(dt){

            if(this.gameOver || this.gamePause)
            {

                    return
            }

            this.myCarMove()
            this.bgMove()

            this.otherCarMove()
            this.goldCarMove()
        //    this.createGold()
            this.addScore()

            this.timeCount -= 1
            if(this.timeCount  == 0)
            {
                this.upDateTimeCount()
                this.createCar()

            }
     }
     myCarMove()
     {

        if(this.carleftDirection)
        {
            let pos = this.carLeft.getPosition()
            pos.x = pos.x - this.speed
            if(pos.x <= -160)
            {
                pos.x = -160
            }

            this.carLeft.setPosition(pos)
        }
        else
        {
            let pos = this.carLeft.getPosition()
            pos.x = pos.x + this.speed
            if(pos.x >= -88)
            {

                pos.x = -88
            }

            this.carLeft.setPosition(pos)
        }

        if(this.carRightDirection)
        {
            let pos = this.carRight.getPosition()
            pos.x = pos.x - this.speed
            if(pos.x <= 105)
            {

                pos.x = 105
            }
            this.carRight.setPosition(pos)
        }
        else
        {
           let  pos = this.carRight.getPosition()
            pos.x = pos.x + this.speed
            if(pos.x >= 160)
            {
                pos.x = 160
            }
            this.carRight.setPosition(pos)

        }

    


     }
     onKeyDown (event) {
        // set a flag when key pressed
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                    
             this.carleftDirection = true
                break;
            case cc.macro.KEY.d:
            this.carRightDirection = false
                break;
            case cc.macro.KEY.w:
            this.carBeforeDirection = true   
                break;
             case cc.macro.KEY.s:
                
                break;
        }
    }

    onKeyUp (event) {
        // unset a flag when key released
        switch(event.keyCode) {
            case cc.macro.KEY.a:
            this.carleftDirection = false

                break;
            case cc.macro.KEY.d:
            this.carRightDirection = true
                break;
            case cc.macro.KEY.w:
            this.carBeforeDirection = false                
                break;
             case cc.macro.KEY.s:
            this.carAfterDirection = false
                break;
        }
    }

     onKeyboardEvent(){

            // 初始化键盘输入监听
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);  

     }
     destoryKeyboard(){

         // 取消键盘输入监听
         cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
         cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

     }
     otherCarMove()
     {
        let children = this.otherCarParent.children
        for(let v of children)
        {
            v.y -= this.speedothercar
            if(v.y <= -cc.winSize.height - v.getContentSize().height)
            {

                    v.removeFromParent()
                    v.destroy()
            }

        }

     }
     goldCarMove()
     {
        let children = this.goldList
        for(let v of children)
        {
            v.y -= this.speedothercar
            if(v.y <= -cc.winSize.height - v.getContentSize().height)
            {
            
                    let index = this.goldList.indexOf(v)
                    this.goldList.splice(index,1)
                    v.destroy()
            }


        }

     }
     bgMove()
     {
        
       
        if(this.carBeforeDirection){
            this.bg.y -= this.speedothercar * 2
            this.bg1.y -= this.speedothercar * 2

        }else if(this.carAfterDirection){

            this.bg.y -= this.speedothercar * 0.6
            this.bg1.y -= this.speedothercar * 0.6
        }else{

            this.bg.y -= this.speedothercar * 1.2
            this.bg1.y -= this.speedothercar * 1.2

        }
        
    
        if(this.bg.y <= -cc.winSize.height)
        {
            this.bg.y = this.bg1.y + cc.winSize.height

        }
        if(this.bg1.y <= -cc.winSize.height)
        {
            this.bg1.y = this.bg.y + cc.winSize.height

        }
     }
       createCar()
       {
            let index = Math.random() * 2
            index = Math.floor(index)

             let index1 = Math.round(Math.random() * (3 - 2) + 2)


                //  随机一个车的形状出来 

                let modeindex = Math.floor(Math.random() * this.modeCarList.length)
                let car = cc.instantiate(this.modeCarList[modeindex])
                this.otherCarParent.addChild(car)
                this.setCarPos(index,car)
       
       
                let modeindex1 = Math.floor(Math.random() * this.modeCarList.length)
                let car1 = cc.instantiate(this.modeCarList[modeindex1])    
                this.otherCarParent.addChild(car1)
                this.setCarPos(index1,car1)


            {

                //   let children  =  this.otherCarParent.children  
                //   let lastCar = children[children.length - 1] 
                  let randdis = Math.random() * 100 + 100


                  let index = Math.random() * 4
                  index = Math.floor(index)
                  
                  let modeindex = Math.floor(Math.random() * this.modeGoldList.length)
                  let gold = cc.instantiate(this.modeGoldList[modeindex])
                  this.goldParent.addChild(gold)

                  gold.x = this.goldPosList[index]
                  gold.y = randdis

                 if(index % 2 == 0){

                    gold.x = 160

                     }else{

                     gold.x = -160
                 }

                  let wordpos = this.otherCarParent.convertToWorldSpaceAR(cc.p(gold.x,gold.y))

                  let nodpos = this.goldParent.convertToNodeSpaceAR(wordpos)
                  gold.position = nodpos
                  this.goldList.push(gold)
            }


        }

        setCarPos(index,Node)
        {
                let xpos = this.carPosList[index]
                let yposy = cc.winSize.height + 200
                Node.setPosition(cc.v2(xpos,yposy))
        }

        createGold()
        {
      
   
            let modeindex1 = Math.floor(Math.random() * this.modeCarList.length)
            let car1 = cc.instantiate(this.modeCarList[modeindex1])    

            let randdis = Math.random() * 100 + 100


            let index = Math.random() * 4
            index = Math.floor(index)
            
            let modeindex = Math.floor(Math.random() * this.modeGoldList.length)
            let gold = cc.instantiate(this.modeGoldList[modeindex])
            this.goldParent.addChild(gold)

            gold.x = this.goldPosList[index]
            gold.y = car1.y + randdis

            let wordpos = this.otherCarParent.convertToWorldSpaceAR(cc.p(gold.x,gold.y))

            let nodpos = this.goldParent.convertToNodeSpaceAR(wordpos)
            gold.position = nodpos
            this.goldList.push(gold)

        }


        upDateTimeCount()
        {
        
                this.timeCount = Math.floor(Math.random() * 30 + 50)

        }

        upDateScore()
        {

            this.scoreLabel.getComponent(cc.Label).string = (this.gameScore / 2).toString()

        }
        onDestroy()
        {

            cc.director.off("gameover",this.gameOverFun,this)
            cc.director.off("collins",this.goldCollins,this)
            cc.director.off("continue",this.continueGame,this)
            cc.director.off("change_music",this.callbackmusic,this)
        }

        addScore()
        {

               let children = this.otherCarParent.children
               for(let v of children)
                {
                    if(v.y <= this.carLeft.getPosition().y -  this.carLeft.getContentSize().height / 2 - v.getContentSize().height / 2)
                    {
                       
                        this.gameScore += 1
                        if(this.gameScore % 20 == 0)
                        {
                            this.speedothercar += 1

                        }
                     }

                }
                if(this.gameScore % 2 == 0)
                {

                      this.upDateScore()

                }                


        }

        upDateGold()
        {

            this.node.getChildByName("allNode").getChildByName("label_gold").getComponent(cc.Label).string = this.gameGoldNum.toString()

        }

}
