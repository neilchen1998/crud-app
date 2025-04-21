import { FC, Fragment} from 'react'
import "../styles/Sidebar.css";


interface SidebarPros {
    pages: {name: string}[];
    onPageChange: (page: string) => void;
    currentPage: string;
}

const Sidebar: FC<SidebarPros> = ({ pages, onPageChange, currentPage }) => {

    return (
        <div className='sidebar'>
            <h2>Navigation</h2>
            <ul>
                {
                    pages.map((page) => (
                        <button className={`sidebar-button-${currentPage === page.name ? 'active' : ''}` }
                            key={page.name}
                            onClick={() => onPageChange(page.name)} 
                            style={{cursor: "pointer",}}>
                            {page.name}
                        </button>
                    ))
                }
            </ul>
        </div>
    );
};

export default Sidebar;