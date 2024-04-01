const calculateScores=(examData, questions)=> {

    for (const answer of examData.answers) {
        const question = questions.find((q) => q.sort_order == answer.sort_order);

        if (!question) {
            throw new Error("Question not found for the answer");
        }

        const selectedOption = question.options.find(
            (opt) => opt.option === answer.selectedOption
        );

        if (!selectedOption) {
            throw new Error("Selected option not found for the answer");
        }

        // Award marks dynamically based on selected option for each pride, skill, and intelligence
        scores[question.pride + "Score"] += selectedOption.mark;
        scores[question.skill + "Score"] += selectedOption.mark;
        scores[question.intelligence + "Score"] += selectedOption.mark;

        // Count occurrences of mark 5 for each skill
        if (selectedOption.mark === 5) {
            scores["countOf5Pointer" + question.pride.charAt(0).toUpperCase() + question.pride.slice(1)]++;
            scores["countOf5Pointer" + question.skill.charAt(0).toUpperCase() + question.skill.slice(1)]++;
            scores["countOf5Pointer" + question.intelligence.charAt(0).toUpperCase() + question.intelligence.slice(1)]++;
        } else if (selectedOption.mark >= 1) {
            scores["optionReadTime" + question.pride.charAt(0).toUpperCase() + question.pride.slice(1)] += selectedOption.readTime;
        }

        const totalPrideScore =
            scores.perceiveScore +
            scores.resolveScore +
            scores.influenceScore +
            scores.deliverScore +
            scores.engageScore;

        if (totalPrideScore !== 0) {
            scores.perceiveContribution = ((scores.perceiveScore / totalPrideScore) * 100).toFixed(2);
            scores.resolveContribution = ((scores.resolveScore / totalPrideScore) * 100).toFixed(2);
            scores.influenceContribution = ((scores.influenceScore / totalPrideScore) * 100).toFixed(2);
            scores.deliverContribution = ((scores.deliverScore / totalPrideScore) * 100).toFixed(2);
            scores.engageContribution = ((scores.engageScore / totalPrideScore) * 100).toFixed(2);
        } else {
            scores.perceiveContribution = 0;
        }
    }
    
    return scores;
}

// Usage example:
// const scores = calculateScores(examData, questions);
// console.log(scores);
module.exports=calculateScores