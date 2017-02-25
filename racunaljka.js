/*=================================== brojevi==================================================*/

function brojJedan() {
    var pise = document.getElementById('izvestaj');
   pise.value += 1;
}

function brojDva() {
    var pise = document.getElementById('izvestaj');
    pise.value += 2;
}

function brojTri() {
    var pise = document.getElementById('izvestaj');
    pise.value += 3; 
}

function brojCetiri() {
    var pise = document.getElementById('izvestaj');
    pise.value += 4; 
}

function brojPet() {
    var pise = document.getElementById('izvestaj');
    pise.value += 5; 
}

function brojSest() {
    var pise = document.getElementById('izvestaj');
    pise.value += 6; 
}

function brojSedam() {
    var pise = document.getElementById('izvestaj');
    pise.value += 7; 
}

function brojOsam() {
    var pise = document.getElementById('izvestaj');
    pise.value += 8; 
}

function brojDevet() {
    var pise = document.getElementById('izvestaj');
    pise.value += 9; 
}

function brojNula() {
    var pise = document.getElementById('izvestaj');
    if(pise.value==="") {
       pise.value='';
    }
    else{pise.value+=0}
}
/*=================================== brojevi==================================================*/
/*=================================== operacije================================================*/

function plus() {
    var pise = document.getElementById('izvestaj');
       
        if(pise.value==='') {
            pise.value='';
        }
        else if(isNaN(pise.value)===false) {
     pise.value+='+'; 
       } 
    else if(isNaN(pise.value)===true) {
     pise.value+='';
       }  
        else{pise.value+='+'}
       }

    
 function minus() {
    var pise = document.getElementById('izvestaj');

         if(pise.value==='') {
            pise.value='';
        }
         else if(isNaN(pise.value)===false) {
     pise.value+='-'; 
      } 
      else if(isNaN(pise.value)===true) {
     pise.value+='';
       } 
         else{pise.value+='+'}   
}   
  
function puta() {
    var pise = document.getElementById('izvestaj');

         if(pise.value==='') {
            pise.value='';
        }
        
       else if(isNaN(pise.value)===false) {
     pise.value+='x'; 
     
       } 
     
    else if(isNaN(pise.value)===true) {
     pise.value+='';
       
       } 
        
        else{pise.value+='x'}   
}   

function podeljeno() {
    var pise = document.getElementById('izvestaj');

         if(pise.value==='') {
            pise.value='';
        }
        
       else if(isNaN(pise.value)===false) {
     pise.value+='/'; 
     
       } 
     
    else if(isNaN(pise.value)===true) {
     pise.value+='';
       
       } 
        
        else{pise.value+='/'}   
} 

function jednako() {
     var pise = document.getElementById('izvestaj');
     var textLength = pise.value.length;
for(var i=0; i<textLength; i++) {    
 if(pise.value[i]==='-'){
     pise.value1 = pise.value.substring(0,pise.value.indexOf('-'));
     pise.value2 = pise.value.substring(pise.value.indexOf('-')+1); 
  
     pise.value = pise.value1 - pise.value2;
    } 
    
  else if(pise.value[i]==='+'){
     pise.value1 = pise.value.substring(0,pise.value.indexOf('+'));
     pise.value2 = pise.value.substring(pise.value.indexOf('+')+1);  
      pise.value = Number(pise.value1) + Number(pise.value2);
  }   
    
    
   else if(pise.value[i]==='x'){
      pise.value1 = pise.value.substring(0,pise.value.indexOf('x'));
      pise.value2 = pise.value.substring(pise.value.indexOf('x')+1); 
    
      pise.value = pise.value1 * pise.value2;  
   }
   
    
    else if(pise.value[i]==='/'){
      pise.value1 = pise.value.substring(0,pise.value.indexOf('/'));
      pise.value2 = pise.value.substring(pise.value.indexOf('/')+1); 
    
      pise.value = pise.value1 / pise.value2;  
   }    
}
}


/*=================================== operacije================================================*/
/*=================================== ostalo================================================*/
function brisanje() {
    var pise = document.getElementById('izvestaj');
    pise.value='';
}

function jednoBrisanje() {
    var pise = document.getElementById('izvestaj');
    pise.value=pise.value.substring(0, pise.value.length - 1);

}

function coma() {
    var pise = document.getElementById('izvestaj');
    var textLength = pise.value.length;
    pise.value+='.';
for(var i=0; i<textLength; i++) {    

 if(pise.value[i]==='.'){
    pise.value=pise.value.substring(0, pise.value.length - 1);  
}
 if(pise.value[i]==='-' || pise.value[i]==='+' || pise.value[i]==='*' || pise.value[i]==='/'){
    pise.value+='.';
    
}
}
}

function squareRoot() {
    var pise = document.getElementById('izvestaj');
     
    
    if(isNaN(pise.value)===false) {
         pise.value = Math.sqrt(pise.value);
       } 
    
          else if(isNaN(pise.value)===true) {
           pise.value+='';      
       }
}

function square() {
    var pise = document.getElementById('izvestaj');
     
    if(isNaN(pise.value)===false) {
         pise.value = Math.pow(pise.value,2);
       } 
    
          else if(isNaN(pise.value)===true) {
           pise.value+='';      
       }
}

function percent() {
    var pise = document.getElementById('izvestaj');
     var textLength = pise.value.length;
    for(var i=0; i<textLength; i++) {  
       if(pise.value[i]==='/'){
           pise.value1 = pise.value.substring(0,pise.value.indexOf('/'));
           pise.value2 = pise.value.substring(pise.value.indexOf('/')+1); 
           pise.value = pise.value1 / pise.value2 * 100; 
}
}
}