import { useState } from "react";

function Form() {
  const [enableForm,setEnableForm] = useState(false);

  const [nameAlert,setNameAlert] = useState(false);
  const [loginAlert,setLoginAlert] = useState(false);
  const [urlAlert,setUrlAlert] = useState(false);
  const [passWordAlert,setPasswordAlert] = useState('');

  const [formInfo,setFormInfo] = useState<Record<string, string>>({})
  const [enableBtn,setEnableBtn] = useState(true);
  
  function checkEnableBtn() {
    const formCopy = formInfo
    if(Object.values(formCopy).length>3 && !nameAlert && !loginAlert 
    && passWordAlert.length===0 && !urlAlert){
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
      setPasswordAlert('*min 8 max 16 caracteres \n *min 1 caracter especial \n *senha deve conter letras e números')
    }
    else{
      setPasswordAlert('')
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
      <form>
        <label>
          Nome do Serviço : 
          <input 
          type="text" 
          onBlur={(event)=>inputNameAndLoginHandler(event)}
          onChange={(event)=>inputsHandler(event)}
          name = 'serviceName'
          />
          {nameAlert ? <p>Nome é obrigatório</p> : ''}
        </label>
        <label>
          Login : 
          <input 
          type="text"  
          onBlur={(event)=>inputNameAndLoginHandler(event)}
          onChange={(event)=>inputsHandler(event)}
          name = 'login'
          />
          {loginAlert ? <p>Login é obrigatório</p> : ''}
        </label>
        <label>
          Senha : 
          <input 
          type="password"
          onBlur={({target})=>inputPasswordHandler(target.value)}
          onChange={(event)=>inputsHandler(event)}
          name = 'password' 
          />
          {passWordAlert.length ? passWordAlert:''}
        </label>
        <label>
          URL : 
          <input 
          type="text" 
          onChange={(event)=>inputsHandler(event)}
          name = 'url'
          onBlur={(event)=>inputNameAndLoginHandler(event)}
          />
          {urlAlert ? <p>URL é obrigatório</p> : ''}
        </label>
        <button
        disabled={enableBtn}
        >
          Cadastrar
        </button>
        <button onClick={btnNewPassowrdHandler}>Cancelar</button>
      </form> 
      : 
      <button onClick={btnNewPassowrdHandler}>
        Cadastrar nova senha
      </button> }  
    </div>
  );
}

export default Form; 