
function NavItem(props)
{
    return(
        <>
       <div className="w-32 h-32 cursor-pointer max-w-80 md:w-auto md:h-64 hover:scale-105"> 
            <img className="object-cover w-full h-full" src={props.img} alt={props.title} /> 
            <p className="py-2 font-semibold text-center bg-blue3 md:text-3xl ">{props.title}</p>
        </div>
        </>
    );
} export default NavItem;