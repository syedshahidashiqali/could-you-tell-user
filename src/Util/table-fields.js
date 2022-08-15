import { format_date } from "./helpers";

export const orders = [
    {
        label : 'Order ID',
        key : '_id',
    },
    {
        label : 'Customer Name',
        key : 'customer_name',
    },
    {
        label : 'Customer Email',
        key : 'customer_email',
    },
    {
        label : 'Total',
        key : 'total',
    }
];


export const stories = [{
    label: 'Story Name',
    key: 'title',
}, {
    label: 'Story Type',
    key: 'story_type',
}
    , {
    label: 'Story Category',
    key: 'category',
    format: (value) => value.name,
}, {
    label: 'Add on Date',
    key: 'createdAt',
    format: format_date,
}, {
    label: 'Add on Time',
    key: 'createdAt',
    format: (value) => format_date(value, 'hh:mm A'),
}, {
    label: 'Status',
    key: 'status',
    format: (value) => {
        if (value)
            return 'Active';
        return 'In Active';
    },
}]; 



export const reviews = [
    {
        label : 'Product',
        key : 'product',
        format : (product)=> product.name, 
    },
    {
        label : 'Review',
        key : 'review',
    },    
    
];