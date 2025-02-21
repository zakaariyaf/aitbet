import {BrowserRouter, Routes,Route} from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
 import PageNotFound from "./PageNotFound";
import ContactUS from "./Contact_us";
import Recharge from "../Pages/Recharge";
import RechargeById from '../Pages/RechargeById'
import Retirer from "../Pages/Retirer";
import { useEffect, useState } from "react";
import axios from "axios";
export default function MyApp(){
     const [Settings, setSettings] = useState({});
    const  apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        
        // Fetch the logo URL
        axios.get(apiUrl+"/api/settings/1")  
          .then(response => {
             const logoUrl = response.data.data.logo_light; 
            setSettings(response.data.data)
             updateFavicon(apiUrl+'/img/'+logoUrl);
          })
          .catch(error => console.error("Error fetching favicon:", error));
   

      }, []);
      const updateFavicon = (url) => {
        const link = document.querySelector("link[rel~='icon']");
      
        const cacheBustUrl = `${url}?v=${new Date().getTime()}`; // Add a timestamp to force cache refresh
      
        if (!link) {
          const newLink = document.createElement("link");
          newLink.rel = "icon";
          newLink.href = cacheBustUrl;
          document.head.appendChild(newLink);
        } else {
          link.href = cacheBustUrl;
        }
      };

      
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Layout settings={Settings} />} >
                <Route index element={<Home />} />
                <Route path={'/recharge'} element={<Recharge />} />
                <Route path="/recharge/:id/:name" element={<RechargeById  />} />
                <Route path="/recharge/:id/:name/:id_to/:name_to" element={<RechargeById  />} />
                <Route path={'/Retirer'} element={<Retirer />} />
                <Route path={'/contact'} element={<ContactUS />} />

                
                     <Route path={'*'} element={<PageNotFound />} />

            </Route>
            </Routes>
        </BrowserRouter>
    )
}