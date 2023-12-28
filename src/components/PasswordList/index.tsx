import { formType } from "../../type";

function PasswordList(props : formType){
  return(
    <div className="card-container">
      <p>{props.url}</p>
      <hr />
      <p>login : {props.login}</p>
      <p>senha : {props.password}</p>
    </div>
  );
}

export default PasswordList;