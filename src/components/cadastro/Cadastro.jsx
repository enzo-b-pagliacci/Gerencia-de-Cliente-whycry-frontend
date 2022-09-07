import React, {useState} from 'react' 
import {useNavigate, Link} from 'react-router-dom'

export default function Lista(){
    const [novo, setNovo] = useState({
        nome: "",
        email: ""
    })
    const navigate = useNavigate();


    const handleChange = (e) => {
        setNovo({ ...novo, [e.target.name]: e.target.value })
    }


    const handleSubmit = (e) =>{
        e.preventDefault()

        fetch("http://localhost:8080/api/user", {
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
        return navigate('/lista')
        })
    }


    return (
      <div className="App">
        <Link to="/lista">Listar</Link>
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