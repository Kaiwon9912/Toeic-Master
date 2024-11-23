function PartCard(props)
{
    const percent = (props.learned/props.number)*100;

    return (
        <>
        <div className="cursor-pointer w-96 border-b mt-1 border-black">
          
            <div className="items-center text-xl p-2  flex justify-between ">
                Part {props.id}: {props.title}
                <div className="relative w-12 h-12 flex items-center justify-center">

        <div className="w-full max-w-sm">
            <div className="flex items-center">
            <div className="text-sm font-semibold text-gray-700 text-center">
        {percent}%
      </div>
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
    
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        ></div>
      </div>

            </div>
       

    
    </div>
      

    </div>
            </div>
        
            <div className="p-2 space-y-2 hidden">
           
         
            <p className="text-xl"><i class="fa-solid fa-question text-purple-600 w-5 "></i> Số câu hỏi: {props.number} </p>
            <p className="text-xl"><i class="fa-solid fa-check text-green-400 w-5 "></i> Số câu đã làm: {props.learned} </p>
            <p className="text-xl"><i class="fa-solid fa-xmark text-red-500 w-5"></i>Số câu sai: {props.incorrect} </p>
        
        
           <div className="flex">
         
            <div className="w-full overflow-hidden bg-gray-400 rounded-full ">
            <div style={{ width: `${percent}%` }} className="bg-blue2 text-white text-center pl-2"> {percent}%</div>

            </div>
           </div>
 
           
         
            </div>
        </div>
        </>
    );
} export default PartCard;