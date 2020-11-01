

var table = document.getElementById("myTable");
var r=0;
var c =0;

document.getElementById('add').disabled = true;
document.getElementById('delete').disabled=true;


var flagRow=false;
var flagCol=false;

/**************************************************************************/

function deleteRowDisable(){
    var rowCount=table.rows.length;
   
    var deleteRow=document.getElementById('delete');

    if(rowCount<=3){
        deleteRow.disabled=true;
    }
    else if(flagRow){
        deleteRow.disabled=false;
    }
    else{
        deleteRow.disabled=true;

    }
}


/*************************************************************************/

function deleteColDisable(){

    var columnCount = table.rows[0].cells.length;
    var deleteCol=document.getElementById('delete');

    if(columnCount<=3){
        deleteCol.disabled=true;
    }
    else if(flagCol){
        deleteCol.disabled=false;
        
    }
    else{
        deleteCol.disabled=true;
    }

}

/*************************************************************************/

function clearAllColor(){
    for(k=0; k<table.rows.length; k++){
        for(i=0;i<table.rows[0].cells.length;i++){
            table.rows[k].cells[i].style.backgroundColor="transparent";
        }
    }
}


/************************************************************************/ 


function highlightRow(e) {

    flagRow = !flagRow;

  
    clearAllColor();
    
    r=e.parentNode.parentNode;
    if(flagRow){
        for(j=0; j<table.rows[0].cells.length;j++){
            r.cells[j].style.backgroundColor="white";    
        }
        document.getElementById('add').disabled = false;
        deleteRowDisable();
    }

    else{
        for(j=0; j<table.rows[0].cells.length;j++){
            r.cells[j].style.backgroundColor="transparent";
        }
        document.getElementById('add').disabled = true;
        deleteRowDisable();

    }
   
    c=0;
  
}


/***************************************************************************************/


function highlightCol(e){
    flagCol = !flagCol;

    var rowCount=table.rows.length;
    var columnCount = table.rows[0].cells.length;


    c = e.parentNode.cellIndex;
        

    clearAllColor();
    

   if(flagCol){
    for(q=0;q<table.rows.length;q++){
   
        var cell = table.rows[q].cells[c];
       cell.style.backgroundColor = "white";

   }
   document.getElementById('add').disabled = false;
    
   deleteColDisable();
   }
        else{
            for(q=0;q<table.rows.length;q++){
   
                var cell = table.rows[q].cells[c];
               cell.style.backgroundColor = "transparent";
       
           }
           document.getElementById('add').disabled = true;
    
           deleteColDisable();
        }
  
   


    r=0;
  

}

/**************************************************************************/

function onAdd() {
    if(r!=0){
        clearAllColor();

        
    var row = table.insertRow(r.rowIndex+1);
    
    document.getElementById('add').disabled = true;
    document.getElementById('delete').disabled=true;

    
    

   
     for (i = 0; i < table.rows[0].cells.length; i++) { 
        
        
    
         if(i==0){
             var cell1 = row.insertCell(i);
             cell1.innerHTML = "<button class='row-btn' onClick='highlightRow(this)'>ROW </button>";
         }
        else{
         var cell2 = row.insertCell(i);
         cell2.innerHTML = "<input type='text' class='row-input'>";

       } 
    
    }
    flagRow=false;

    }

    else{
        document.getElementById('add').disabled = true;
        document.getElementById('delete').disabled=true;

        for( i= 0; i < table.rows.length; i++){

            table.rows[i].cells[c].style.backgroundColor="transparent";

            if(i==0){
                
                table.rows[i].insertCell(c+1).innerHTML="<button class='colClass' onClick='highlightCol(this)'>COLUMN</button>";
            }
            else{
                table.rows[i].insertCell(c+1).innerHTML="<input type='text' class='row-input'>";
    
            }
           
        }

        flagCol=false;
    
       

    }

    reOdering();
    
}
/************************************************************************************/



