
import "./App.css";
import { useEffect, useState } from "react";

function App() {


  const [data, setData] = useState([]);
  const [sdata, setSData] = useState([]);
  const [sort, setSort] = useState("name");

  const date={
    year            : 'numeric',    
    month           : 'numeric', 
    day             : 'numeric',  
  }
const time={
    hour            : 'numeric',   
    minute          : 'numeric',  
    second          : 'numeric',   
    timeZone        : 'IST',        
    hour12          : true
  }




  useEffect(() => {
    async function getData() {
      const res = await fetch(
        "https://6508523156db83a34d9c20cf.mockapi.io/api/users"
      );
      const data = await res.json();
      // data.sort((a, b) => b.LoginCount - a.LoginCount);
      setData(data);
      setSData(data);
        console.log(data)

    }
    getData();
  }, []);

  

    function sorting(type){
      setSort(type)
      switch(type){
        case "name":
            setSData(old=>old.sort((a,b)=> a.rollno - b.rollno ))
        break;

        case "currentLogin":
          console.log(type)
          setSData(old=>old.sort((a,b)=> (a.currentLogin === b.currentLogin)? 0 : a.currentLogin? -1 : 1))
          break;
          
        case "gender":
          setSData(old=>old.sort((a,b)=> a.gender > b.gender?-1:1))
          break;
          
          case "lastLogin":
          setSData(old=>old.sort((a,b)=> b.lastLogin - a.lastLogin))
          break;
          
          case "lastLogout":
          setSData(old=>old.sort((a,b)=> b.lastLogout - a.lastLogout))
          break;
          
          case "loginCount":
          setSData(old=>old.sort((a,b)=> b.LoginCount - a.LoginCount))
        break;

        default:
        break;

      }
    }

  return (
    <div className="App">
      
      <select name="" id="" value={sort} onChange={(e)=>sorting(e.target.value)}>
        <option value="name">name</option>
        <option value="currentLogin">current Login</option>
        <option value="loginCount">Login count</option>
        <option value="lastLogin">last Login</option>
        <option value="lastLogout">last Logout</option>
        <option value="gender">gender</option>
      </select>
      {sdata.length?<table>
        <tr>
          <th >No</th>
          <th >Rollno</th>
          <th className={sort==="name"&&"curSort"}>Name</th>
          <th className={sort==="currentLogin"&&"curSort"}>Current Login</th>
          <th className={sort==="loginCount"&&"curSort"}>Login Count</th>
          <th className={sort==="lastLogin"&&"curSort"}>last Login</th>
          <th className={sort==="lastLogout"&&"curSort"}>last Logout</th>
          <th className={sort==="gender"&&"curSort"}>Gender</th>
        </tr>
        
        { sdata.map((item,i) => <tr>
         
          <td>{i+1}</td>
          <td>{item.rollno}</td>
          <td>{item.name}</td>
          <td>{item.currentLogin?"Yes":"No"}</td>
          <td>{item.LoginCount}</td>
          <td>{item.lastLogin?<>
            <p>{new   Intl.DateTimeFormat('en',date).format(new Date(item.lastLogin))}</p>
            <p>{new   Intl.DateTimeFormat('en',time).format(new Date(item.lastLogin))}</p>
          </>:"-"
          }
          </td>
          <td>{item.lastLogout?<>
            <p>{new   Intl.DateTimeFormat('en',date).format(new Date(item.lastLogout))}</p>
            <p>{new   Intl.DateTimeFormat('en',time).format(new Date(item.lastLogout))}</p>
          </>:"-"
          }
          </td>
          <td>{item.gender}</td>
        </tr>)}</table>:
        "Wait"
      }
    </div>
  );
}

export default App;
