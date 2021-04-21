import React from 'react'
import classes from './Input.module.css';

const Input=(props)=>{
    let inputClasses=[classes.inputElement];
    if(props.inValid&&props.touched){
        inputClasses.push(classes.inValid);
    }

    let inputElement=null;
    switch(props.type){
        case('input'):
            inputElement=<input
                            className={inputClasses.join(' ')}
                            {...props.properties}
                            value={props.value}
                            onChange={props.changed} />
            break;
        case('select'):
            inputElement=(
                <select
                    className={inputClasses.join(' ')}>
                    {
                        props.properties.map(item=>{
                            return <option key={item.value} value={item.value}>{item.displayValue}</option>
                        })
                    }
                </select>
            )
            break;
        default:
            inputElement=<input
                            className={inputClasses.join(' ')}
                            {...props.properties}
                            value={props.value}
                            onChange={props.changed} />
            break;
    };

    return(
        <div className={classes.Input}>
            {inputElement}
        </div>
    );
};
export default Input;