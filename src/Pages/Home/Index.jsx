import { useCallback, useEffect, useState } from "react";
import routes from "../../routes/routes";
import { getStoryCategories } from "../../Services/Categories";
import Banner from "./Components/Banner";
import Banner2 from "./Components/Banner2";
import VideoGrid from './Components/VideoGrid';
import items from './data/items';
import useURL from '../../Hooks/useURL';
import { useMemo } from "react";
import { reverse } from "named-urls";
export default function Home(){
    const [pregnancyItems] = useState(items);
    const [categories,setCategories] = useState([]);
    let {generateQueryLink} = useURL();
    const fetch = async ()=> {
        let {categories} = await getStoryCategories({posts : 1,order : 'random'});
        setCategories(categories);
    };
    let storyUrl = useCallback((params = {})=> {
        return reverse(`${routes.stories.index}/${routes.stories.category}`,params)
    });
    useEffect(()=> {
        fetch();
    },[]);
    
    return (
        <>
        <Banner/>
        {
            categories?.map((category,categoryIndex)=> (
                <section key={categoryIndex} className="videos-grid my-5">
                    <VideoGrid title={category?.name} link={storyUrl({category : category._id})} items={category?.stories}/>
                </section>
            ))
        }
        {/* <section className="videos-grid my-5">
            <VideoGrid title="SOMETHING AWFUL" link="/" items={pregnancyItems}/>
        </section>
        <section className="videos-grid my-5">
            <VideoGrid title="DONE TO ME/FAMILY" link="/" items={pregnancyItems}/>
        </section>
        <section className="videos-grid my-5">
            <VideoGrid title="ABANDONMENT" link="/" items={pregnancyItems}/>
        </section> */}
        <Banner2/>
        </>
    )
}