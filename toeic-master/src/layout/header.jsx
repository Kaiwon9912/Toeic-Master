import {React,useState} from "react";
function Header()
{
    const [isOpen,setIsOpen] = useState(true);
    
    return(
        <> 
        <div className="bg-blue1">
        <div className="flex items-center justify-between w-full h-16 px-5 m-auto overflow-hidden text-white max-w-7xl">
      
       
      <p class="font-irish md:text-xl  uppercase w-20 font-bold">Toeic Master</p>
      
    
    
 
     
      <div className="z-50 w-8">
       
       <a href="#/Login"><img  src="https://cdn-icons-png.flaticon.com/128/3899/3899618.png"/></a>
      </div>
      </div>
     
      <div className={`fixed  w-12 mt-20 z-50 h-[50%] rounded- bg-blue4 transition-all ${isOpen?'left-0':'-left-12'} `}>
          <div className="flex justify-end w-20 p-1 border-2 border-white bg-blue4"><img className={`w-4 cursor-pointer ${isOpen?'-scale-x-100':'scale-x-100'}`} onClick={()=>setIsOpen(!isOpen)}  src="https://cdn-icons-png.flaticon.com/128/54/54366.png"></img></div>
          <ul className="px-1 space-y-3 ">
              <li className="p-2 rounded-full hover:bg-blue3 "><img src="https://cdn-icons-png.flaticon.com/512/25/25694.png"/></li>
              <li className="p-2 rounded-full hover:bg-blue3"><img src="https://cdn-icons-png.flaticon.com/512/27/27130.png"/> </li>
              <li className="p-2 rounded-full hover:bg-blue3"><img src="https://cdn-icons-png.flaticon.com/128/171/171322.png"/> </li>
              <li className="p-2 rounded-full hover:bg-blue3"><img src="https://cdn-icons-png.flaticon.com/128/3980/3980755.png"/> </li>
              <li className="p-2 rounded-full hover:bg-blue3"><img src="https://cdn-icons-png.flaticon.com/128/9239/9239986.png"/> </li>
          </ul>

      </div>
        </div>
      
        </> 
    )
} export default Header;
