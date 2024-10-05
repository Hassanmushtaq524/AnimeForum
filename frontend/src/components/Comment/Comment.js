import React from 'react'
import { Link } from 'react-router-dom';

function Comment(props) {
    const { text, userId, userName, date } = props;

    /**
     * Put date in the correct format
     */
    const parseDate = (date) => {
        date = date.slice(0, 10);
        return `${date.slice(5,7)}/${date.slice(8)}/${date.slice(0,4)}`;
    }

    return (
        <div className="comment 
                        flex flex-col gap-y-4 
                        border-1 border-secondary rounded-xl
                        p-6
                        w-full h-fit">
            <p>{text}</p>
            <div className="bottom-wrapper flex flex-col gap-y-2">    
                <p><Link onClick={(e) => e.stopPropagation()} to={`/profile/${userId}`} className="link">{userName}</Link></p>
                <p className="font-interRegular text-darkGray text-xs">{parseDate(date)}</p>
            </div>
        </div>
    )
}

export default Comment