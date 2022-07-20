import CardController from "./CardController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
    static addCardPlayBoard(node: cc.Node) {
        throw new Error("Method not implemented.");
    }

    @property(cc.Node)
    playHandZone: cc.Node = null;

    @property(cc.Node)
    board:cc.Node = null;

    @property(cc.Prefab)
    prefab: cc.Prefab = null;

    public static instance: GameManager = null!;

    public lengthBoard = 0;
    public originPositionx = null;
    public originPositiony = null;

    public lengthHand = 0;

    public cardCenter = 0;
    public centerx = 0;
    public centery = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        GameManager.instance = this;

        this.addCardPlayHandZone();
        
    }

    addCardPlayHandZone(){
        // so luong card trong hand
        this.lengthHand = 8;

        for (let i=0; i<this.lengthHand; i++){
            let prefab = cc.instantiate(this.prefab);
            this.playHandZone.addChild(prefab);

            let width = prefab.getContentSize().width/4 * i/2;

            // chinh sua toa do x cua card
            let ControlPosx : number = 100; 
            let ControlPosy : number = 240* 2;

            this.originPositionx = prefab.position.x;
            this.originPositiony = prefab.position.y;

            prefab.setPosition(cc.v3(prefab.position.x - ControlPosx + width, prefab.position.y - ControlPosy, prefab.position.z )); 

            // this.schedule(function() {
            //     // Here this refers to component
            //     prefab.getComponent(CardController).moveStart(this.originPositionx + width, this.originPositiony,i);
            // },1);

            // set time moi card len cach nhau 200ms
            setTimeout(() => {
                prefab.getComponent(CardController).moveStartToHandZone(this.originPositionx - ControlPosx +  width,this.originPositiony-255,i);
            }, 200*i) 

            prefab.getComponent(CardController).setIndex(i);
        }
    }

    addCardPlayBoard(card: cc.Node){
        // add card vao BoardZone
        card.parent = this.board; 

        card.getComponent(CardController).count(this.lengthBoard);
        
        // dem card vao BoardZone
        this.lengthBoard += 1; 
        
        // dem card con lai trong HandZone
        this.lengthHand -= 1;
        // console.log(this.lengthHand);

        this.sortCardHandZone();
        this.sortCardBoardZone();
    }

    sortCardHandZone(){
        let center = (this.lengthHand/2 + 0.5) - 1;
        // console.log("center " + center);
        const cardRange = 50;
        // console.log("range " + cardRange);
        if(this.lengthHand % 2 == 0){
            for (let i = 0; i < this.lengthHand; i++){  
                if (i < center){
                    cc.tween(this.playHandZone.children[i])
                    .to(0.5, {scale: 0.45, position: cc.v3(-cardRange * (center - i), 0 - 255, 0),angle:+(center - i)*5})
                    .start();
                }
                if (i > center){
                    cc.tween(this.playHandZone.children[i])
                    .to(0.5, {scale: 0.45, position: cc.v3(cardRange * (i - center), 0 - 255, 0),angle:-(i - center)*5})
                    .start();
                }   
            }
            // console.log("haven't card center");
        }
        if(this.lengthHand % 2 != 0){
            for (let i = 0; i < this.lengthHand; i++){
                if (i < center){
                    cc.tween(this.playHandZone.children[i])
                    .to(0.5, {scale: 0.45, position: cc.v3(cardRange * (i - center), 0 - 255, 0),angle:-(i - center)*5})
                    .start();
                }
                if (i == center){
                    cc.tween(this.playHandZone.children[i])
                    .to(0.5, {scale: 0.45, position: cc.v3(0, 0 - 255, 0),angle:0})
                    .start();
                }
                if (i > center){
                    cc.tween(this.playHandZone.children[i])
                    .to(0.5, {scale: 0.45, position: cc.v3(cardRange * (i - center), 0 - 255, 0),angle:-(i - center)*5})
                    .start();
                }
            }
            // console.log("have card center")
        }
    }

    sortCardBoardZone(){
        if (this.lengthBoard % 2 == 0){
            for (let i = 0; i < this.lengthBoard; i++){
                if (i < this.cardCenter){                  
                    this.board.children[i].getComponent(CardController).moveToLeft(i, this.lengthBoard);
                } 
                if (i > this.cardCenter){
                    this.board.children[i].getComponent(CardController).moveToRight(i, this.lengthBoard);
                }
                // console.log("not have center");
            }
        }
        if (this.lengthBoard % 2 != 0 ){
            for (let i = 0; i < this.lengthBoard; i++){
                if (i < this.cardCenter){
                    this.board.children[i].getComponent(CardController).moveToLeft(i, this.lengthBoard);
                } 
                if (i == this.cardCenter){
                    this.board.children[this.cardCenter].getComponent(CardController).moveToCenter();
                }
                if (i > this.cardCenter){
                    this.board.children[i].getComponent(CardController).moveToRight(i, this.lengthBoard);
                }
            }
        }
        this.cardCenter += 0.5;
    }
    // update (dt) {}
}
