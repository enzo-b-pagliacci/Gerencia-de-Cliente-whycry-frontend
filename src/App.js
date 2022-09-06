import React, {useState, useEffect} from 'react' 
import './App.css';

function App() {

  const [clientes, setClientes] = useState([])

  useEffect(() => {
    fetch("http://rm87203whycrytest.azurewebsites.net/api/user/").then((resp) => {
      return resp.json();
    }).then((resp) => {
      setClientes(resp);
      console.log(resp);
    }).catch((error) => {
      console.log(error);
    })
  },[])

  const [novo, setNovo] = useState({
    nome: "",
    email: ""
  })


  const handleChange = (e) => {
    setNovo({ ...novo, [e.target.name]: e.target.value })
  }


  const handleSubmit = (e) =>{
    e.preventDefault()

    fetch("http://rm87203whycrytest.azurewebsites.net/api/user", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome: novo.nome,
        email: novo.email
      })
    }).then(() => {
      console.log(novo)
    })
  }

 







  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div>
            <label>Nome: </label>
            <input type="text" name="nome" value={novo.nome} onChange={handleChange} />
          </div>
          <div>
            <label>Email: </label>
            <input type="text" name="email" value={novo.email} onChange={handleChange} />
          </div>
          <div>
            <button type="submit"  >Cadastrar</button>
          </div>
        </fieldset>
      </form>

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

export default App;
