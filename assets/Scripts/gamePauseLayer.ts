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


    @property(cc.Node)
    btn_music_close: cc.Node = null;

    @property(cc.Node)
    btn_music_open:cc.Node = null;

     onLoad(){

          let s = cc.sys.localStorage
          let str = s.getItem("music")
          let show = false

        if(str == "1" || !str){

            this.btn_music_open.active = false
            this.btn_music_close.active = true

        }else if(str == "0"){

            this.btn_music_open.active = true
            this.btn_music_close.active = false

        }
        
     }

     btn_music_open_callback()
     {
         this.btn_music_open.active = false
         this.btn_music_close.active = true
         let s = cc.sys.localStorage

          s.setItem("music","1")
          cc.director.emit("change_music",{player:true})
     }
     btn_music_close_callback()
     {
          this.btn_music_open.active = true
          this.btn_music_close.active = false

          let s = cc.sys.localStorage

           s.setItem("music","0")
           cc.director.emit("change_music",{play:true})
     }
         start(){


        }

        reStarCallBack()
        {
             cc.director.loadScene("gameScene")
         }
     
         homeCallBack()
         {
            cc.director.loadScene("startScene")
         }
         continueCallBack()
         {
             cc.director.emit("continue")
         }

}
