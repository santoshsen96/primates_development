const {scores} = require("../variables/pride.variables");
const calculateOptionReadTime=(examData, questions) =>{
    // const scores = {
    //     optionReadTimeAttention: 0,
    //     optionReadTimeMemory: 0,
    //     optionReadTimeCriticalThinking: 0,
    //     optionReadTimeCreativeThinking: 0,
    //     optionReadTimeMindset: 0,
    //     optionReadTimeAttitude: 0,
    //     optionReadTimeExpression: 0,
    //     optionReadTimeCommunication: 0,
    //     optionReadTimeCollaboration: 0,
    //     optionReadTimeLeadership: 0,
    //     optionReadTimeAwareness: 0,
    //     optionReadTimeApplication: 0,
    //     optionReadTimeAdvantage: 0
    // };

    examData.answers.forEach(frontendItem => {
        // Find corresponding backend question
        const backendQuestion = questions.find(backendItem => backendItem.sort_order === frontendItem.sort_order);

        // Check if backendQuestion exists
        if (backendQuestion) {
            // Add optionReadTime based on skill or intelligence
            switch (backendQuestion.skill) {
                case 'attention':
                    scores.optionReadTimeAttention += frontendItem.optionReadTime;
                    break;
                case 'memory':
                    scores.optionReadTimeMemory += frontendItem.optionReadTime;
                    break;
                case 'critical':
                    scores.optionReadTimeCriticalThinking += frontendItem.optionReadTime;
                    break;
                case 'creative':
                    scores.optionReadTimeCreativeThinking += frontendItem.optionReadTime;
                    break;
                case 'mindset':
                    scores.optionReadTimeMindset += frontendItem.optionReadTime;
                    break;
                case 'attitude':
                    scores.optionReadTimeAttitude += frontendItem.optionReadTime;
                    break;
                case 'expression':
                    scores.optionReadTimeExpression += frontendItem.optionReadTime;
                    break;
                case 'communication':
                    scores.optionReadTimeCommunication += frontendItem.optionReadTime;
                    break;
                case 'collaboration':
                    scores.optionReadTimeCollaboration += frontendItem.optionReadTime;
                    break;
                case 'leadership':
                    scores.optionReadTimeLeadership += frontendItem.optionReadTime;
                    break;
                default:
                    break;
            }

            switch (backendQuestion.intelligence) {
                case 'awareness':
                    scores.optionReadTimeAwareness += frontendItem.optionReadTime;
                    break;
                case 'application':
                    scores.optionReadTimeApplication += frontendItem.optionReadTime;
                    break;
                case 'advantage':
                    scores.optionReadTimeAdvantage += frontendItem.optionReadTime;
                    break;
                default:
                    break;
            }
        }
    });

    return scores;
}

// Usage example:
//const scores = calculateOptionReadTime(examData, questions);
module.exports=calculateOptionReadTime
