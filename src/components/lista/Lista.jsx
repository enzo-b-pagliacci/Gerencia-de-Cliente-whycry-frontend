import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../img/logo.png";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function Lista() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch("https://rm87203backendwhycry1.azurewebsites.net/api/cliente")
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        setClientes(resp);
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) =>{
    fetch("https://rm87203backendwhycry1.azurewebsites.net/api/cliente" + id, {
      method: "DELETE"
    }).then(() => {
      window.location = "/lista"
    }).catch((error) => {
      console.log(error);
    })
  }

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
        <Link to="/cadastro">
          <button
            className="btn"
            style={{ color: "#68aace", backgroundColor: "white" }}
          >
            <FontAwesomeIcon
              icon={solid("plus")}
              style={{ fontSize: "25px" }}
            />
          </button>
        </Link>
      </div>
      <div className="box boxShadow">
        <h1 style={{ color: "#68aace", margin: "2%" }}>Lista de Clientes</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ color: "#68aace" }}>ID</th>
              <th style={{ color: "#68aace" }}>Nome</th>
              <th style={{ color: "#68aace" }}>Email</th>
              <th style={{ color: "#68aace" }}>Senha</th>
              <th style={{ color: "#68aace" }}>Genero</th>
              <th style={{ color: "#68aace" }}>Data de nascimento</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.ds_senha}</td>
                <td>{cliente.ds_genero}</td>
                <td>{cliente.dt_nascimento[2] + "/" +cliente.dt_nascimento[1] + "/" + cliente.dt_nascimento[0]}</td>
                <td>
                  <Link to={`/editar/${cliente.id}`}>
                    <button
                      className="btn"
                      style={{ color: "#68aace", marginRight: "10%" }}
                    >
                      <FontAwesomeIcon
                        icon={solid("clipboard")}
                        style={{ fontSize: "20px" }}
                      />
                    </button>
                  </Link>
                  <Link to="/lista" onClick={handleDelete.bind(this, cliente.id)}>
                    <button className="btn" style={{ color: "#dc3545" }}>
                      <FontAwesomeIcon
                        icon={solid("trash")}
                        style={{ fontSize: "20px" }}
                      />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
