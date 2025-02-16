import React from 'react';
import './Loading.scss';
import { TbLoader2 } from "react-icons/tb";
function Loading() {
    return (
        <div className='LoadingContainer'>
            <TbLoader2 className="loadingIcon" />

        </div>
    );
}

export default Loading;