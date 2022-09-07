import React, {useState, useEffect} from 'react' 
import {Link} from 'react-router-dom'

export default function Lista(){
    const [clientes, setClientes] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/api/user").then((resp) => {
        return resp.json();
        }).then((resp) => {
        setClientes(resp);
        console.log(resp);
        }).catch((error) => {
        console.log(error);
        })
    },[])

    return (
        <div className="App">
          <Link to="/cadastro">Cadastrar</Link>
          <div>
            <h1>Lista de Clientes</h1>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
}