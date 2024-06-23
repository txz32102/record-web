import React, { useState } from 'react';

function InputArea() {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = () => {
        const baseURL = process.env.NODE_ENV === 'development'
                        ? 'http://localhost:9001'
                        : 'https://www.druggableprotein.com';
    
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
    
    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type something..."
                style={{ width: '100%', padding: '10px', fontSize: '16px', margin: '10px 0' }}
            />
            <button onClick={handleButtonClick} style={{ padding: '10px 20px', fontSize: '16px' }}>Send</button>
        </div>
    );
}

export default InputArea;
