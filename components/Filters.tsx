export default function index ({ }) {
  return (
    <div className="flex items-center justify-between">
        <div className="flex items-center">      
            <p className="pr-5">Filter By</p>
            <div className="inline-flex" id="main_menu">
                <ul className="flex flex-wrap p-1 rounded text-sm md:text-base bg-white border-2" id="menu_nav">
                    <li className="relative mx-1 px-1 py-2 group border-gray-500 mb-1 md:mb-0" id="button_home">
                        <a className="font-semibold whitespace-no-wrap text-blue-600 hover:text-blue-800" 
                        href="http://www.italiansubs.local:8081/forum/index.php">
                            <span className="last firstlevel">All</span>
                        </a>
                    </li>
                    <li className="relative mx-1 px-1 py-2 group border-gray-500 mb-1 md:mb-0" id="button_admin">
                        <a className="font-semibold whitespace-no-wrap text-gray-600 hover:text-blue-800" 
                        href="http://www.italiansubs.local:8081/forum/index.php?action=admin">
                            <span className="firstlevel">Drafts</span>
                        </a>
                    </li>
                    <li className="relative mx-1 px-1 py-2 group border-gray-500 mb-1 md:mb-0" id="button_moderate">
                        <a className="font-semibold whitespace-no-wrap text-gray-600 hover:text-blue-800" 
                        href="http://www.italiansubs.local:8081/forum/moderate/">
                            <span className="firstlevel">Published</span>
                        </a>
                    </li>
                    <li className="relative mx-1 px-1 py-2 group border-gray-500 mb-1 md:mb-0" id="button_profile">
                        <a className="font-semibold whitespace-no-wrap text-gray-600 hover:text-blue-800" 
                        href="http://www.italiansubs.local:8081/forum/profile/">
                            <span className="firstlevel">Favorites</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="join">
            <button className="join-item btn text-black/50">PAGE 1 of 1</button>
            &nbsp;
            &nbsp;
            <button className="join-item btn text-black/50">«</button>
            &nbsp;
            &nbsp;
            <button className="join-item btn text-black/50">»</button>
        </div>
    </div>
  )
}
