import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Recharge(){
    const  storageUrl = process.env.REACT_APP_Storage;

        const [recahrges, setRecahrges] = useState([]);
        useEffect(() => {
            const  apiUrl = process.env.REACT_APP_API_URL;

            // Fetch the logo URL
            axios.get(apiUrl+"/api/pages")  
              .then(response => {
                 setRecahrges(response.data.data)
              })
              .catch(error => console.error("Error fetching favicon:", error));
          }, []);
          const DisplayRecahrges = ()=>{
            if (!Array.isArray(recahrges)) {
                console.error("recahrges is not an array", recahrges);
                return <p>No data available</p>;
            }
            const sortedRecahrges = [...recahrges].sort((a, b) => a.priority - b.priority);

            return sortedRecahrges.map((recharge, key) => (
                 <div  key={key} className={recharge.size} style={{padding:'0px'}}>

                 <Link to={`/recharge/${recharge.id}/${recharge.name}`}>
                 <center>
                 <img src={storageUrl+"/"+recharge.image} alt={recharge.name} style={{width:'80%',margin:'auto',border:"2px solid lightblue",borderRadius:"30px"}} />
                 <br></br>
                    <h5 style={{textAlign:'center'}}>{recharge.name}</h5>
                    </center>
                </Link> </div> 
            ));
          }
    return (<div className="container">
    <h1 style={{textAlign:'center'}}>
    Recharger votre compte 1xebt et Betwinner

    </h1>
    <h3>
    Choisissez votre méthode de payement et charger votre compte 1xbet ou Betwinner plus facile et rapide chez AitBet.com
    </h3>
        <div className="row">
            {DisplayRecahrges()}
        </div>
    </div>)
}