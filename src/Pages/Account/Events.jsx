import { reverse } from "named-urls";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Table from "../../Components/Table";
import TableSearch from "../../Components/TableSearch";
import routes from "../../routes/routes";
import { eventCategories } from "../../Services/Categories";
import { getEvents } from "../../Services/Events";
import { format_date } from "../../Util/helpers";

export default function MyEvents() {
    const [events, setEvents] = useState({});
    const [filterValues, setFilterValues] = useState({
        event_type : '',
    });
    const navigate = useNavigate();
    const {type} = useParams();
    const fields = useRef([
        {
            label : 'Event Name',
            key : 'name',
        },
        {
            label : 'Event Type',
            key : 'event_type',
        },
        {
            label : 'Payment Type',
            key : 'type',
        },
        {
            label : 'Event Cost',
            key : 'event_cost',
            format : (value)=> `$${value}`
        },
        {
            label : 'Event Date',
            key : 'date',
            format : format_date,
        },
        {
            label : 'Event Time',
            key : 'time',
        }
    ]);
    const [filterOptions,setFilterOptions] = useState([
        {
            id : '',
            label : 'Event Type',
        },
    ]);
    const fetchCategories = useCallback(async ()=> {
        let {categories} =  await eventCategories();
        const options = [];
        categories.forEach((item)=> {
            options.push({id : item._id, label : item.name});
        });
        setFilterOptions([...filterOptions,...options]);
    });
    const fetch = async (page = 1)=> {
        let data = await getEvents({...filterValues,page,type});
        setEvents(data);
    };
    useEffect(()=>{
        
        if(events?.data == undefined){
            fetchCategories();
        }
        fetch();
    },[type,filterValues?.event_type,filterValues?.search]);

    return (
        <section className="virtual-events text-white">
            <div className="container py-5">
                <div className="row py-5 align-items-center">
                    <div className="col-12 text-start">
                        <h1 className="heading-lvl-one mb-4 d-flex align-items-center">My Events </h1>
                        <ul className="tabs">
                            <li onClick={()=> navigate(`/my-events`)} className={!type?'active tab':'tab'}>Upcoming Events</li>
                            <li onClick={()=> navigate(`/my-events/past`)} className={type?'active tab':'tab'}>Past Events</li>
                        </ul>
                        <div className="tab-content">
                            <div id="upcoming" className="active">
                                <TableSearch 
                                    filterValues={filterOptions}
                                    onFilterChange={(value)=> setFilterValues({...filterValues,event_type : value})}
                                    onDateChange={(value)=> setFilterValues({...filterValues,date : value})}
                                    onSearch={(value)=> setFilterValues({...filterValues,search : value})}
                                    />
                                {/* Table starts here */}
                                <div className="grey-bg container-fluid px-0">
                                    <Table pageChanged={(page)=> fetch(page) } data={events} fields={fields.current}
                                    extraHeads={()=>{
                                        return <th className="table-site-headings">Action</th>
                                    }}
                                    extraCells={(item)=>{
                                        return <td class="text-center"><Link to={reverse(routes.eventDetail,{id : item._id})} class="view-link"><img src="images/table-eye-icon.png" alt="" class="img-fluid"/></Link></td>
                                    }}
                                    ></Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
