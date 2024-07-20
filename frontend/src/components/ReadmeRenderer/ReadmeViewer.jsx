import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { marked } from "marked";

const ReadmeViewer = () => {
    const { filename } = useParams();
    const [content, setContent] = useState(null);
    const [error, setError] = useState(null);
    const [showAnswers, setShowAnswers] = useState(true);

    marked.use({
        async: false,
        breaks: false,
        extensions: null,
        gfm: true,
        hooks: null,
        pedantic: false,
        silent: false,
        tokenizer: null,
        walkTokens: null,
    });

    useEffect(() => {
        const fetchContent = async () => {
            const decodedFilename = decodeURIComponent(filename);
            console.log("Fetching content for:", decodedFilename);
            const url =
                process.env.NODE_ENV === "development"
                    ? `http://localhost:32102/file/read-file?file_path=${encodeURIComponent(decodedFilename)}`
                    : `http://www.druggableprotein.com:32102/file/read-file?file_path=${encodeURIComponent(decodedFilename)}`;
            try {
                const response = await axios.get(url);
                console.log("the md url is ", url);
                console.log("response.data.content is ", response.data.content);
                setContent(marked.parse(response.data.content));
                setError(null);
                console.log("content is ", content);
            } catch (error) {
                console.log("the md url is ", url);
                console.error(error);
                setError(error);
            }
        };
        fetchContent();
    }, [filename]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "a") {
                setShowAnswers((prevShowAnswers) => !prevShowAnswers);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const filterAnswers = (htmlContent) => {
        if (showAnswers) {
            return htmlContent;
        }
        // Replace the answers with a placeholder that takes up one line
        return htmlContent.replace(/<\/?br\s*\/?>\s*[A-Z]\s*<\/?br\s*\/?>/g, '<br>&nbsp;<br>');
    };

    return (
        <div>
            <h2>Readme Content</h2>
            {error ? (
                <div>Error: {error.message}</div>
            ) : (
                <div dangerouslySetInnerHTML={{ __html: filterAnswers(content) }} />
            )}
        </div>
    );
};

export default ReadmeViewer;
