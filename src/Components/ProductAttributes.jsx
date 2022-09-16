import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

function ProductAttributes({attributes,onSelection}) {
    const getSelectedAttribute = (attribute,valueId)=> {
        let {attribute_values,label,_id} = attribute;
        let value = attribute_values?.find((item)=> item?._id == valueId);
                
        return {
            label,
            attributeId : _id,
            value,            
        };
    };
    const onSelectAttribute = (attribute,value)=> {
        if(!value) return;
        onSelection(getSelectedAttribute(attribute,value));
    };
    return (
        <div className="d-flex align-items-center mb-3">
            {
                attributes?.map((attribute, attributeIndex) => (
                    <Fragment key={attributeIndex}>
                        <label className="text-white">{attribute.label}:</label>
                        <select onChange={(e)=> onSelectAttribute(attribute,e.target.value)}  className="form-control w-50" key={attributeIndex}>
                            <option value="">Select {attribute.label}</option>
                            {
                                attribute?.attribute_values?.map((value, valueIndex) => (
                                    <option key={valueIndex} value={value?._id}>{value?.name}</option>
                                ))
                            }
                        </select>
                    </Fragment>
                ))
            }
        </div>
    )
}

ProductAttributes.propTypes = {
    attributes : PropTypes.array,
    onSelection : PropTypes.func,
}
ProductAttributes.defaultProps = {
    attributes : [],
    onSelection : ()=> {},
}
export default ProductAttributes
