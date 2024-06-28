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
            const url = process.env.NODE_ENV === 'development' 
            ? `http://localhost:32102/files/${filename}` 
            : `http://www.druggableprotein.com:32102/files/${filename}`;
            try{
                const response = await axios.get(url);
                console.log("the md url is ", url)
                console.log("response.data.content is ", response.data.content)
                setContent(marked.parse(response.data.content));
                setError(null);
                console.log("content is ", content)
            } catch (error){
                console.log("the md url is ", url)
                console.error(error);
                // console.log("content is ", content)
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