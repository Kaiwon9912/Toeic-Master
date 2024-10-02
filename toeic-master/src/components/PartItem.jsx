function PartItem(props)
{
    return (
        <>
        <div className="m-10 shadow-xl cursor-pointer rounded-2xl w-72 bg-blue5 hover:scale-105">
            <div className="flex items-center justify-center h-16 bg-blue-3 bg-blue3">
            <p className="text-3xl font-bold text-center text-white ">Part 5</p>
            </div>
            <div className="p-4 mt-2 space-y-3">
            <h1 className="text-2xl font-bold">{props.title}</h1>
         
            <p className="text-xl"><i class="fa-solid fa-question text-purple-600 w-5 "></i> Số câu hỏi: {props.number} </p>
            <p className="text-xl"><i class="fa-solid fa-check text-green-400 w-5 "></i> Số câu đã làm: {props.learned} </p>
            <p className="text-xl"><i class="fa-solid fa-xmark text-red-500 w-5"></i>Số câu sai: {props.correct} </p>
        
        
           <div className="flex">
         
            <div className="w-full overflow-hidden bg-gray-400 rounded-full ">
                <div className="bg-blue2 w-[80%]  text-white text-center"> 80%</div>
            </div>
           </div>
 
           
         
            </div>
        </div>
        </>
    );
} export default PartItem;