// 问题类型
var AnswerType = {
  Choice: 0,
  Input: 1,
};

// 问题实体
function question(label, answerType, choices) {
  return {
    label: label,
    answerType: answerType,
    choices: choices, // 这里的choices是可选参数
  };
}

var view = (function () {
  // render一个问题
  function renderQuestion(target, question) {
    var questionWrapper = document.createElement('div');
    questionWrapper.className = 'question';

    var questionLabel = document.createElement('div');
    questionLabel.className = 'question-label';
    var label = document.createTextNode(question.label);
    questionLabel.appendChild(label);

    var answer = document.createElement('div');
    answer.className = 'question-input';

    // 根据不同的类型展示不同的代码：分别是下拉菜单和输入框两种
    if (question.answerType === AnswerType.Choice) {
      var input = document.createElement('select');
      var len = question.choices.length;
      for (var i = 0; i < len; i++) {
        var option = document.createElement('option');
        option.text = question.choices[i];
        option.value = question.choices[i];
        input.appendChild(option);
      }
    } else if (question.answerType === AnswerType.Input) {
      var input = document.createElement('input');
      input.type = 'text';
    }

    answer.appendChild(input);
    questionWrapper.appendChild(questionLabel);
    questionWrapper.appendChild(answer);
    target.appendChild(questionWrapper);
  }

  return {
    // 遍历所有的问题列表进行展示
    render: function (target, questions) {
      for (var i = 0; i < questions.length; i++) {
        renderQuestion(target, questions[i]);
      }
    },
  };
})();

var questions = [
  question(
    'Have you used tobacco products within the last 30 days?',
    AnswerType.Choice,
    ['Yes', 'No']
  ),
  question('What medications are you currently using?', AnswerType.Input),
];

var questionRegion = document.getElementById('questions');
view.render(questionRegion, questions);
