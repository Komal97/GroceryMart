window.addEventListener("load",()=>{
    document.querySelector("#signup").addEventListener("click",signUp);
    document.querySelector("#rpass").addEventListener("keyup",checkpassword);
    document.querySelector("#firstname").addEventListener("keyup",checkFirstName);
    document.querySelector("#lastname").addEventListener("keyup",checkLastName);
    document.querySelector("#buy").addEventListener("click",buyItems);
});

function signUp(){
    document.getElementById("logindiv").style.display="none";
    document.getElementById("registerdiv").style.display="block";
}

//===================================== CHECK REGISTRATION ===============================================

function checkFirstName(){
    var firstname=document.querySelector("#firstname").value;
    userOperations.checkName(firstname,"wrongfirst");
}

function checkLastName(){
    var lastname=document.querySelector("#lastname").value;
    userOperations.checkName(lastname,"wronglast");
}

function checkUser(json,key){
    var object=JSON.parse(json);

    object[key].forEach((currentuser)=>{
      var user=document.querySelector("#rusername").value;
      var usercheck=currentuser.username;
        if((user.localeCompare(usercheck))==0){
           alert("User already exist");
           document.querySelector("#rusername").value=" ";
        }
          else{
            if(userOperations.checkLength(user,5,25)){
                document.querySelector("#duplicateuser").innerHTML="Username should be between 5-25 characters";
            }
            else{
                document.querySelector("#duplicateuser").innerHTML=" ";
                checkBlank();
               } 
            }       
    });
    ajaxcall.ajax(printMainMenu,"http://localhost:3000/menu.json","mainmenu");
}

 function checkpassword(){
    var passwordborder=document.querySelector("#rpass");
    var password=passwordborder.value;
    var hpass=document.querySelector("#hpass");

    if(userOperations.checkLength(password,5,25)){
        userOperations.applyClass(passwordborder,"red",hpass,"incorrectregister","Password should be between 5-25 characters");
    }

    else if(password.length<=7){
        userOperations.applyClass(passwordborder,"red",hpass,"incorrectregister","Weak");
    }

    else if(password.length<11 && !userOperations.alphanumeric(password)){
        userOperations.applyClass(passwordborder,"green",hpass,"incorrectgreen","Strong");
    }

    else if(password.length<11){
        userOperations.applyClass(passwordborder,"orange",hpass,"incorrectorange","Medium");
    }
    else {
        userOperations.applyClass(passwordborder,"green",hpass,"incorrectgreen","Strong");
    }
}

function checkBlank(){
    var firstname=document.querySelector("#firstname").value;
    var lastname=document.querySelector("#lastname").value;
    var username=document.querySelector("#rusername").value;
    var address=document.querySelector("#address").value;
    var password=document.querySelector("#rpass").value;
    var wrongfirst=document.querySelector("#wrongfirst").innerHTML;
    var wronglast=document.querySelector("#wronglast").innerHTML;
    var existinguser=document.querySelector("#duplicateuser").innerHTML;
   
    if(wrongfirst.length>1 || wronglast.length>1 || existinguser.length>1 ||firstname.length<1 || lastname.length<1 || username.length<1 || address.length<1 || password.length<1){
       document.querySelector("#mandatory").innerHTML="Conditions are not fulfilled**";
    }
    else{
       document.getElementById("registerdiv").style.display="none";
       document.getElementById("homediv").style.display="block";
    }
}

//=========================================== LOGIN ==================================================

function checkuser(json,key){
    var flag=false;
    var object=JSON.parse(json);

    object[key].forEach((currentuser)=>{
        var user=document.querySelector("#username").value;
        var usercheck=currentuser.username;

        var password=document.querySelector("#pass").value;
        var passwordcheck=currentuser.password;
            if(((user.localeCompare(checkuser))&&(password.localeCompare(passwordcheck)))==0){
             flag=true;
        }
    });

    if(flag){
        document.getElementById("logindiv").style.display="none";
        document.getElementById("homediv").style.display="block";
        ajaxcall.ajax(printMainMenu,"http://localhost:3000/menu.json","mainmenu");
        ajaxcall.ajax(printSubMenu,"http://localhost:3000/Vegetable.json","submenu");
    }
    else{
        document.querySelector("#incorrectpass").innerHTML="Invalid username or password !!";
    }
}

