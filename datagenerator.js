const fs = require('fs');
const path = require('path');

const questionData = require('./inputData/finalData/ter_quiz_t_question.json');
const choiceData = require('./inputData/finalData/ter_quiz_t_choice.json');

const outputPath = path.join(process.cwd(), 'outputData', 'questionData.json')


const dataGenerator = (qData, cData)=>{
    return qData.map((data)=>{
        const choiceData = cData.map((choice)=>{
            if(choice.c_question_id===data.c_id){   
                return{
                    choice_id : choice.ordering+1,
                    choice_text : choice.c_choice,
                    choice_correct_flag : choice.c_right ===1 ? true : false
                }
            }
        }).filter(e => !!e);
        return {
            question_id : data.c_id,
		    question_type : data.c_type,
            question_point : data.c_point,
            question_category : data.c_ques_cat,
		    question_img : data.c_image,
            question_text : data.c_question,
            question_right_text : data.c_right_message,
            question_wrong_text : data.c_wrong_message,
            question_feedback_flag : data.c_feedback === 1 ? true : false,
            question_feedback_text : data.c_detailed_feedback,
            question_choices : choiceData
        }; 
    })
}

//console.log(JSON.stringify(dataGenerator(questionData,choiceData), undefined,2));

fs.writeFileSync(outputPath,JSON.stringify(dataGenerator(questionData,choiceData), undefined,2));