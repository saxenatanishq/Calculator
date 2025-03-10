var mystack = [];
    // var mystack_indices = [];
    
    // for(let j=0;j<smth.length;j++){
    //     if(smth[j] === "("){
    //         mystack.push("(");
    //         mystack_indices.push(j);
    //     } else if (smth[j] === ")"){
    //         mystack.push(")");
    //         mystack_indices.push(j);
    //     }
    // }

    // if(mystack.length !== 0){
    //     if(check_my_stack(mystack) === false){
    //         return NaN
    //     }else{
    //         let left = mystack_indices[0];
    //         let right = mystack_indices[-1];
    //         new_term = evaluate(smth.slice(left+1, right));
    //         if((left===0)&&(right===smth.length-1)){
    //             new_string = new_term;    
    //         }else if(left===0){
    //             new_string = new_term + smth.slice(right+1);
    //         }else if (right === smth.length-1){
    //             new_string = smth.slice(0,left) + new_term;
    //         }else{
    //             new_string = smth.slice(0,left) + new_term + smth.slice(right+1);
    //         }
    //         return evaluate(new_string);
    //     }
    // }