//=========================================== MAIN MENU ================================================
function printMainMenu(json,key){
    var object=JSON.parse(json);
    object[key].forEach((currentmenu)=>{
        let btn=document.createElement("button");
        btn.innerHTML=currentmenu;
        btn.className="buttons"; 
        btn.setAttribute("menu-id",currentmenu);
        btn.addEventListener("click",callSubMenu);
        document.querySelector("#innerdiv").appendChild(btn);
    });
}

function callSubMenu(event){
    var btn=event.srcElement;
    btn.classList.toggle("clicked");
    var id=this.getAttribute("menu-id");
    ajaxcall.ajax(printSubMenu,"http://localhost:3000/"+id+".json","submenu");
}
//============================================ ITEMS =================================================

function printSubMenu(json,key){
    document.querySelector("#submenu").innerHTML=" ";
    var object=JSON.parse(json);
    object[key].forEach((currentObject)=>{
       
        let div=document.createElement("div");
        document.querySelector("#submenu").appendChild(div);
        div.className="divmain";

        let divimage=document.createElement("div");
        div.appendChild(divimage);
        divimage.className="divimage";

        let divlist=document.createElement("div");
        div.appendChild(divlist);

        let img=document.createElement("img");
        img.src=currentObject.imageurl;
        img.className="imgsize";
        divimage.appendChild(img);

        let ul=document.createElement("ul");
        ul.className="ul";
        divlist.appendChild(ul);

        let lirating=document.createElement("li");
        lirating.innerHTML="Like "+currentObject.rating;
        lirating.className="rating";
        lirating.addEventListener("click",()=>{
            currentObject.rating=currentObject.rating+1;
            lirating.innerHTML="Like "+currentObject.rating;
        });
        ul.appendChild(lirating);

        let liprice=document.createElement("li");
        liprice.innerHTML="Rs. "+currentObject.price;
        liprice.className="price";
        ul.appendChild(liprice);

        let liseller=document.createElement("li");
        liseller.innerHTML="Seller : "+currentObject.seller;
        liseller.className="seller";
        ul.appendChild(liseller);

        let liquantity=document.createElement("li");
        liquantity.innerHTML= "Quantity : "+currentObject.quantity;
        liquantity.className="quantity";
        ul.appendChild(liquantity);

        // let litxtquantity=document.createElement("li");
        // let txtquantity=document.createElement("input");
        // ul.appendChild(litxtquantity);
        // txtquantity.placeholder="Enter quantity";
        // txtquantity.className="txtquantity";
        // txtquantity.type="number";
        // txtquantity.min="1";
        // litxtquantity.appendChild(txtquantity);
       
        let btnaddtocart=document.createElement("button");
        btnaddtocart.innerHTML="Add To Cart";
        btnaddtocart.className="btnaddtocart";
        btnaddtocart.addEventListener("click",()=>{
            cartOperations.add(currentObject);
            currentObject.quantity=currentObject.quantity-1;
            liquantity.innerHTML= "Quantity : "+currentObject.quantity;
            //liquantity.innerHTML="Quantity : "+ cartOperations.calcQuantity(currentObject.quantity);
            updateCount();
            printBill(currentObject);
        });
        div.appendChild(btnaddtocart);
   }); 
}   

//====================================== CART NOTIFICATION ================================================

const updateCount=()=>{
    document.querySelector("#cartlabel").innerHTML=cartOperations.itemList.length;
}

//========================================== CART ITEMS ===================================================

function printBill(currentObject){
      var itemTable=document.querySelector("#itemtable");
      var tr=itemTable.insertRow();
      let index=0;

      for(let key in currentObject){

          if(key=="imageurl"){
              tr.insertCell(index).innerHTML=`<img class='url' src='${currentObject[key]}'/>`;
              index++;
          }

          if(key=="quantity"){
              tr.insertCell(index).innerHTML=1;
              index++;
          }

          if(key=="price"){
              tr.insertCell(index).innerHTML="Rs." +currentObject[key];

              price=cartOperations.calcPrice(currentObject[key]);
              document.querySelector("#pricevalue").innerHTML="Rs. "+price;
              document.querySelector("#totalpricevalue").innerHTML="Rs. "+cartOperations.calcCartSubtotal(price);

              index++;
          }
      }
}

//============================================ BUY NOW ==============================================

function buyItems(){
    document.querySelector("#itemtable").innerHTML=" ";
    document.querySelector("#pricevalue").innerHTML="Rs. 0";
    document.querySelector("#totalpricevalue").innerHTML="Rs. 0";
    price=0;
    total=0;
    cartOperations.deleteItem();
    updateCount();
}



    