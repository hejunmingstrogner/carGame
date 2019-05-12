


 const {ccclass,property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component{

     @property(cc.Label)
     label:cc.Label = null;


      setCurentScore(score:number)
      {
          this.node.getChildByName("curRentScore").getComponent(cc.Label).string = score.toString()
          let highscore = 0
           if(cc.sys.localStorage.getItem("highscore"))
            {
                highscore = parseInt(cc.sys.localStorage.getItem("highscore"))

            }
            let temscore = score > highscore ? score : highscore
            cc.sys.localStorage.setItem("highscore",temscore)
      }
      setHightScore(score:number)
      {
            let hightscore = cc.sys.localStorage.getItem("highscore")
            let temscore = score > hightscore  ? score : hightscore
             this.node.getChildByName("highScore").getComponent(cc.Label).string = temscore.toString()

      }

      reStarCallBack()
      {
         cc.director.loadScene("gameScene")

      }
      homeCallBack()
      {

         cc.director.loadScene("startScene")
      }

}


