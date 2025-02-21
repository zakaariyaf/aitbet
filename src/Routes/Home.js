import {Link, useNavigate} from 'react-router-dom'
import Slider from '../Pages/Slider'
import { useEffect, useState } from 'react'
import axios from 'axios';
export default function Home(){


const [sliders,setMySliders] = useState([]);
const [application_joueurs, setApplication_Joueurs] = useState([]);
const navigate = useNavigate();

useEffect(() => {
	const  apiUrl = process.env.REACT_APP_API_URL;

   
   axios.get(apiUrl+"/api/sliders")  
	 .then(response => {
		console.log(response.data.data)
		setMySliders(response.data.data)
	    
	 })
	 .catch(error => console.error("Error fetching favicon:", error));
	 axios.get(apiUrl+"/api/application_joueurs")  
	 .then(response => {
		setApplication_Joueurs(response.data.data)
	 })
	 .catch(error => console.error("Error fetching favicon:", error));  
			   
 }, [ ]);
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
	const  storageUrl = process.env.REACT_APP_Storage;
	if (!Array.isArray(recahrges)) {
		console.error("recahrges is not an array", recahrges);
		return <p>No data available</p>;
	}
	const sortedRecahrges = [...recahrges].sort((a, b) => a.priority - b.priority);

	return sortedRecahrges.map((recharge, key) => (
		 <div  key={key}  className='mx-2 ' style={{padding:'5px'}} >

		 
		 <center>
		 <img src={storageUrl+"/"+recharge.logo} alt={recharge.name} style={{
                                    width: "80px",
                                    height: "80px",
                                    margin: "auto",
                                    border: selectedRecharge?.id === recharge.id ? "4px solid blue" : "4px solid #EEA904",
                                    borderRadius: "20px",
                                    cursor: "pointer", transition: 'transform 0.3s ease',
                                }} className="bounce-image"  onClick={() => handleSelection("recharge", recharge)} />
		 
 			</center>
		</div> 
	));
  }
  const [selectedRecharge, setSelectedRecharge] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const handleSelection = (type, item) => {
	if (type === "recharge") {
		setSelectedRecharge(item);
	} else if (type === "app") {
		setSelectedApp(item);
	}
};
const handleSubmit = () => {
	if (selectedRecharge && selectedApp) {
		navigate(`/recharge/${selectedRecharge.id}/${selectedRecharge.name}/${selectedApp.id}/${selectedApp.name}`);
	} else {
		alert("Please select both a recharge and an application.");
	}
};
    return (<>
    
     
<section className="slider text-center" style={{"background":"url('images/aitbetbg.jpg') no-repeat","backgroundSize":"cover"}}>
	<div className="container">
		<div className="row">
			<div className="col-lg-12 col-md-12">
				<div className="block">
					<span className="d-block mb-3 text-white text-capitalize">Prepare for new future</span>
					<h1 className="animated fadeInUp mb-5">Our work is  presentation of our  capabilities.</h1>
					<Link to="/recharge"  className="btn btn-main animated fadeInUp  mx-2" style={{borderRadius:'10px'}} aria-label="Get started">recharger
                    <i className="btn-icon fa fa-angle-right ml-2"></i></Link>
                    <Link to="/retire"  className="btn btn-main animated fadeInUp  mx-2" style={{borderRadius:'10px'}} aria-label="Get started">Retirer<i className="btn-icon fa fa-angle-right ml-2"></i></Link>
				</div>
			</div>
		</div>
	</div>
</section>
 <section className='section container '>
<div className='row'>
<div className='col-6 '>
	<div className="row" style={{boxShadow: '0 0 15px rgba(0, 0, 0, 0.6)', // Soft shadow
  borderRadius: '20px',
  padding: '10px',
  margin: '10px'}}>
	{DisplayRecahrges()}
	</div>
</div>
<div className='col-6'>
<div className='row' style={{boxShadow: '0 0 15px rgba(0, 0, 0, 0.6)', // Soft shadow
  borderRadius: '20px',
  padding: '10px',
  margin: '10px'}}>
{application_joueurs.map((app,key)=>{
		const  storageUrl = process.env.REACT_APP_Storage;

    return  <div  key={key}  style={{padding:'10px'}}>

		 
	<center>
	<img src={storageUrl+"/"+app.logo} alt={app.name} style={{
                                    width: "80px",
                                    height: "80px",
                                    margin: "auto",
                                    border: selectedApp?.id === app.id ? "4px solid blue" : "4px solid #EEA904",
                                    borderRadius: "30px",
                                    cursor: "pointer",    transition: 'transform 0.3s ease',

                                }}   className="bounce-image" 
								onClick={() => handleSelection("app", app)} />
	<br></br>
 	   </center>
   </div> 
})}
</div>
</div>
<div className='col-12'>
<div className="text-center mt-3">
                <button
                    className="btn btn-main "
                    onClick={handleSubmit}
                    disabled={!selectedRecharge || !selectedApp}
                >
                    Proceed
                </button>
            </div>
</div>
</div>
 </section>

  {sliders.map((s,i)=>{
const filesArray = typeof s.files === "string" ? JSON.parse(s.files) : s.files;

const sliderImageUrl = Array.isArray(filesArray) 
  ? filesArray.map(file => ({ url: file.replace(/\\/g, '') })) 
  : [];
 return  	<section className='section ' style={{width:"60%",margin:'auto'}} key={i}>
	<h1>{s.name}</h1>
<Slider sliderImageUrl={sliderImageUrl} ></Slider>
</section>
 
  })}

 
 
 
 
 
 
 
<section className="section testimonial">
	<div className="container">
		<div className="row">
			<div className="col-lg-7 ">
				<div className="section-title">
					<span className="h6 text-color">Clients testimonial</span>
					<h2 className="mt-3 content-title">Check what's our clients say about us</h2>
				</div>
			</div>
		</div>
	</div>

	<div className="container">
		<div className="row testimonial-wrap">
			<div className="testimonial-item position-relative">
				<i className="ti-quote-left text-color"></i>

				<div className="testimonial-item-content">
					<p className="testimonial-text">Quam maiores perspiciatis temporibus odio reiciendis error alias debitis atque
						consequuntur natus iusto recusandae numquam corrupti facilis blanditiis.</p>

					<div className="testimonial-author">
						<h5 className="mb-0 text-capitalize">Zakariya</h5>
						<p>Excutive Director,themefisher</p>
					</div>
				</div>
			</div>
			<div className="testimonial-item position-relative">
				<i className="ti-quote-left text-color"></i>

				<div className="testimonial-item-content">
					<p className="testimonial-text">Consectetur adipisicing elit. Quam maiores perspiciatis temporibus odio reiciendis
						error alias debitis atque consequuntur natus iusto recusandae .</p>

					<div className="testimonial-author">
						<h5 className="mb-0 text-capitalize">Mickel hussy</h5>
						<p>Excutive Director,themefisher</p>
					</div>
				</div>
			</div>
			<div className="testimonial-item position-relative">
				<i className="ti-quote-left text-color"></i>

				<div className="testimonial-item-content">
					<p className="testimonial-text">Quam maiores perspiciatis temporibus odio reiciendis error alias debitis atque
						consequuntur natus iusto recusandae numquam corrupti.</p>

					<div className="testimonial-author">
						<h5 className="mb-0 text-capitalize">James Watson</h5>
						<p>Excutive Director,themefisher</p>
					</div>
				</div>
			</div>
			<div className="testimonial-item position-relative">
				<i className="ti-quote-left text-color"></i>

				<div className="testimonial-item-content">
					<p className="testimonial-text">Consectetur adipisicing elit. Quam maiores perspiciatis temporibus odio reiciendis
						error alias debitis atque consequuntur natus iusto recusandae .</p>

					<div className="testimonial-author">
						<h5 className="mb-0 text-capitalize">Mickel hussy</h5>
						<p>Excutive Director,themefisher</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
  

 

    </>)
}