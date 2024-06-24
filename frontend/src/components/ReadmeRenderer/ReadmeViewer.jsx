import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { marked } from "marked";

const ReadmeViewer = () =>{
    const { filename } = useParams();
    const [content, setContent] =useState("null");
    const [error, setError] = useState("null");
    marked.use({
        "async": false,
        "breaks": false,
        "extensions": null,
        "gfm": true,
        "hooks": null,
        "pedantic": false,
        "silent": false,
        "tokenizer": null,
        "walkTokens": null
       });

    useEffect(() =>{
        const fetchContent = async () =>{
            console.log("Fetching content for:", filename);
            try{
                const apiUrl = process.env.React_APP_API_URL || "http://localhost:9001";
                // const response = await axios.get(`${apiUrl}/files/${filename}`);
                const url = `http://localhost:9001/files/${filename}`;
                const response = await axios.get(url);
                console.log("url is ", url)
                setContent(marked.parse(response.data.content));
                console.log("content is ", content)
                setError(null);
            } catch (error){
                console.error(error);
                setError(error);
            }
        }
        fetchContent(); 
    }, [filename]);

    return (
        <div>
            <h2>Readme Content</h2>
            {error ? (
                <div>Error: {error.message}</div>
            ) : (
                <div dangerouslySetInnerHTML={{ __html: content }} />
            )}
        </div>
    );

};

export default ReadmeViewer;