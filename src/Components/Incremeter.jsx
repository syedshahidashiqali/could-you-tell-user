import propTypes from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react';

const Incremeter = ({defaultValue,onIncrement,onDecrement})=> {
  const [value, setValue] = useState(defaultValue);
  const updateValue = (type)=> {
    let newValue = type == 'Increment'?parseInt(value) + 1 : parseInt(value) - 1;
    if(newValue < 0){
        setValue(0);
    }else{
        setValue(newValue);
    }
    // calling onIncrement OR onDecrement
    eval(`on${type}`)(newValue);
    
  
  };





  useEffect(()=>{
    onIncrement(parseInt(value));
  },[value]);




  return (
    <div className="qtySelector text-center">
        <i onClick={()=> updateValue('Decrement') } className="fa fa-minus decreaseQty text-white" />
        <input type="number" className="qtyValue" onChange={(e)=> setValue(e.target.value)} value={value} />
        <i onClick={()=> updateValue('Increment') } className="fa fa-plus increaseQty text-white" />
    </div>
  )
}


Incremeter.propTypes = {
    onIncrement : propTypes.func,
    onDecrement :  propTypes.func,
    defaultValue : propTypes.number,
};


Incremeter.defaultProps = {
    onIncrement : ()=> {},
    onDecrement :  ()=> {},
    defaultValue : 1,
};

export default Incremeter;



