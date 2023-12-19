import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

function Form() {
  const [enableForm,setEnableForm] = useState(false);

  const [nameAlert,setNameAlert] = useState(false);
  const [loginAlert,setLoginAlert] = useState(false);
  const [urlAlert,setUrlAlert] = useState(false);
  const [passWordAlert,setPasswordAlert] = useState(false);

  const [formInfo,setFormInfo] = useState<Record<string, string>>({})
  const [enableBtn,setEnableBtn] = useState(true);
  
  function checkEnableBtn() {
    const formCopy = formInfo
    if(Object.values(formCopy).length>3 && !nameAlert && !loginAlert 
    && !passWordAlert && !urlAlert){
      setEnableBtn(false);
    } else {
      setEnableBtn(true);
    }
  }

  function btnNewPassowrdHandler() {
    setEnableForm(true);
  }
  function inputPasswordHandler(value : string){
    const hasNumberLetters = /[a-zA-Z]+.*[0-9]+|[0-9]+.*[a-zA-Z]+/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]+/;
    if(value.length < 8 || value.length > 16 || !hasNumberLetters.test(value)
    ||!hasSpecialChar.test(value)) {
      setPasswordAlert(true)
    }
    else{
      setPasswordAlert(false)
    }
  }
  function inputNameAndLoginHandler(event : React.FocusEvent<HTMLInputElement>){
    if(event.target.value.length <= 0){
      if(event.target.name === 'serviceName') setNameAlert(true)
      if(event.target.name === 'login') setLoginAlert(true)
      if(event.target.name === 'url') setUrlAlert(true)
    } else {
      if(event.target.name === 'serviceName') setNameAlert(false)
      if(event.target.name === 'login') setLoginAlert(false)
      if(event.target.name === 'url') setUrlAlert(false)
    }
  }
  function inputsHandler(event : React.ChangeEvent<HTMLInputElement>){
    const {name,value} = event.target;
    setFormInfo({
      ...formInfo,
      [name]:value,
    })
    checkEnableBtn();
  }
  return (
    <div>
      {enableForm ? 
      <form className="form">
        <label className="form-label">Nome do Serviço :</label>
          <input 
            type="text" 
            className="form-control bg-dark text-light border-light" 
            placeholder="Example input placeholder"
            onBlur={(event)=>inputNameAndLoginHandler(event)}
            onChange={(event)=>inputsHandler(event)}
            name = 'serviceName'
          />
        {nameAlert ? <p>Nome é obrigatório</p> : ''}
          <label className="form-label">Login :</label>
            <input 
              type="text" 
              className="form-control bg-dark text-light border-light" 
              placeholder="Example input placeholder"
              onBlur={(event)=>inputNameAndLoginHandler(event)}
              onChange={(event)=>inputsHandler(event)}
              name = 'login'
            />
          {loginAlert ? <p>Login é obrigatório</p> : ''}
          <label className="form-label">Senha :</label>
          <input 
            type="password"
            className="form-control bg-dark text-light border-light" 
            onBlur={({target})=>inputPasswordHandler(target.value)}
            onChange={(event)=>inputsHandler(event)}
            name = 'password' 
          />
         {passWordAlert ? 
          <div className="passoword-errors">
            <p>Possuir 8 ou mais caracteres</p>
            <p>Possuir até 16 caracteres</p>
            <p>Possuir algum caractere especial</p>
            <p>Possuir letras e números</p>
          </div>
         :''}
        <label className="form-label">URL :</label>
          <input 
            type="text" 
            className="form-control bg-dark text-light border-light" 
            onChange={(event)=>inputsHandler(event)}
            name = 'url'
            onBlur={(event)=>inputNameAndLoginHandler(event)}
          />
        {urlAlert ? <p>URL é obrigatório</p> : ''}
        <div className="btn-group">
          <button 
            disabled={enableBtn}
            type="button" 
            className="btn btn-success"
            >Cadastrar
          </button>
          <button 
            onClick={btnNewPassowrdHandler} 
            type="button" 
            className="btn btn-danger"
            >Cancelar
          </button>
        </div>
      </form> 
      : 
      <button type="button" className="btn btn-primary" onClick={btnNewPassowrdHandler}>
        Cadastrar nova senha
      </button>}  
    </div>
  );
}

export default Form; 