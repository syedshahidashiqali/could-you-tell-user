import { reverse } from "named-urls";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useMatch, useNavigate, useParams } from "react-router-dom";
import Table from "../../Components/Table";
import TableSearch from "../../Components/TableSearch";
import routes from "../../routes/routes";
import { eventCategories } from "../../Services/Categories";
import { getEvents } from "../../Services/Events";
import { format_date } from "../../Util/helpers";
import { invitedEvents,myEvents } from "../../Util/table-fields";

export default function MyEvents() {
    const [events, setEvents] = useState({});
    const [routeKey,setRouteKey] = useState(null);
    const [filterValues, setFilterValues] = useState({
        event_type : '',
    });
    const location = useLocation();
    
    const navigate = useNavigate();
    const {type} = useParams();
    
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
        
        let data = await getEvents({...filterValues,page,type,route : routeKey});
        setEvents(data);
    };
    useEffect(()=>{
        
        let result = location?.pathname?.includes('invited-events');

        let routePrefix = result ? 'invitedEvents':'myEvents';
        setRouteKey(routePrefix);

        if(events?.data == undefined){
            fetchCategories();
        }
    },[type,filterValues]);
    useEffect(()=>{
        if(routeKey){

            fetch();
        } 
    },[routeKey])
    return (
        <section className="virtual-events text-white">
            <div className="container py-5">
                <div className="row py-5 align-items-center">
                    <div className="col-12 text-start">
                        <h1 className="heading-lvl-one mb-4 d-flex align-items-center">My Events </h1>
                        <ul className="tabs">
                            <li onClick={()=> navigate(`/${routes[routeKey]}`)} className={!type?'active tab':'tab'}>Upcoming Events</li>
                            <li onClick={()=> navigate(`/${routes[routeKey]}/past`)} className={type?'active tab':'tab'}>Past Events</li>
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
                                    <Table 
                                    pageChanged={(page)=> fetch(page) } 
                                    data={events} 
                                    fields={routeKey =='invitedEvents'?invitedEvents:myEvents}
                                    extraHeads={()=>{
                                        return <th className="table-site-headings">Action</th>
                                    }}
                                    extraCells={(item)=>{
                                        return <td className="text-center"><Link to={reverse(routes.eventDetail,{id : item._id})} className="view-link"><img src="images/table-eye-icon.png" alt="" className="img-fluid"/></Link></td>
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
