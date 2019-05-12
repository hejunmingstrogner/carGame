
// import gameScene  from "./gameScene"


const {ccclass,property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component{


        @property(cc.Label)
        label:cc.Label = null;

        @property
        text: string = 'hello';

      //  _gameManager:gameScene = null;
        onLoad(){

            var manager = cc.director.getCollisionManager();
            manager.enabled = true
           // this._gameManager=cc.find("Canvas").getComponent(gameScene)     
        }

        start(){


        }

        onCollisionEnter(other,self){

                cc.director.emit("collins",{gold:this.node});
             //   this._gameManager.goldCollins(this.node)
        }

        /**
         *   当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
         *      @param {Collider} other 产生碰撞的另一个碰撞组件
         *      @param {Collider} self 产生碰撞的自身的碰撞组件
         */
        onCollisionStay(other,self){

                console.log('on collision stay');
        }
        
        /**
         *   当碰撞结束后调用
         *  @param {Collider} other 产生碰撞的另一个碰撞组件
         *  @param {Collider} self  产生碰撞的自身的组件
         */
        onCollisionExit(other,self){
             console.log('on collision exit');

        }

}