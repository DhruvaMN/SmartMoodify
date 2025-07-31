import axios from "axios";
import { useEffect } from "react";

export default function App(){
  useEffect(()=>{
    axios.get("http://localhost:3050/api/test-endpoint")
    .then((res)=>{
      console.log(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])
  return(
    <div>
      <h1>hello world</h1>
    </div>
  )
}