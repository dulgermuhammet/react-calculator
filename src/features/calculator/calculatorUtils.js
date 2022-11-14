function _calculatorParser (input){

    const operators =["*","/","+","-"];

    if( typeof input ==="string" ){

        const _input = input.split("");

        const result = [];
        
        let innerIndex = 0;
        
        let lastEl = null;

        _input.forEach((element) => {

            const isCurrentElementOperator = operators.includes(element);
            const isLastElementOperator = operators.includes(lastEl);

            if(isLastElementOperator){
                innerIndex++;
            }

            if(isCurrentElementOperator){
                innerIndex++;
                result[innerIndex] = element;
            }else{
                if(typeof result[innerIndex] !== "undefined"){
                    result[innerIndex] =  result[innerIndex] + element; 
                }else{
                    result[innerIndex] =  element; 
                }
            }

            lastEl = element;
        });

        return result;

    }else{
        return  undefined;
    }
}

function _calculation (input){

    const operators =["*","/","+","-"];

    if(typeof input ==="undefined"){
        console.error("Calculation method input cannot be undefined");
        return input;
    }

    if(input.length % 2 === 0 ){
        return input.join("");
     }
    
    if(input.length === 1 ){
        return input[0];
    }

    let _input = input;
    let foundOne = false;

    operators.forEach((operator)=>{
        
        if(foundOne){
            return;
        }

        const inputLength = _input.length;
        const operatorIndex = _input.indexOf(operator);
        
        if(operatorIndex < 0){
            return;
        }
        
        let calculation = 0;
        let isDirty =false;

        if(operatorIndex < inputLength - 1  && operatorIndex > 0 && _input.length >= 3){
            if(operator === "*"){
                calculation = Number(_input[operatorIndex-1]) * Number(_input[operatorIndex+1]);
                isDirty =true;
            }

            if(operator === "/"){
                calculation = Number(_input[operatorIndex-1]) / Number(_input[operatorIndex+1]);
                isDirty =true;
            }

            if(operator === "+"){
                calculation = Number(_input[operatorIndex-1]) + Number(_input[operatorIndex+1]);
                isDirty =true;
            }

            if(operator === "-"){
                calculation = Number(_input[operatorIndex-1]) - Number(_input[operatorIndex+1]);
                isDirty =true;
            }
            
            if(isDirty){
                _input.splice(operatorIndex-1, 3, calculation );
                foundOne =true;
            }
        }
    });

    return _calculation(_input);
}

export const calculator = (input)=>{

    const parsedCalculation = _calculatorParser(input);
    return _calculation(parsedCalculation);
}