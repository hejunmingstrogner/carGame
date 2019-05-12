



const {ccclass,property} = cc._decorator;


@ccclass
export default class NewClass extends cc.Component  {

     @property(cc.Label)
     label:cc.Label = null;

     @property
     text:string = 'hello';


     onLoad(){

          var manager = cc.director.getCollisionManager();
          manager.enabled = true

     }

     start(){


     }

     onCollisionEnter(other,self){

           // console.log('on collision enter');

            //  碰撞系统会计算出碰撞组件在世界坐标系下的相关的值，并放到 world 这个属性里面
            var world = self.world;

            // 碰撞组件的 aabb 碰撞框
            var aabb = world.aabb;

            // 节点碰撞前上一帧 aabb 碰撞框的位置
            var preAabb = world.preAabb

            // 碰撞框的世界矩阵
            var t = world.transform;

            // 以下属性为圆形碰撞组件特有属性
            var r = world.radius;
            var p = world.position;

            //  以下属性为 矩形和 多边形 碰撞组件特有属性

            var ps = world.points;
           // console.log("---------------------------------------碰撞到了"); 

             if(other.node.group === "otherCar")
             {
            
                  cc.director.emit("gameover");

             }else{



             }


     }

     /**
      *     当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
      *     @param {collider} other  产生碰撞的另一个碰撞组件 
      *     @param {collider} self   产生碰撞的自身的碰撞组件
      * */

     onCollisionStay(other,self){

        //  console.log('on collision stay');

     }


     /**
      *      当碰撞结束后调用
      *      @param {collider} other 产生碰撞的另一个碰撞组件
      *      @param {collider} self  产生碰撞的自身的碰撞组件
      *  */
     onCollisionExit(other,self){
         //   console.log('on collision exit')
     }


}