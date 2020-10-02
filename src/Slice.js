import React from 'react';

const Slice = (props) => {
    return (
        <div className = "slice">
            {props.data.name}
        </div>
    );
};

export default Slice;