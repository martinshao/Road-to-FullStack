function questionCreator(spec, my) {
  var that = {};

  my = my || {};
  my.label = spec.label;

  my.renderInput = function () {
    throw 'not implemented';
  };
  console.info(my.renderInput)
  that.render = function (target) {
    var questionWrapper = document.createElement('div');
    questionWrapper.className = 'question';

    var questionLabel = document.createElement('div');
    questionLabel.className = 'question-label';
    var label = document.createTextNode(spec.label);
    questionLabel.appendChild(label);
    console.info(my.renderInput)
    var answer = my.renderInput();

    questionWrapper.appendChild(questionLabel);
    questionWrapper.appendChild(answer);
    return questionWrapper;
  };

  return that;
}

function choiceQuestionCreator(spec) {
  var my = {},
    that = questionCreator(spec, my);

  my.renderInput = function () {
    var input = document.createElement('select');
    var len = spec.choices.length;
    for (var i = 0; i < len; i++) {
      var option = document.createElement('option');
      option.text = spec.choices[i];
      option.value = spec.choices[i];
      input.appendChild(option);
    }

    return input;
  };

  return that;
}

function inputQuestionCreator(spec) {
  var my = {},
    that = questionCreator(spec, my);

  my.renderInput = function () {
    var input = document.createElement('input');
    input.type = 'text';
    return input;
  };

  return that;
}

var view = {
  render: function (target, questions) {
    for (var i = 0; i < questions.length; i++) {
      target.appendChild(questions[i].render());
    }
  },
};

var questions = [
  choiceQuestionCreator({
    label: 'Have you used tobacco products within the last 30 days?',
    choices: ['Yes', 'No'],
  }),
  inputQuestionCreator({
    label: 'What medications are you currently using?',
  }),
];

var questionRegion = document.getElementById('questions');

view.render(questionRegion, questions);
