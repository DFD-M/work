const grid=document.getElementById('grid');
const blockWidth=100;
const blockHeight=20;
const boardWidth=560
const boardHeight=300;
const userStart=[450,30];
let current_position=userStart;
let TimerId
const ballStart=[450,40]
let ballCurrent_pos=ballStart


let xDir=-2;
let yDir=2;

const ballDiametr=20;
class Block{
    constructor(xCord,yCord) {
        this.bottomLeft=[xCord,yCord];
        this.bottomRight=[xCord+blockWidth]

        this.topLeft=[xCord,yCord+blockHeight]
        this.topRight=[xCord+blockWidth,yCord+blockHeight]
    }
}


const blocks=[
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210)
];

let n=blocks.length

function addBlocks(){
    for(let i=0;i<n;i++){

        const block=document.createElement('div')
        block.classList.add('block');
        block.style.left=blocks[i].bottomLeft[0]+'px'
        block.style.bottom=blocks[i].bottomLeft[1]+'px'
        grid.appendChild(block);

    }
}

addBlocks();

const user=document.createElement('div')
user.classList.add('user');
drawUser();
grid.appendChild(user)


function drawUser(){
    user.style.left=current_position[0]+'px';
    user.style.bottom=current_position[1]+'px';
}

function drawBall(){
    ball.style.left=ballCurrent_pos[0]+'px';
    ball.style.bottom=ballCurrent_pos[1]+'px';
}


function moveUser(e){
    switch (e.key){
        case 'ArrowLeft':
            if(current_position[0]>0){
                current_position[0]-=10;

                drawUser();
            }
            break;

        case 'ArrowRight':
            if(current_position[0]<boardWidth-blockWidth){
                current_position[0]+=10;
                drawUser();
            }
            break;
    }

}

document.addEventListener('keydown',moveUser)

const ball=document.createElement('div')
drawBall()
ball.classList.add('ball')
grid.appendChild(ball)


function moveBall(){
    ballCurrent_pos[0]+=xDir;
    ballCurrent_pos[1]+=yDir;
    drawBall()
    Collisions()



}

TimerId=setInterval(moveBall,30)


function Collisions(){

    for(let i=0;i<blocks.length;i++){
        if(
            (ballCurrent_pos[0]>blocks[i].bottomLeft[0] && ballCurrent_pos[0]<blocks[i].bottomRight[0]) &&
            (ballCurrent_pos[1]+ballDiametr)>blocks[i].bottomLeft[1] && ballCurrent_pos[1]<blocks[i].topLeft[1]){

            const allBlocks=Array.from(document.getElementsByClassName('block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i,1)
            changeDir()

        }
    }

    if(ballCurrent_pos[0]>=(boardWidth-ballDiametr)||ballCurrent_pos[1]>=(boardHeight-ballDiametr)||ballCurrent_pos[0]<=0){
        changeDir()
    }

    if(ballCurrent_pos[1]<=0){
        clearInterval(TimerId)
        document.removeEventListener('keydown',moveUser)
    }

    if(
        (ballCurrent_pos[0]>current_position[0] && ballCurrent_pos[0]<current_position[0]+blockWidth)&&
        (ballCurrent_pos[1]>current_position[1] && ballCurrent_pos[1]<current_position[1]+blockHeight)
    ){
        changeDir();

    }



}






function changeDir(){

    if(xDir===2 && yDir===2){
       yDir=-2
        return
    }

    if(xDir===2 && yDir===-2){
        xDir=-2
        return
    }

    if(xDir===-2 && yDir===-2){
        yDir=2
        return
    }

    if(xDir===-2 && yDir===2){
        xDir=2
        return
    }



}