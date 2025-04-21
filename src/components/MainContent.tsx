import { FC, createElement } from 'react'
import "../styles/MainContent.css"

interface MainContentProps {
    currentPage: string;
    currentPageComponent: FC;
}

const MainContent: FC<MainContentProps> = ({currentPage, currentPageComponent}) => {

    return (
        <div className='main-content'>
            <h2>{ currentPage }</h2>
            <>{createElement(currentPageComponent)}</>
        </div>
    );
};

export default MainContent;