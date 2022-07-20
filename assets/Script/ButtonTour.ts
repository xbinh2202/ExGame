// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property(cc.Button)
    // My_Button : cc.Button = null;

    onLoad () {
        cc.director.preloadScene("Tournament");
        this.node.on("touchstart", function(){
        cc.director.loadScene("Tournament");
        });
    }

}
