import React from 'react';

const Input = ({ label, placeholder, handleOnChange, handleOnBlur, className, error }) => {
    return (
        <div>
            <label>{label}</label>
            <input type="text" placeholder={placeholder}
                onChange={e => handleOnChange(e.target.value)}
                onBlur={() => handleOnBlur(true)}
                className={className}
            />
            {error && <p>{error}</p>}
        </div>
    );
}

export default Input;