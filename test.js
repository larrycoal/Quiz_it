const allTest = [
  {
    name: "javascript",
    timeLimit: 30,
    questions: [
      {
        question: "what is es6",
        options: [
          "ecma Script",
          "example script six",
          "expanded script six",
          "elastic script",
        ],
        answer: "ecma Script",
      },
      {
        question: "which of the following invalid datatype in javascript",
        options: ["Integer", "object", "boolean", "date"],
        answer: "date",
      },
      {
        question:
          "what does the following operation return in javascript 3 + '3' ",
        options: ["6", "33", "undefined", "syntax error"],
        answer: "33",
      },
      {
        question:
          "what does the following operation return in javascript 3 == '3' ",
        options: ["True", "False", "undefined", "syntax error"],
        answer: "True",
      },
      {
        question:
          "which does the following operation return in javascript 3 === '3' ",
        options: ["True", "False", "undefined", "syntax error"],
        answer: "False",
      },
    ],
  },
  {
    name: "html",
    timeLimit: 30,
    questions: [
      {
        question: "what full meaning of HTML",
        options: [
          "High text making language",
          "Hyper Text markup language",
          "HyperText make language",
          "High transferable model language",
        ],
        answer: "Hyper Text markup language",
      },
      {
        question: "which of the following is an invalid HTML tag",
        options: [
          "<p></p>",
          "<span></span>",
          "<text></text>",
          "<section></section>",
        ],
        answer: "<text></text>",
      },
      {
        question: "which HTML tag let you link to another page",
        options: ["<link></link>", "<span></span>", "<a></a>", "<p></p>"],
        answer: "<a></a>",
      },
      {
        question: "which HTML tag would you use to add a css file",
        options: [
          "<link></link>",
          "<a></a>",
          "<title></title>",
          "<script></script>",
        ],
        answer: "<link></link>",
      },
      {
        question: "which HTML tag would you use to apply a javascript file",
        options: [
          "<link></link>",
          "<a></a>",
          "<title></title>",
          "<script></script>",
        ],
        answer: "<script></script>",
      },
    ],
  },
  {
    name: "css",
    timeLimit: 30,
    questions: [
      {
        question: "what is full meaning of css",
        options: [
          "Connect sexy style",
          "Cascading style sheet",
          "Create sexy style",
          "Create serious style",
        ],
        answer: "Cascading style sheet",
      },
      {
        question: "which of the following valid class selector",
        options: [".className", "#className", "$className", "className"],
        answer: ".className",
      },
      {
        question: "which of the following valid id selector",
        options: [".id", "#id", "$id", "id"],
        answer: "#id",
      },
      {
        question: "Which option set the size of a text in css ",
        options: ["font-size", "text-size", "font", "size"],
        answer: "font-size",
      },
      {
        question: "Which option set the color of a text in css ",
        options: ["font-color", "text-color", "color", "rgb"],
        answer: "color",
      },
    ],
  },
  {
    name: "sql",
    timeLimit: 30,
    questions: [
      {
        question: "what is full meaning of sql",
        options: [
          "silence queen language",
          "structured queen language",
          "structured query language",
          "structured query lingo",
        ],
        answer: "structured query language",
      },
      {
        question: "what is full meaning of DML",
        options: [
          "data making language",
          "data manipulation language",
          "data merry language",
          "data markup lingo",
        ],
        answer: "data manipulation language",
      },
      {
        question: "what is full meaning of DDL",
        options: [
          "data dealing language",
          "data dry language",
          "data definition language",
          "data draw lingo",
        ],
        answer: "data definition language",
      },
      {
        question: "Which option is an invalid datatype ",
        options: ["date", "integer", "boolean", "array"],
        answer: "array",
      },
      {
        question: "Which symbol select all attribute of a table ",
        options: ["*", "@", "#", "&"],
        answer: "*",
      },
    ],
  },
];

$().ready(() => {
  const activeTest = window.localStorage.getItem("activeTest");
  const fetchUser = JSON.parse(window.localStorage.getItem("currentUser"));
  const testData = allTest.filter((t) => t.name === activeTest)[0];
  const allQuestion = testData.questions;
  let currentScore = 0;
  let currentQuestion = 0;
  let timer = testData.timeLimit;
  let timerId;
  const imageSrc =
    activeTest === "css"
      ? "./Assets/CSS_logo.png"
      : activeTest === "sql"
      ? "./Assets/sql_logo.png"
      : activeTest === "javascript"
      ? "./Assets/javascript_logo.png"
      : "./Assets/HTML_logo.png";
  $("#progress").attr("max", allQuestion.length);
  $("#test_img").attr("src", imageSrc);
  if (fetchUser.username && fetchUser.loggedIn) {
    $("#login").css("display", "none");
    $("#logout").css("display", "inline");
    $(".tester").text(`Hello ${fetchUser.username}`);
  } else {
    window.location.href = "./login_registration.html";
  }

  $("#logout").click(() => {
    window.localStorage.removeItem("currentUser");
    window.location.href = "./login_registration.html";
  });

  $("#inst_header").text(`Welcome to quiz_It ${activeTest} test`);
  $("#startTest").click(() => {
    $(".instructions").css("display", "none");
    $(".test_form").css("display", "inline");
    displayQuestion();
    timerId = setInterval(handleTimer, 1000);
  });
  const displayQuestion = () => {
    const currentQue = allQuestion[currentQuestion];
    if (currentQuestion + 1 === allQuestion.length) {
      $("#submit").val("Submit Quiz");
    }
    $("#question").text(currentQue.question);

    $("#option_one").val(currentQue.options[0]);
    $("#option_one")[0].checked = false;
    $("#option_one").next().text(currentQue.options[0]);

    $("#option_two").val(currentQue.options[1]);
    $("#option_two")[0].checked = false;
    $("#option_two").next().text(currentQue.options[1]);

    $("#option_three").val(currentQue.options[2]);
    $("#option_three")[0].checked = false;
    $("#option_three").next().text(currentQue.options[2]);

    $("#option_four").val(currentQue.options[3]);
    $("#option_four")[0].checked = false;
    $("#option_four").next().text(currentQue.options[3]);
  };

  const displayResult = () => {
    clearInterval(timerId);
    $(".test_form").css("display", "none");
    $(".test_result").css("display", "inline");
    const finalResult = (currentScore / allQuestion.length) * 100;
    if (finalResult >= 80) {
      $(".test_result").html(
        `<h2>Congratulations!!! YOU PASSED</h2> <p>your test result is  ${finalResult}%</p>`
      );
    } else {
      $(".test_result").html(
        `<h2>Sorry!!! YOU FAILED</h2> <p>your test result is ${finalResult}%</p>`
      );
    }
  };

  $("form").submit((e) => {
    e.preventDefault();
    let testerAns = $("input[type=radio]").filter(":checked")[0];
    if (testerAns) {
      let correctAns = allQuestion[currentQuestion].answer;
      if (testerAns.value === correctAns) {
        currentScore++;
      }
    } else {
      $("#error").text("please pick an answer");
      return;
    }

    if (allQuestion.length > currentQuestion + 1) {
      currentQuestion++;
      displayQuestion();
      $("#progress").attr("value", currentQuestion);
    } else {
      displayResult();
    }
  });

  const handleTimer = () => {
    timer -= 1;
    if (timer > 0) {
      $(".time_limit").text(`Time: 0:00:${timer}`);
    } else {
      clearInterval(timerId);
      $(".time_limit").text("Time: 0:00:00");
      $(".test_form").css("display", "none");
      displayResult();
    }
  };
});
