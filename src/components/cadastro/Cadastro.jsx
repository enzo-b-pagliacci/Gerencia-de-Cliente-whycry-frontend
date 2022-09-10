import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Lista(props) {

  let { id } = useParams();

  const navigate = useNavigate();

  console.log(id)

  const [novo, setNovo] = useState({
    nome: "",
    email: "",
    ds_senha: "",
    ds_genero: "",
    dt_nascimento: ""
  });

  let metodo = "post"
  if(id){
    metodo = "put"
  }


  const handleChange = (e) => {
    setNovo({ ...novo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://rm87203backendwhycry1.azurewebsites.net/api/cliente/" + (id? id : ""), {
      method: metodo,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: novo.nome,
        email: novo.email,
        ds_senha: novo.ds_senha,
        ds_genero: novo.ds_genero,
        dt_nascimento: novo.dt_nascimento
      }),
    }).then(() => {
      console.log(novo);
      return navigate("/lista");
    });
  };


  useEffect(() => {
    if(id){
      fetch("https://rm87203backendwhycry1.azurewebsites.net/api/cliente/" + id)
      .then((resp) => {
        return(resp.json())
      }).then((data) => {
        setNovo(data)
      })
    }
  }, [id])

  return (
    <div className="App">
      <div className="boxShadow" style={{ backgroundColor: "white" }}>
        <img src={Logo} alt="Logo" style={{ width: "350px", height: "auto" }} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginRight: "5%",
          marginTop: "2%",
        }}
      >
        <Link to="/lista">
          <button
            className="btn"
            style={{ color: "#68aace", backgroundColor: "white" }}
          >
            <FontAwesomeIcon
              icon={solid("list")}
              style={{ fontSize: "25px" }}
            />
          </button>
        </Link>
      </div>
      <form className="box boxShadow" onSubmit={handleSubmit}>
        <h1 style={{ color: "#68aace", margin: "2%" }}>{id? 'Edição de clientes' : 'Cadastro de clientes'}</h1>
        <fieldset>
          <div style={{ marginTop: "3%", marginBottom: "3%", display: 'flex', justifyContent: 'center' }}>
            <label style={{ width: '20%' }}>Nome: </label>
            <input
              style={{
                backgroundColor: "#b5cde1",
                border: "1px solid #b5cde1",
                borderRadius: "5px",
                width: '20%'
              }}
              type="text"
              name="nome"
              value={novo.nome}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginTop: "3%", marginBottom: "3%", display: 'flex', justifyContent: 'center' }}>
            <label style={{ width: '20%' }}>Email: </label>
            <input
              style={{
                backgroundColor: "#b5cde1",
                border: "1px solid #b5cde1",
                borderRadius: "5px",
                width: '20%'
              }}
              type="text"
              name="email"
              value={novo.email}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginTop: "3%", marginBottom: "3%", display: 'flex', justifyContent: 'center' }}>
            <label style={{ width: '20%' }}>Senha: </label>
            <input
              style={{
                backgroundColor: "#b5cde1",
                border: "1px solid #b5cde1",
                borderRadius: "5px",
                width: '20%'
              }}
              type="text"
              name="ds_senha"
              value={novo.ds_senha}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginTop: "3%", marginBottom: "3%", display: 'flex', justifyContent: 'center' }}>
            <label style={{ width: '20%' }}>Genero: </label>
            <select
              style={{
                backgroundColor: "#b5cde1",
                border: "1px solid #b5cde1",
                borderRadius: "5px",
                width: '20%'
              }}
              type="text"
              name="ds_genero"
              value={novo.ds_genero}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="MA">MA</option>
              <option value="FE">FE</option>
              <option value="NB">NB</option>
            </select>
          </div>
          <div style={{ marginTop: "3%", marginBottom: "3%", display: 'flex', justifyContent: 'center' }}>
            <label style={{ width: '20%' }}>Data de Nascimento: </label>
            <input
              style={{
                backgroundColor: "#b5cde1",
                border: "1px solid #b5cde1",
                borderRadius: "5px",
                width: '20%'
              }}
              type="date"
              name="dt_nascimento"
              value={novo.dt_nascimento}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginTop: "3%", marginBottom: "3%" }}>
            <button
              className="btn"
              style={{ backgroundColor: "#68aace", color: "white" }}
              type="submit"
            >
              {id? 'Salvar' : 'Cadastrar'}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
