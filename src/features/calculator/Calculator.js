
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
onNumberClicked,
onOperatorClicked,
onClearClicked,
onResultClicked,
selectCalculator,
} from './calculatorSlice';
import './calculator.scss';

export function Calculator() {

    const calculatorValue = useSelector(selectCalculator);
    const dispatch = useDispatch();

    const numbers =["1","2","3","4","5","6","7","8","9","0"];
    const operators =["+","-","/","*"];

    const addClickedClass = event =>{
        const currentTarget = event.currentTarget;
        currentTarget.classList.add("clicked");     
        
        setTimeout(()=>{
            currentTarget.classList.remove("clicked");
        },100)
    }

    const numberInputClicked = (event,input) =>{
        addClickedClass(event);
        dispatch(onNumberClicked(input));
    }

    const operatorInputClicked=(event,input)=>{
        addClickedClass(event);
        dispatch(onOperatorClicked(input));
    }
  
    return(
        <div className="calculator">
            <div className="calculator__header">
                <input value={calculatorValue} type="text" disabled/>
            </div>
            <div className='calculator__bottom'>
                <div className="calculator__numbers">
                    <div className='calculator__clear calculator__input' onClick={()=>dispatch(onClearClicked())}>Clear</div>
                    {numbers.map((input,key)=>
                    <div className='calculator__number calculator__input' key={key} onClick={(event)=>numberInputClicked(event,input)}>
                        {input}
                    </div>)
                    }
                    <div className='calculator__result calculator__input' onClick={()=>dispatch(onResultClicked())}>=</div>
                </div>
                <div className='calculator__operators'>
                    {operators.map((input,key)=>
                    <div className='calculator__operator' key={key} onClick={(event)=>operatorInputClicked(event,input)}>
                        {input}
                    </div>)
                    }
                </div>
            </div>
        </div>
    )

}