function onDelete(){
    if(r!=0){
        document.getElementById('add').disabled = true;
        document.getElementById('delete').disabled = true;
        var row=r;

        clearAllColor();
   
       console.log(table.rows[0].cells.length);
   
        table.deleteRow(r.rowIndex);

        flagRow=false;

    }

    else{
        document.getElementById('add').disabled = true;
        document.getElementById('delete').disabled = true;
       
    
            for (i = 0; i < table.rows.length; i++) {
                table.rows[i].deleteCell(c)    ;
            
        }

        flagCol=false;
    }

    reOdering();
}



/*********************************************************************************************/


    
function onSave() {
    clearAllColor();
    
    localStorage.clear();
    totalRow = table.rows.length;
    totalColumn = table.rows[1].cells.length;
    var arr = new Array(totalRow);
    for (i = 0; i < totalRow; i++) {
        arr[i] = new Array(totalColumn);
    }
    
    for (i = 1; i < totalRow; i++) {
        for (j = 1; j < totalColumn; j++) {
            arr[i][j] = table.rows[i].cells[j].children[0].value;
        }
    }
    localStorage.setItem("flag", true);
    localStorage.setItem("totalRow", totalRow);
    localStorage.setItem("totalCol", totalColumn);


    localStorage.setItem("arr", JSON.stringify(arr));
    
    alert(" SAVED!! ");
}



/********************************************************************************/


function onDataLoad() {
    if (localStorage.getItem("flag") == null) {
        document.getElementById("add").disabled = true;
        document.getElementById("delete").disabled = true;
        //document.getElementById("clear").disabled = true;
    } 
    
    else {

        document.getElementById("add").disabled = true;
       document.getElementById("delete").disabled = true;
        //document.getElementById("clear").disabled = false;
        var row = localStorage.getItem("totalRow");
       
        var col = localStorage.getItem("totalCol");
       // console.log(col);
       
        firstRow = table.rows[0];
       
        for (i = 3; i < col; i++) {
            cell = firstRow.insertCell(i);
            
            cell.innerHTML = "<button type='button' class='colClass' onclick='highlightCol(this)'>COLUMN</button>";
        }


        for (i = 1; i < 3; i++) {
            row = table.rows[i];
           // console.log(row);
            for (j = 3; j < col; j++) {
                cell = row.insertCell(j);
                cell.innerHTML = "<input type='text' class='row-input'>";
            }
        }


        for (i = 3; i < localStorage.getItem("totalRow"); i++) {
            var noOfCol = localStorage.getItem("totalCol");
            //console.log(noOfCol);
            var row = table.insertRow(i);
            var cell1 = row.insertCell(0);
           
            cell1.innerHTML = "<button type='button' class='row-btn' onclick='highlightRow(this)'>ROW</button>";
            for (x = 1; x < noOfCol; x++) {
                var cell2 = row.insertCell(x);
             
                cell2.innerHTML = "<input type='text' class='row-input'>";
            }
        }

        newArray = JSON.parse(localStorage.getItem("arr"));
        for (i = 1; i < localStorage.getItem("totalRow"); i++) {
            for (j = 1; j < localStorage.getItem("totalCol"); j++) {
                //onsole.log("row "+i+ "column "+ j);
              
                //console.log(table.rows[i].cells[j]);
                table.rows[i].cells[j].children[0].value = newArray[i][j];
            }
        }

        alert("DATA RELOADED");
      
    }

   
    reOdering();
}

/*********************************************************************************************************/
function reOdering(){
    var col=table.rows[0].cells.length;
    var row=table.rows.length;

    for(i=1;i<row;i++){
        table.rows[i].cells[0].children[0].innerHTML="Row "+ i+"";

    }

    for(i=1;i<col;i++){
        table.rows[0].cells[i].children[0].innerHTML="Column "+i+""

    }


}

/*********************************************************************************************************/