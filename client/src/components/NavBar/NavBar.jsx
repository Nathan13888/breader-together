import { useLocation } from 'react-router-dom';
import "../../App.css";

function NavBar() {
    const location = useLocation(); 
    const { pathname } = location;
    const currPage = pathname.split("/")[1];
    const activePage = "text-[#F53C44] ";

  return (
    <div className="bg-white border-b p-4 drop-shadow-lg mb-5">
        <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
                <a href="/" className="text-lg font-semibold text-[#F53C44]">
                <img src="../../../public/breader_icon.jpg" alt="Logo" className="h-8 w-8 mr-3 object-fill inline-block" />breader together!</a>
            </div>
            <ul className="flex space-x-10">
                <li><a href="/create" className={(currPage === "create" ? activePage : "") + " hover:text-[#F53C44]"}>create</a></li>
                <li><a href="/feed" className={(currPage === "feed" ? activePage : "") + " hover:text-[#F53C44]"}>feed</a></li>
                <li><a href="/explore" className={(currPage === "explore" ? activePage : "") + " hover:text-[#F53C44]"}>explore</a></li>
                <li><a href="/challenges" className={(currPage === "challenges" ? activePage : "") + " hover:text-[#F53C44]"}>challenges</a></li>
                <li><a href="/profile" className={(currPage === "profile" ? activePage : "") + " hover:text-[#F53C44]"}>profile</a></li>
                <li><a href="/logout" className="text-gray-400 hover:text-black-500">logout</a></li>
            </ul>
        </div>
    </div>
  );
}

export default NavBar;