function check_my_stack(mystack){
    let mystack_copy = mystack.slice();
    if (mystack.length%2 !== 0){
        console.log("bhakk!")
        return false;
    }
    while(mystack_copy.length!==0){
        let toberemoved = [];
        for(let j=0;j<mystack_copy.length;){
            if((mystack_copy[j] === "(")&&(mystack_copy[j+1] === ")")){
                toberemoved.push(j);
                toberemoved.push(j+1);
                flag = 0;
                j=j+2;
            }else{
                j++;
            }
        }
        if(toberemoved.length === 0){
            return false;
        }
        for(let j=0;j<toberemoved.length;j++){
            mystack_copy.splice(toberemoved[j]-j, 1);
        }
    }
    return true;
}

function evaluate(smth){
    console.log(smth);
    const operators = ['/','⨯','+','-'];
    
    var mystack = [];
    var mystack_indices = [];
    
    for(let j=0;j<smth.length;j++){
        if(smth[j] === "("){
            mystack.push("(");
            mystack_indices.push(j);
        } else if (smth[j] === ")"){
            mystack.push(")");
            mystack_indices.push(j);
        }
    }

    if(mystack.length !== 0){
        if(check_my_stack(mystack) === false){
            return null
        }else{
            let left = mystack_indices[0];
            let right = mystack_indices[mystack_indices.length-1];
            new_term = evaluate(smth.slice(left+1, right));
            if((left===0)&&(right===smth.length-1)){
                new_string = new_term;    
            }else if(left===0){
                new_string = new_term + smth.slice(right+1);
            }else if (right === smth.length-1){
                new_string = smth.slice(0,left) + new_term;
            }else{
                new_string = smth.slice(0,left) + new_term + smth.slice(right+1);
            }
            return evaluate(new_string);
        }
    }

    for(let j=0;j<operators.length;j++){
        for(let i=0;i<smth.length;i++){
            if(smth[i] === operators[j]){
                let left = -1;
                let right = smth.length;
                for(let k=i-1;k>=0;k--){
                    if(operators.includes(smth[k])){
                        left = k;
                        break;
                    }
                }
                for(let k=i+1;k<smth.length;k++){
                    if(operators.includes(smth[k])){
                        right = k;
                        break;
                    }
                }
                let new_term = '';
                if(j==0){
                   new_term = parseFloat(smth.slice(left+1,i))/parseFloat(smth.slice(i+1,right));
                }else if(j==1){
                    new_term = parseFloat(smth.slice(left+1,i))*parseFloat(smth.slice(i+1,right));
                }else if(j==2){
                    new_term = parseFloat(smth.slice(left+1,i))+parseFloat(smth.slice(i+1,right));
                }else{
                    new_term = parseFloat(smth.slice(left+1,i))-parseFloat(smth.slice(i+1,right));
                }
                if((left===-1)&&(right===smth.length)){
                    return new_term;
                }else if(left===-1){
                    new_string = new_term + smth.slice(right);
                }else if(right===smth.length){
                    new_string = smth.slice(0,left+1) + new_term;
                }else{
                    new_string = smth.slice(0,left+1) + new_term + smth.slice(right);
                }
                return evaluate(new_string);
            }
        }
    }
    return parseFloat(smth)
}

addEventListener("DOMContentLoaded",() => {
    const textarea = document.querySelector("#display_textarea");
    function AddToTextBox(smth){
        textarea.value += smth;
    }
    var equal = 0
    document.addEventListener('click', event => {
        const element = event.target;
        if (element.classList.contains("number")){
            if (equal === 1){
                textarea.value = null;
            }
            equal = 0
            AddToTextBox(element.innerHTML)
        } else if (element.classList.contains("operators")){
            equal = 0
            AddToTextBox(element.innerHTML)
        } else if (element.id === "="){
            var expression = textarea.value
            try{
                var answer = evaluate(expression)
                console.log(answer)
                if(isNaN(answer)){
                    textarea.value = null;
                    textarea.placeholder = "NaN";
                }else if(!isFinite(answer)){
                    textarea.value = null;
                    textarea.placeholder = "Infinity";
                }else{
                    if(answer%1 === 0){
                        textarea.value = answer    
                    }else{
                        textarea.value = answer.toFixed(2);
                    }
                }
                equal = 1;
                console.log(equal)
            }
            catch(error){
                console.log(error)
                textarea.style.color = "red";
                textarea.placeholder = error;
            }
        } else if (element.id === "DEL"){
            equal = 0
            textarea.placeholder = 0;
            textarea.value = textarea.value.slice(0,-1);
        } else if (element.id === "AC"){
            equal = 0
            textarea.placeholder = 0;
            textarea.value = null;
        }
    });
});