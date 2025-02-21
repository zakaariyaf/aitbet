import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const RechargeById = ( ) => {
  const { id,id_to } = useParams(); // Extract parameters
  const [info,setInfo] = useState({})
  const [application_joueurs, setApplication_Joueurs] = useState([]);
  const [numeroRecharge, setNumeroRecharge] = useState("");

const [multi_recharge,setMultiRecharge] =useState(false);
  useEffect(() => {
     const  apiUrl = process.env.REACT_APP_API_URL;

    
    axios.get(apiUrl+"/api/pages/"+id)  
      .then(response => {
        setInfo(response.data.data)
       })
      .catch(error => console.error("Error fetching favicon:", error));
                
               axios.get(apiUrl+"/api/application_joueurs")  
               .then(response => {
                  setApplication_Joueurs(response.data.data)
               })
               .catch(error => console.error("Error fetching favicon:", error));
  }, []);
  const handleSubmit = async  (event) => {
    event.preventDefault(); // Prevent default form submission
    const  apiUrl = process.env.REACT_APP_API_URL;

   
  const formData = new FormData();
  formData.append("app_joueur", document.getElementById("app_joueur").value);
  formData.append("id_recharge_from", id);
  formData.append("id_joueur", document.getElementById("id_joueur").value);
  formData.append("Montant_recharge", document.getElementById("Montant_recharge").value);
  formData.append("selectedAmount", selectedAmount);

  if (info.have_code){
    const response = await axios.get(
      apiUrl+`/api/check-recharge/${numeroRecharge}`
    );
    if (response.data.exists) {
      Swal.fire({
        title: "Erreur",
        text: "Ce numéro de recharge est déjà utilisé.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    formData.append("numero_recharge", document.getElementById("numero_recharge").value);
  } 
  if (info.have_phone) formData.append("phone_joueur", document.getElementById("phone_joueur").value);
  if (info.have_nom) formData.append("nom_joueur", document.getElementById("nom_joueur").value);
  if (info.multi_recharge && multi_recharge) {
    formData.append("numero_recharge2", document.getElementById("numero_recharge2")?.value || "");
    formData.append("numero_recharge3", document.getElementById("numero_recharge3")?.value || "");
    formData.append("numero_recharge4", document.getElementById("numero_recharge4")?.value || "");
  }

  const recuFile = document.getElementById("recu")?.files[0];
  if (recuFile) formData.append("recu", recuFile);
    // Make sure the recharge number is not already used
    
  try {
    const response = await axios.post(apiUrl+"/api/recharges", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
     
    console.log("Response:", response.data);
    Swal.fire({
      title: "Succès",
      text: "Recharge effectuée avec succès.Code Command" + response.data.data.id,
      icon: "success",
      confirmButtonText: "OK",
    });  } catch (error) {
      Swal.fire({
        title: "Erreur",
        text: "Une erreur est survenue lors de la soumission.",
        icon: "error",
        confirmButtonText: "OK",
      });  }
    // Send data to backend or process it as needed
  };
  const [selectedAmount, setSelectedAmount] = useState(20);

  const handleSelectAmount = (amount) => {
    setSelectedAmount(amount);
  };
  const handleInputChange = (e) => {
    setSelectedAmount(e.target.value);
  };
  return (
    <div className="container  ">
      <br/>
      <h1 className="text-center">Recharger votre compte par {info.name}</h1>
       
      <div dangerouslySetInnerHTML={{__html :info.description }} /> 
      <form onSubmit={handleSubmit}>
      <div className="form-group">
            <label htmlFor="id_joueur">Application de Joueur <span style={{color:'red'}}>*</span></label>
<select className="form-control" id="app_joueur">
{application_joueurs.map((app,key)=>{
 return <option key={key} value={app.id} selected={Number(id_to) !== undefined && Number(id_to) === app.id}>{app.name}</option>
})}
</select>
        </div>
        <div className="form-group">
            <label htmlFor="id_joueur">Identifiant Joueur <span style={{color:'red'}}>*</span></label>
        <input type="number" id="id_joueur" required  className="form-control" />
        </div>
        <label htmlFor="id_joueur">Montant à charge <span style={{color:'red'}}>*</span></label>

        <div className="form-group input-group  ">
        <br/>
  <input type="number" id="Montant_recharge" min={info.Montant} required  className="form-control"         value={selectedAmount}
 onChange={handleInputChange}  />
  
   <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1">DH</span>
  </div>
</div>
<center >
        <div className="btn-group btn-group-toggle  row" data-toggle="buttons">
 

  {[20, 50, 100, 200].map((amount) => (
          <label
            key={amount}
            className={`btn mx-2 ${selectedAmount === amount ? "btn-main" : "btn-outline-warning"}`}
            onClick={() => handleSelectAmount(amount)} style={{padding :'0.5rem 1rem  '}}
          >
            <input type="radio" name="amount" value={amount} className="d-none" />
            {amount} DH
          </label>
  ))}

</div>
</center>
{
    info.have_code ? 
    <div className="form-group">
    <label htmlFor="id_joueur">Numéros de recharge <span style={{color:'red'}}>*</span></label>
<input type="number" id="numero_recharge" required  className="form-control" onChange={(e) => setNumeroRecharge(e.target.value)}  />
</div> : ''
}
{
    info.have_phone ? 
    <div className="form-group">
    <label htmlFor="phone_joueur">Numéros de Telephone <span style={{color:'red'}}>*</span></label>
<input type="number" id="phone_joueur" required  className="form-control"   />
</div> : ''
}

{
    info.have_nom ? 
    <div className="form-group">
    <label htmlFor="nom_joueur">Nom Complet<span style={{color:'red'}}>*</span></label>
<input type="text" id="nom_joueur" required  className="form-control"   />
</div> : ''
}
{
    info.multi_recharge ? <>
    <div className="custom-control custom-switch">
  <input type="checkbox" className="custom-control-input" id="multi_recharge" onChange={()=>{
    setMultiRecharge(document.querySelector('#multi_recharge').checked)
  }}  />
  <label className="custom-control-label" for="multi_recharge">Ajouter une autre recharge: (Recharge Plus) <span style={{color:'red'}}>*</span></label>
</div>
    
   </> : ''
}
{
    info.multi_recharge && multi_recharge ? 
    <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12 ">
        <input type="number" id="numero_recharge2" required placeholder="Numéros de recharge 1"  className="form-control"   />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 ">
        <input type="number" id="numero_recharge3"   placeholder="Numéros de recharge 2"  className="form-control"   />

         </div>
         <div className="col-lg-4 col-md-6 col-sm-12 ">
        <input type="number" id="numero_recharge4"   placeholder="Numéros de recharge 3"  className="form-control"   />

         </div>

    </div> : ''
}
{
    info.have_image ? 
   <><br/>
    <div className="custom-file form-group ">
       
<input type="file" id="recu" required  className="custom-file-input"   />

    <label htmlFor="id_joueur" className="custom-file-label">Image de transaction  <span style={{color:'red'}}>*</span></label>
</div></> : ''
}
<br/><br/>
   <button className="btn btn-main">Envoyer</button>
      </form>
    </div>
  );
};

export default RechargeById;