import {Link, Outlet, useLocation} from "react-router-dom";
 import Footer from './Footer'
import { useState } from "react";
function Layout(settings) {
    const location = useLocation(); // Get the current route
 const  apiUrl = process.env.REACT_APP_API_URL;
 const [show, setShow] = useState(false);

return (
 <>
 <header className="navigation">
  <div className="header-top ">
    <div className="container">
      <div className="row justify-content-between align-items-center">
        <div className="col-lg-2 col-md-4">
          <div className="header-top-socials text-center text-lg-right text-md-left">
           
            <a href="https://t.me/AitbetCOM" target="_blank" rel="noreferrer"  aria-label="github"><i className="fab fa-telegram"></i> Telegram</a>

          </div>
        </div>
        <div className="col-lg-10 col-md-8 text-center text-lg-right text-md-right">
          <div className="header-top-info mb-2 mb-md-0">
            <a href="mailto:support@gmail.com"><i className="fas fa-envelope mr-2"></i><span>support@gmail.com</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="navbar">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <nav className="navbar navbar-expand-lg px-0 py-4">
            <Link className="navbar-brand" to="/">
             
              <img src={apiUrl+'/img/'+settings.settings.logo_full} alt={settings.settings.name_company} style={{width:'180px'}} />
            </Link>
      
            <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarsExample09"
              aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
              <span className="fa fa-bars"></span>
            </button>
      
            <div className="collapse navbar-collapse text-center" id="navbarsExample09">
              <ul className="navbar-nav ml-auto">
                <li className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
                  <Link className="nav-link" to="/">Home</Link>
                </li>
               
             
                <li className={`nav-item ${location.pathname === "/recharge" ? "active" : ""}`}><Link className="nav-link" to="/recharge">Recharge</Link></li>
                <li className={`nav-item ${location.pathname === "/Retirer" ? "active" : ""}`}><Link className="nav-link" to="/Retirer">Retirer</Link></li>
                <li className={`nav-item ${location.pathname === "/contact" ? "active" : ""}`}><Link className="nav-link" to="/contact">Contactez Nous</Link></li>
              </ul>
      
              <div className="my-2 my-md-0 ml-lg-4 text-center d-none">
                <Link to="/recharge" className="btn btn-solid-border btn-round-full">Recharger </Link>
              </div>
              <button
        className="btn btn-solid-border btn-round-full"
        onClick={() => setShow(true)}
      >
        Vidéo explicative
      </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</header>


<Outlet></Outlet>

<Footer></Footer>

{show && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Vidéo Explicative</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShow(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                {/* YouTube Video */}
                <div className="embed-responsive embed-responsive-16by9">
                <iframe
                    className="embed-responsive-item"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    allowFullScreen
                    title="Explicative Video"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
 </>
)
}
export default Layout;