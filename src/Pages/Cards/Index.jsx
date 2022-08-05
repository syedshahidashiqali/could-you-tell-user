import { useEffect, useState } from "react";
import SavedCards from "../../Components/SavedCards";
import { getSavedCards } from "../../Services/Card";

export default function Cards() {
   /*  const [cards, setCards] = useState([]);
    const fetch = async ()=>{
        let {cards} = await getSavedCards();
        setCards(cards);
    } 
    
    useEffect(()=>{
        fetch();
    },[]); */

    return (
        <section className="virtual-events text-white">
            <div className="container py-5">
                <div className="row py-5 align-items-center">
                    <div className="col-12 text-start">
                        <h1 className="heading-lvl-one mb-4 d-flex align-items-center">
                            Saved Cards
                        </h1>
                    </div>
                </div>
                {/* no subscriptions alert box */}
                <div className="container">
                    <div className="row justify-content-center justify-content-lg-between align-items-center">
                        <div className="col-xxl-6 col-lg-6 col-md-10 text-center">
                            <SavedCards isDeleted={true}></SavedCards>
                        </div>
                        <div className="col-xxl-5 col-lg-6 col-md-10">
                            <div id="cards" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
