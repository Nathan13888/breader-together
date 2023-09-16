
function NavBar() {
  return (
    <div className="bg-white border-b border-gray-400 p-4">
        <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
                {/* Logo/Icon Image */}
                <img src="../../../public/breader_icon.jpg" alt="Logo" className="h-8 w-8 mr-3" />
                <a href="/" className="text-lg font-semibold text-red-500">breader together!</a>
            </div>
            <ul className="flex space-x-10">
                <li><a href="/create" className="hover:text-red-300">create</a></li>
                <li><a href="/feed" className="hover:text-red-300">feed</a></li>
                <li><a href="/explore" className="hover:text-red-300">explore</a></li>
                <li><a href="/challenges" className="hover:text-red-300">challenges</a></li>
                <li><a href="/logout" className="hover:text-red-300">logout</a></li>
            </ul>
        </div>
    </div>
  );
}

export default NavBar;