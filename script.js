let box = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".resetbtn");
let new_btn = document.querySelector("#new-btn");
let msg_container = document.querySelector(".div-container");
let msg = document.querySelector(".msg");

let turn0 = true;
let count = 0;
const winPatterns = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
];
const random = () =>{
        let emptybox = [];
        box.forEach((box)=>{
                if(box.innerText === ""){
                        emptybox.push(box);
                }
        });
        if(emptybox.length === 0){
                return;
        }
        let num = Math.floor(Math.random() * emptybox.length);
        let randombox = emptybox[num];
        randombox.innerText = "O";
        randombox.disabled = true;
}
const resetgame = () =>{
        turn0 = true;
        enableBoxes();
        msg_container.classList.add("hide");
        count = 0;
}
box.forEach((box) => {
        box.addEventListener("click", ()=>{
                        box.innerText = "X";                   
                        box.disabled = true;
                        count++;
                        let isWinner = checkWinner();
                        if(count === 9 && !isWinner){
                                gameDraw();
                        }
                        setTimeout(()=>{
                        random();
                        count++;
                        isWinner = checkWinner();
                        if(count === 9 && !isWinner){
                                gameDraw();
                        }
                },200);
        }) 
});
const gameDraw = () =>{
        msg.innerText = "Game was draw!";
        msg_container.classList.remove("hide");
        disableBoxes();
}
const disableBoxes = () =>{
        for(let boxes of box){
                boxes.disabled = true;
        }
}
const enableBoxes = () =>{
        for(let boxes of box){
                boxes.disabled = false;
                boxes.innerText = "";
        }
}
const showWinner = (winner) =>{
        if(winner === "X"){
                msg.innerText = "Congratulations!!, You are winner";
        }
        else if(winner === "O"){
                msg.innerText = "Try Again!, Computer is Winner";
        }
        msg_container.classList.remove("hide");
} 
const checkWinner = () =>{
        for(let pattern of winPatterns){
                let posval1 =  box[pattern[0]].innerText;
                let posval2 =  box[pattern[1]].innerText;
                let posval3 =  box[pattern[2]].innerText;
                if(posval1!="" && posval2!= "" && posval3!= ""){
                        if(posval1 === posval2 && posval2 === posval3){
                                disableBoxes();
                                showWinner(posval1);
                                return true;
                        }   
                }
        }
        return false;
};
new_btn.addEventListener("click",resetgame);
resetbtn.addEventListener("click",resetgame);
