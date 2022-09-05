import React, {useState} from 'react' 
import './App.css';

function App() {
  const [novo, setNovo] = useState({
    nome: "",
    email: ""
  })


  const handleChange = (e) => {
    setNovo({ ...novo, [e.target.name]: e.target.value })
  }


  const handleSubmit = (e) =>{
    e.preventDefault()

    fetch("http://localhost:8080/api/user/", {
      method: "POST",
      headers: {
        Accept: 'aplication/json',
        "Content-Type": "aplication/json"
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
    </div>
  );
}

export default App;
