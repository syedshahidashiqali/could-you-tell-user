import propTypes from 'prop-types'
import {serialNumber} from '../Util/helpers';
import NoRecord from './NoRecord';
import Pagination from './Pagination';
const Table = ({children,data,fields,hasPagination,extraHeads,extraCells,pageChanged})=> {
    const colspanFields = ()=>{
        return Object.keys(fields).length + 1;
    }
  return (
    <>
    <div className="w-100 table-responsive">
        {children}
        <table className="table text-center" id='cut-table'>
            <thead>
                <tr>
                    <th className="table-site-headings">S No.</th>
                {
                    fields?.map((field,fieldIndex)=>(

                        <th className="table-site-headings" key={fieldIndex}>{field.label}</th>
                    ))
                }
                {extraHeads()}
                </tr>
            </thead>
            <tbody>
                {
                    !hasPagination?
                        <>
                        {
                            data?.map((item,itemIndex)=>(
                                <tr key={itemIndex}>
                                    <td>{itemIndex + 1}</td>
                                    {
                                    fields?.map((field,fieldIndex)=>(
                                        <td key={fieldIndex}>{field.format?field.format(data[itemIndex][field.key]):data[itemIndex][field.key]}</td>
                                    ))
                                    }
                                    {extraCells(item)}
                                </tr>
                            ))
                        }
                        <NoRecord tag="tr" data={data.data} colspan={colspanFields()} />
                        </>
                    :
                    <>
                    {
                        data?.data?.map((item,itemIndex)=>(
                            <tr key={itemIndex}>
                                <td>{serialNumber(data,itemIndex)}</td>
                                {
                                    fields?.map((field,fieldIndex)=>(
                                        <td key={fieldIndex}>{field.format?field.format(data.data[itemIndex][field.key]):data.data[itemIndex][field.key]}</td>
                                    ))
                                }
                                {extraCells(item)}
                            </tr>
                    
                    ))
                    }
                    <NoRecord tag="tr" data={data.data} colspan={colspanFields()} />
                    </>
                }
            </tbody>
        </table>
        {
            hasPagination?
            <>
                <div className="row justify-content-between align-items-center g-0 px-md-5 px-3 mt-5">
                    <div className="col-md-6 mb-4 text-center text-md-start">
                        {/* <p className="pagination-results">Showing from { data.from || 0 } of { data.total || 0 } entries</p> */}
                    </div>
                    <div className="col-md-6 mb-4">
                        <Pagination data={data} onPageChange={(value)=> pageChanged(value)} />
                    </div>
                </div>
            </>
            :
        ''
    }
    </div>
    </>
  )
}

{/* <template>
    <div className="w-100 table-responsive">
        <slot></slot>
        <table className="table text-center">
            <thead>
                <tr>
                    <th className="table-site-headings">S No.</th>
                    <th className="table-site-headings" :key="fieldIndex" v-for="(field,fieldIndex) in fields">{{field.label}}</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="!hasPagination">
                    <tr :key="itemIndex" v-for="(item,itemIndex) in data">
                        <td>{{itemIndex + 1}}</td>
                        <td :key="fieldIndex" v-for="(field,fieldIndex) in fields">{{field.format?field.format(data[itemIndex][field.key]):data[itemIndex][field.key]}}</td>
                        <slot name="extra-cells" v-bind="item"></slot>
                    </tr>
                    <no-record tag="tr" :data="data" :colspan="colspanFields" />
                </template>
                <template v-if="hasPagination">
                    <tr :key="itemIndex" v-for="(item,itemIndex) in data.data">
                        <td>{{serialNumber('data',itemIndex)}}</td>
                        <td :key="fieldIndex" v-for="(field,fieldIndex) in fields">{{field.format?field.format(data.data[itemIndex][field.key]):data.data[itemIndex][field.key]}}</td>
                        <slot name="extra-cells" v-bind="item"></slot>
                    </tr>
                    <no-record tag="tr" :data="data.data" :colspan="colspanFields" />
                </template>
            </tbody>
        </table>
        <div v-if="hasPagination" className="d-flex justify-content-between flex-wrap align-items-center">
            <p className="mb-0"> Showing {{ data.from || 0 }} to {{ data.to || 0}} of {{ data.total || 0 }} entries</p>
            <div className="viewAll d-flex justify-content-end flex-wrap py-3">
                <pagination :data="data" @pagination-change-page="changePage"></pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props : {
        fields : {
            type : Array,
            default : ()=> ([]),
        },
        data : {
            type : [Array,Object],
            default : ()=> ({}),
        },
        hasPagination : {
            type : Boolean,
            default : true,
        },
    },
    computed : {
        colspanFields(){
            return Object.keys(this.fields).length + 1;
        },
    },
    methods : {
        changePage(page = 1){
            this.$emit('page-changed',page);
        },
    },
}
</script> */}
Table.propTypes = {
    fields : propTypes.array,
    hasPagination : propTypes.bool,
    extraCells : propTypes.func,
    pageChanged : propTypes.func,
    extraHeads : propTypes.func,
};

Table.defaultProps = {
    data : {},
    fields : [],
    hasPagination : true,
    extraCells : (item)=> {},
    extraHeads : (item)=> {},
    pageChanged : (item)=> {},
}

export default Table;