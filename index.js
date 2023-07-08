
// fetching the elements through DOM 
const boxes = document.querySelectorAll(".box");
const player = document.querySelector("[data-player");
const button = document.querySelector(".btn");

// defining some important variables 

let current_player;
let gameGrid;  // ye isliye hai ki game kha tk phocha hai or agr grid fill hogyi hai kyy ?

// ye array rhega jo saare winning combinations  ko store krega 
const winning_combinations = [

    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],          // these are 8 combinations 
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];


//Function[ 1 ] = game ko intial stage me ya refresh krne pe jo rehna chaiyee wo krrhe hai 
function intialiser_of_game ()
{
   current_player='X'; // intial me wo player X rhega 

   button.classList.remove(".active");  // 

   gameGrid=["","","","","","","","",""]; // ye empty krdiya 

   boxes.forEach((box,index)=>   // Ui pr bhi to update hona chaiyee
   {
    box.innerHTML="";

    boxes[index].style.pointerEvents = "all";

   // yha hum saari css properties ko intialise krrhe hai jisse green color bhi hut jayga 
    box.classList = `box box${index+1}`;


   });



   player.innerHTML=`Current Player -${current_player}`; // ye html me ye content dikhayga 

}

intialiser_of_game();

// Ab saare box pr hume eventlistner lgana hai , jisme hum foreach loop k use krenge 
boxes.forEach((box,index)=>
{
    box.addEventListener("click",()=>
    {
        handleClick(index);
    })
});


// Function[ 2 ] =  handle click function hai jo box pr click krne ke bad kyy krna hai ispr kam krega
function handleClick(index)  // yha pr index pass isliye hua ki current box pr kyy chkra 
{
   if(gameGrid[index]==="")  // YE APNE AAP UNCLIKABLE KE LIYE BHI HA 
   {
    boxes[index].innerHTML=current_player;
    gameGrid[index]=current_player;

    // jo ek bar hogye unpr currsor pointer nhi rhega 
    boxes[index].style.pointerEvents = "none";

    // turn swap hogi 
    swapTurn();

    // checking of winning  [most imp function]
    checkWin();

}
}

// Function[ 3 ] = ye swap krega turns ko 
function swapTurn ()
{
    if(current_player==="X")
    {
        current_player='O';
    }
    else{
        current_player='X';
    }

    player.innerHTML=`Current Player -${current_player}`;
}


 

button.addEventListener("click",intialiser_of_game);


function checkWin ()
{

    let winner = "";

    winning_combinations.forEach((position)=>
    {
        // yha jo subarray hai unke value  ko gridgame array k inex bnakr checkkrenge or 
        //ar un teeno value jo ki index hai gridgame ki agr uspr same x ya o milgya to hume aswer milgya hai 

        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        &&(gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]]))
        {

            // yh winner to  mil chuka hai pr kon hai wo pata krrhe hai 
            if(gameGrid[position[0]]== "X")
            winner='X';
            else
            winner='O';


            // winner ke miljane ke bad aap or clikc nhi krskte 
            boxes.forEach((box)=>
            {
                box.style.pointerEvents="none";
            }
            )

            // yha green color aajaye un sb pr 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");


        }
    });

    // upr status me winner bhi to show krna hoga 
    if(winner !== "")
    {
        player.innerHTML=`Winner-${winner}`;
        button.classList.add("active");
        return;

    }


// tie bhi to ho skta hai to hum check krlenge ki board pura fill hai ya nhi 
    let elemnt_count=0;
   gameGrid.forEach((box)=>
   {
    if(box !== "")
    {
        elemnt_count++;
    }
   })

   // agr count 9 hai iska mtlb hai ki  tie hai 
    if(elemnt_count === 9)
    {
        player.innerHTML = "game tied";
        button.classList.add('active');
    }

}
    
