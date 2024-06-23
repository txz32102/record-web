import React, { useState } from 'react';

function InputArea() {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = () => {
        const baseURL = process.env.NODE_ENV === 'development'
            ? 'http://localhost:32102'
            : 'http://www.druggableprotein.com:32102';

            console.log('Request URL:', baseURL); 

        fetch(`${baseURL}/server`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: inputValue }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            if (data.success) {
                alert("Data sent successfully: " + data.message);
                setInputValue(''); // Clear the input after successful data upload
            } else {
                alert("Failed to send data: " + data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("An error occurred while sending data.");
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default Enter behavior (submitting the form or adding a new line)
            handleButtonClick();
        }
    };

    return (
        <div>
            <textarea
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type something..."
                style={{ width: '100%', padding: '10px', fontSize: '16px', margin: '10px 0', height: '100px' }}
            />
            <button onClick={handleButtonClick} style={{ padding: '10px 20px', fontSize: '16px' }}>Send</button>
        </div>
    );
}

export default InputArea;
