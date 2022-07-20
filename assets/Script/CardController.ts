import GameManager from "./GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    public originPos = null;
    public originRot = null;
    public originZindex = null;

    public cardIndex = null;

    public centerx = 0;
    public centery = 0;
    public distance = 50;

    public checkTouch = false;
    public checkCollision = false;
    static getComponent: any;

    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);

        let card = cc.director.getCollisionManager();
        card.enabled = true;
        card.enabledDebugDraw = false;
        card.enabledDrawBoundingBox = false;

        // luu vi tri ban dau cua card
        this.originPos = this.node.position; 
    }

    onTouchStart(event) {
        this.originPos = this.node.position;
        this.originRot = -this.node.angle;
        this.originZindex = this.node.zIndex;
        this.setIndex(10);
        this.node.scale = 0.6;
        this.node.angle = 0;
        
    }
    onTouchMove(event) {
        this.node.scale = 0.6;
        let delta = event.touch.getDelta();
        this.node.x += delta.x;
        this.node.y += delta.y;
    }
    // onTouchCancel(event) {
    //     this.node.setPosition(this.originPos);
    // }
    onTouchEnd(event) {
        this.node.scale = 0.45;
        this.checkTouch = true;
        // this.returnIndex(this.node);

        if (this.checkCollision && this.checkTouch){                                                                         
            // console.log("checkConll1 " + this.checkCollision);
            GameManager.instance.addCardPlayBoard(this.node);
            // this.returnIndex(this.node);

            // this.moveToBoardZone();

            this.checkCollision = false;
            this.checkTouch = false;
        }
        if (this.checkCollision == false && this.checkTouch){
            // this.node.setPosition(this.originPos);
            // this.node.setRotation(this.originRot);
            this.setIndex(10);
            this.moveToHandZone();
            this.returnIndex(this.node);            
        }

    } 

    onCollisionEnter(self : any, other: any){
        // console.log('on collision enter');
        this.checkCollision = true;     
    } 
    onCollisionStay(self : any, other: any){
    } 
    onCollisionExit(self : any, other: any){
        this.checkCollision = false;
    }

    moveStartToHandZone(x : number,y : number,i : number){

        cc.tween(this.node)
        .to(0.45, {scale: 0.45, position: cc.v3(x +25*i, y+25 , 0),angle:-(-10+i*5)})
        .to(0.45, {scale: 0.45, position: cc.v3(x +25*i, y , 0),angle:-(-10+i*5)})
        .start();

    }

    moveToHandZone(){
        cc.tween(this.node)
        .to(0.1, {scale: 0.45, position: cc.v3(this.originPos),angle:-this.originRot})
        .start();

    }

    // Move when sort card
    moveToCenter(){
        cc.tween(this.node)
        .to(0.5, {scale: 0.45, position: cc.v3(this.centerx , 0, 0),angle:0})
        .start();
    }

    moveToLeft(i : number, length : number){
        cc.tween(this.node)
        .to(0.5, {scale: 0.45, position: cc.v3(this.centerx - (((length/2)-i) *125) + 50, 0, 0),angle:0})
        // .call(() => { console.log(i + " move to " + this.node.x) })
        .start();
    }

    moveToRight(i : number, length : number){
        cc.tween(this.node)
        .to(0.5, {scale: 0.45, position: cc.v3(this.centerx + ((i-((length/2)) +1) *125) - 50, 0, 0),angle:0})
        // .call(() => { console.log(i + " move to " + this.node.x) })
        .start();
    }


    setIndex(index: number){
        this.node.zIndex = index;
    }

    count(count :number){
        this.cardIndex = count;
    }

    returnIndex(node){
        this.node.zIndex = this.originZindex ;
    }
}