import { useState } from "react";
import Banner from "./Components/Banner";
import Banner2 from "./Components/Banner2";
import VideoGrid from './Components/VideoGrid';
import items from './data/items';
export default function Home(){
    const [pregnancyItems] = useState(items);
    return (
        <>
        <Banner/>
        <section className="videos-grid my-5">
            <VideoGrid title="Pregnancy" link="/" items={pregnancyItems}/>
        </section>
        <section className="videos-grid my-5">
            <VideoGrid title="SOMETHING AWFUL" link="/" items={pregnancyItems}/>
        </section>
        <section className="videos-grid my-5">
            <VideoGrid title="DONE TO ME/FAMILY" link="/" items={pregnancyItems}/>
        </section>
        <section className="videos-grid my-5">
            <VideoGrid title="ABANDONMENT" link="/" items={pregnancyItems}/>
        </section>
        <Banner2/>
        </>
    )
}