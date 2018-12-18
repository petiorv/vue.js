<template>   
<div class="content">
    <button class="add-to-cart" @click="addToCart()">Add to cart</button>
    <div class="top-row">
      <div class="top part">
          <div class="robot-name">
              {{selectedRobot.head.title}}
              <span v-if="selectedRobot.head.onSale" class="sale">Sale!</span>
          </div>
        <img :src="selectedRobot.head.src" title="head"/>
        <button @click="selectPrevHead()" class="prev-selector">&#9668;</button>
        <button @click="selectNextHead()" class="next-selector">&#9658;</button>
      </div>
    </div>
    <div class="middle-row">
      <div class="left part">
        <img :src="selectedRobot.leftHand.src" title="left arm"/>
        <button @click="selectPrevLeftHand()" class="prev-selector">&#9650;</button>
        <button @click="selectNextLeftHand()" class="next-selector">&#9660;</button>    
      </div>
      <div class="center part">
        <img :src="selectedRobot.torso.src" title="center"/>
        <button @click="selectPrevTorso()" class="prev-selector">&#9668;</button>
        <button @click="selectNextTorso()" class="next-selector">&#9658;</button>
      </div>
      <div class="right part">
        <img :src="selectedRobot.rightHand.src" title="right arm"/>
        <button @click="selectPrevRightHand()" class="prev-selector">&#9650;</button>
        <button @click="selectNextRightHand()" class="next-selector">&#9660;</button>
      </div>
    </div>
    <div class="bottom-row">
      <div class="bottom part">
        <img :src="selectedRobot.base.src" title="base"/>
        <button @click="selectPrevBase()" class="prev-selector">&#9668;</button>
        <button @click="selectNextBase()" class="next-selector">&#9658;</button>
      </div>     
    </div>
    <div>
          <h1>Cart</h1>
          <table>
              <thead>
                  <tr>
                      <th>Robot</th>
                      <th>Cost</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(robot, index) in cart" :key="index">
                    <td>{{robot.head.title}}</td>
                    <td>{{robot.cost}}</td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>    
</template>

<script>
import availableParts from '../data/parts';

function getPrevValidIndex(index, length){
    const deprecatedIndex = index - 1;
    return deprecatedIndex < 0 ? length - 1 : deprecatedIndex;
}

function getNextValidIndex(index, length){
    const incrementIndex = index + 1;
    return incrementIndex > length - 1 ? 0 : incrementIndex;
}

export default{
    name: 'RobotBuilder',
    data() {
        return { 
            availableParts,
            cart: [],
            selectedHeadIndex:0,
            rightHandIndex:0,
            leftHandIndex:0,
            torsoIndex:0,
            baseIndex:0
        };
    },
    computed:{
        selectedRobot(){
            return {
                head: availableParts.heads[this.selectedHeadIndex],
                leftHand: availableParts.arms[this.leftHandIndex],
                torso: availableParts.torsos[this.torsoIndex],
                rightHand: availableParts.arms[this.rightHandIndex],
                base: availableParts.bases[this.baseIndex]
            }
        }
    },
    methods:{
        addToCart(){
            const robot = this.selectedRobot;
            const cost = robot.head.cost + robot.leftHand.cost + robot.torso.cost + robot.rightHand.cost + robot.base.cost;
            this.cart.push(Object.assign({}, robot, {cost}));
        },
        selectNextHead(){           
           this.selectedHeadIndex = getNextValidIndex(this.selectedHeadIndex, availableParts.heads.length);
        },
        selectPrevHead(){
           this.selectedHeadIndex = getPrevValidIndex(this.selectedHeadIndex, availableParts.heads.length);
        },
        selectNextLeftHand(){
            this.leftHandIndex = getNextValidIndex(this.leftHandIndex, availableParts.arms.length);
        },
        selectPrevLeftHand(){
            this.leftHandIndex = getPrevValidIndex(this.leftHandIndex, availableParts.arms.length);
        },
        selectNextRightHand(){
            this.rightHandIndex = getNextValidIndex(this.rightHandIndex, availableParts.arms.length)
        },
        selectPrevRightHand(){
            this.rightHandIndex = getPrevValidIndex(this.rightHandIndex, availableParts.arms.length);
        },
        selectNextTorso(){
            this.torsoIndex = getNextValidIndex(this.torsoIndex, availableParts.torsos.length);
        },
        selectPrevTorso(){
            this.torsoIndex = getPrevValidIndex(this.torsoIndex, availableParts.torsos.length);
        },
        selectNextBase(){
            this.baseIndex = getNextValidIndex(this.baseIndex, availableParts.bases.length);
        },        
        selectPrevBase(){ 
            this.baseIndex = getPrevValidIndex(this.baseIndex, availableParts.bases.length)
        },
    }
};
</script>

<style>
.part {
  position: relative;
  width:165px;
  height:165px;
  border: 3px solid #aaa;
} 
.part img {
  width:165px;
}
.top-row {
  display:flex;
  justify-content: space-around;
}
.middle-row {
  display:flex;
  justify-content: center;
}
.bottom-row {
  display:flex;
  justify-content: space-around;
  border-top: none;
}
.head {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.bottom {
  border-top: none;
}
.prev-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.center .prev-selector, .center .next-selector {
  opacity:0.8;
}
.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;    
  width: 144px;
  height: 25px;
}
.right .prev-selector {
  top: -28px;
  left: 24px;  
  width: 144px;
  height: 25px;
}
.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;    
  width: 144px;
  height: 25px;
}
.right .next-selector {
  right: -3px;
}
.robot-name{
    position: absolute;
    top: -25px;
    text-align: center;
    width: 100%;
}
.sale{
    color:red;
}
.content{
    position: relative;
}
.add-to-cart{
    position: absolute;
    right: 30px;
    width: 220px;
    padding: 3px;
    font-size: 16px;     
}
</style>
