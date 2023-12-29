import { formType } from "../../type";
import './style.css';
import { FaCircleUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaLink } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

type PasswordProps = {
  list : formType[];
  onRemoveItem : (value:string) => void,
  showPassword : boolean
}

function PasswordList({list,onRemoveItem,showPassword} : PasswordProps){

  return(
    list.map((item)=>(
      <div className="card-container" key={item.serviceName}>
      <FaLink /> {' '}
      <a href={item.url} target="_blank">{item.url}</a>
      <hr />
      <FaCircleUser /> {' '}
      <span>{item.login}</span>
      <br />
      <RiLockPasswordFill /> {' '}
      {showPassword ? 
        <span>{item.password}</span>
        :
        <span>******</span>
      }
      <div className="btn-remove">
        <button
        onClick={()=>onRemoveItem(item.serviceName)}
        >
          Remover <MdDeleteForever />
        </button>
      </div>
    </div>
    ))
  );
}

export default PasswordList;