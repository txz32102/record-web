# findAnswers.js
```js
async function logAnswers() {
    try {
        // Fetch the JSON file
        const response = await fetch('http://www.druggableprotein.com:32102/files/7.json');
        const data = await response.json();

        // Parse the JSON content
        const questionsWithAnswers = JSON.parse(data.content);

        // Select all the sub-content divs
        const subContents = document.querySelectorAll('.sub-content');

        let answersLog = '';

        // Iterate over each sub-content div
        subContents.forEach((subContent, index) => {
            // Find the paragraph that contains the question
            const questionParagraph = subContent.querySelector('p[id^="question_"]');

            // Check if the question paragraph exists
            if (questionParagraph) {
                // Get the text content of the question
                let questionText = questionParagraph.textContent.trim();

                // Remove leading numbers and dots (e.g., "1. ", "2. ", etc.)
                questionText = questionText.replace(/^\d+\.\s*/, '');

                // Find the corresponding question in the JSON data
                const match = questionsWithAnswers.find(q => q.question && q.question.replace(/^\d+\.\s*/, '') === questionText);

                // If a match is found, log the number and the correct answer
                if (match) {
                    answersLog += match.correct_answer + ' ';
                } else{
                    answersLog += "NULL "
                }
            }

            // Log every 5 answers or if it's the last element
            if ((index + 1) % 5 === 0 || index === subContents.length - 1) {
                const start = index - (index % 5) + 1;
                const end = index + 1;
                console.log(`${start}-${end}: ${answersLog.trim()}`);
                answersLog = '';
            }
        });
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

// Call the function to log the answers
logAnswers();
```

# logQuestionsAndAnswers.md
```js
function logQuestionAndOptions() {
    const questionElement = document.querySelector('p.title');
    const optionsElements = document.querySelectorAll('.el-radio-group .el-radio__label');
    if (questionElement && optionsElements.length) {
        const questionText = questionElement.textContent.trim();
        const optionsText = Array.from(optionsElements).map(el => el.textContent.trim()).join(' ');
        console.log(`Question: ${questionText}`);
        console.log(`Options: ${optionsText}`);
    }
}

function logCorrectAnswer() {
    const correctAnswerElement = document.querySelector('.answer .text');
    if (correctAnswerElement) {
        const correctAnswerText = correctAnswerElement.textContent.trim();
        console.log(`Correct Answer: ${correctAnswerText}`);
    } else {
        console.log('Correct Answer: Not yet available');
    }
}

function setupListeners() {
    // Attach an event listener to the "next" button
    document.querySelector('.next a').addEventListener('click', function() {
        setTimeout(() => {
            logQuestionAndOptions();
            setupOptionListeners(); // Setup listeners for the new set of options
        }, 500); // Delay to ensure the next question is loaded
    });
}

function setupOptionListeners() {
    // Attach event listeners to the options to log the answer when an option is clicked
    const optionsElements = document.querySelectorAll('.el-radio-group .el-radio__label');
    optionsElements.forEach((option, index) => {
        option.addEventListener('click', function() {
            setTimeout(logCorrectAnswer, 500); // Delay to ensure the answer is revealed
        });
    });
}

// Initial setup
logQuestionAndOptions();
setupOptionListeners();
setupListeners();

```

# click.js

```js
async function logAnswersAndSimulateClicks() {
    try {
        // Fetch the JSON file
        const response = await fetch('http://www.druggableprotein.com:32102/files/duanxueqi.json');
        const data = await response.json();

        // Parse the JSON content
        const questionsWithAnswers = JSON.parse(data.content);

        // Select all the sub-content divs
        const subContents = document.querySelectorAll('.sub-content');

        let answersLog = '';

        // Iterate over each sub-content div
        subContents.forEach((subContent, index) => {
            // Find the paragraph that contains the question
            const questionParagraph = subContent.querySelector('p[id^="question_"]');

            // Check if the question paragraph exists
            if (questionParagraph) {
                // Get the text content of the question
                let questionText = questionParagraph.textContent.trim();

                // Remove leading numbers and dots (e.g., "1. ", "2. ", etc.)
                questionText = questionText.replace(/^\d+\.\s*/, '');

                // Find the corresponding question in the JSON data
                const match = questionsWithAnswers.find(q => q.question && q.question.replace(/^\d+\.\s*/, '') === questionText);

                // If a match is found, log the number and the correct answer
                if (match) {
                    answersLog += match.correct_answer + ' ';

                    // Simulate the clicking process
                    const correctAnswerLabel = Array.from(subContent.querySelectorAll('label')).find(label => label.textContent.trim().startsWith(match.correct_answer));
                    if (correctAnswerLabel) {
                        correctAnswerLabel.click();
                    }
                } else {
                    // Handle the case where no match is found, default to "A"
                    answersLog += "A ";

                    // Simulate clicking the first option ("A")
                    const firstLabel = subContent.querySelector('label');
                    if (firstLabel) {
                        firstLabel.click();
                    }
                }
            }

            // Log every 5 answers or if it's the last element
            if ((index + 1) % 5 === 0 || index === subContents.length - 1) {
                const start = index - (index % 5) + 1;
                const end = index + 1;
                console.log(`${start}-${end}: ${answersLog.trim()}`);
                answersLog = '';
            }
        });
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

// Call the function to log the answers and simulate clicks
logAnswersAndSimulateClicks();

```