import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Retirer = () => {
  const [applicationJoueurs, setApplicationJoueurs] = useState([]);
  const [formData, setFormData] = useState({
    app_joueur: "",
    id_joueur: "",
    code_tirage: "",
    choix_bank: "",
    nom_joueur: "",
    rib_joueur: "",
    phone_joueur: ""
  });

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    axios
      .get(`${apiUrl}/api/application_joueurs`)
      .then((response) => {
        setApplicationJoueurs(response.data.data);
      })
      .catch((error) => console.error("Error fetching applications:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;

    try {
      const response = await axios.post(`${apiUrl}/api/retirer`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response);
      Swal.fire({
        title: "Succès",
        text: "Retrait effectué avec succès.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Erreur",
        text: "Une erreur est survenue lors de la soumission.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="container">
      <br />
      <h1 className="text-center">Retirer l'argent de votre compte 1xbet ou Betwinner</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="app_joueur">Application de Joueur <span style={{ color: 'red' }}>*</span></label>
          <select className="form-control" id="app_joueur" value={formData.app_joueur} onChange={handleChange} required>
            <option value="">- Sélectionner -</option>
            {applicationJoueurs.map((app) => (
              <option key={app.id} value={app.id}>{app.name}</option>
            ))}
          </select>
        </div>

        {['app_joueur', 'id_joueur', 'code_tirage',   'nom_joueur', 'rib_joueur', 'phone_joueur'].map((field) => {
  // Check if the field should be an integer or string and set input type accordingly
  const isIntegerField = ['app_joueur', 'id_joueur', 'code_tirage'].includes(field);
  const inputType = isIntegerField ? 'number' : 'text';

  return (
    <div className="form-group" key={field}>
      <label htmlFor={field}>{field.replace('_', ' ').toUpperCase()} <span style={{ color: 'red' }}>*</span></label>
      <input
        type={inputType}
        id={field}
        required
        className="form-control"
        value={formData[field] || ''}
        onChange={handleChange}
        min={isIntegerField ? 1 : undefined} // Add min attribute for integer fields if necessary
      />
    </div>
  );
})}

        <div className="form-group">
          <label htmlFor="choix_bank">Choix de banque <span style={{ color: 'red' }}>*</span></label>
          <select className="form-control" id="choix_bank" value={formData.choix_bank} onChange={handleChange} required>
            <option value="">- Choix -</option>
            {["CIH EXPRESS", "BARID EXPRESS", "ATTIJARI EXPRESS", "WAFACASH", "JIBI", "CASHPLUS", "CASHPLUS MOBILE"].map((bank) => (
              <option key={bank} value={bank}>{bank}</option>
            ))}
          </select>
        </div>

        <br />
        <button className="btn btn-main">Envoyer</button>
      </form>
    </div>
  );
};

export default Retirer;
