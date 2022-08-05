import { findIndex, lowerCase } from 'lodash';
import { reverse } from 'named-urls';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Table from '../../Components/Table'
import TableSearch from '../../Components/TableSearch';
import routes from '../../routes/routes';
import { updateStatus } from '../../Services/General';
import { getStories } from '../../Services/Story';
import { format_date, notification } from '../../Util/helpers';

const tableFields = [{
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
const filterOptions = [
        {
            id: '',
            label: 'Story Type',
        },
        {
            id: 'audio',
            label: 'Audio',
        }, {
            id: 'video',
            label: 'Video',
        }, {
            id: 'textual',
            label: 'Textual',
        }];
export default function MyStories() {
    const [stories, setStories] = useState({});
    const [filterValues, setFilterValues] = useState({});

    const changeStatus = async (id) => {
        try {
            let data = await updateStatus(`story/user/status/${id}`);
            notification(data?.message);
            let storiesArr = [...stories?.data];
            let index = findIndex(storiesArr, (item) => item._id == id);
            storiesArr[index].status = !storiesArr[index].status;
            setStories({ ...stories, data: storiesArr });
        } catch (error) {
            // console.log(error);
            notification(error.message, 'error');
            // throw new Error(error.message);
        }
    };

    const fetch = async (page = 1) => {

        let data = await getStories({ page,...filterValues });
        setStories(data);
    };
    useEffect(() => {
        fetch();
    }, [filterValues?.type,filterValues?.search]);
    return (
        <section className="virtual-events text-white">
            <div className="container py-5">
                <div className="row py-5 align-items-center">
                    <div className="col-xxl-8 col-lg-9 text-start">
                        <h1 className="heading-lvl-one mb-4 d-flex align-items-center">My Stories</h1>
                    </div>
                    <div className="col-12">
                        <form id="cut-table-form">
                            <TableSearch 
                            filterValues={filterOptions} 
                            onSearch={(search) => setFilterValues({...filterValues,search})}
                            onFilterChange={(value)=> setFilterValues({...filterValues,type : value})}
                            />
                        </form>
                        {/* Table starts here */}
                        <div className="grey-bg container-fluid px-0">
                            <Table
                                pageChanged={(page) => fetch(page)}
                                fields={tableFields}
                                data={stories}
                                extraHeads={
                                    () => <th scope="col">Action</th>
                                }
                                extraCells={
                                    (item) => (
                                        <td className="text-center">
                                            <Link to={reverse(
                                                `${routes.stories.index}/${routes.stories.detail}`,
                                                {
                                                    category: item.category._id,
                                                    type: lowerCase(item.story_type),
                                                    id: item._id
                                                })
                                            } className="d-block mb-1 grey-text text-decoration-none">View</Link>
                                            <a onClick={() => changeStatus(item._id)} className="d-block cursor mb-1 grey-text text-decoration-none">{item.status ? 'Mark As In-Active' : 'Mark As Active'}</a>
                                        </td>
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
