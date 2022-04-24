const heroquizes = [
  {
    name: "HTML",
    logo: "./Assets/HTML_logo.png",
  },
  {
    name: "JAVASCRIPT",
    logo: "./Assets/javascript_logo.png",
  },
  {
    name: "CSS",
    logo: "./Assets/CSS_logo.png",
  },
  {
    name: "SQL",
    logo: "./Assets/sql_logo.png",
  },
];

$().ready(() => {
  const fetchUser = JSON.parse(window.localStorage.getItem("currentUser"));
  if (!fetchUser) {
    window.location.href = "./login_registration.html";
  } else {
    $("#login").css("display", "none");
    $("#logout").css("display", "inline");
  }

  $("#logout").click(() => {
    window.localStorage.removeItem("currentUser");
    window.location.href = "./login_registration.html";
  });
  let current = 0;
  const animateHeroSection = () => {
    current = (current + 1) % heroquizes.length;
    $("#quiz_title").fadeOut(2000, () => {
      $("#quiz_title").text(heroquizes[current].name).fadeIn(2000);
    });
    $("#quiz_logo").fadeOut(2000, () => {
      $("#quiz_logo").attr("src", heroquizes[current].logo).slideDown(2000);
    });
  };

  setInterval(animateHeroSection, 8000);

  $("#moon").click((e) => {
    $("#moon").slideUp(() => {
      $("#sun").slideDown();
    });
    $("#mode").css("background", "#fffff0");
    $("#mode").css("color", "#000000");
    $("ul a").css("color", "#000000");
    $("#user").css("background", "#000000");
    $("#user a").css("color", "#ffffff");
    $(".all_test div").css("color", "#ffffff");
  });
  $("#sun").click(() => {
    $("#sun").slideUp(() => {
      $("#moon").slideDown();
    });
    $("#mode").css("background", "#12141c");
    $("#mode").css("color", "#ffffff");
    $("ul a").css("color", "#ffffff");
    $("#user").css("background", "#ffffff");
    $("#user a").css("color", "#000000");
  });
  $(".hamburger").click(() => {
    $(".mobile").css("display", "flex");
    $(".mobile").css("width", "70vw");
  });
  $(".close").click(() => {
    $(".mobile").css("width", "0");
    $(".mobile").css("display", "none");
  });
  $("#html").click(() => {
    window.localStorage.setItem("activeTest", "html");
    window.location.href = "quiz.html";
  });
  $("#css").click(() => {
    window.localStorage.setItem("activeTest", "css");
    window.location.href = "quiz.html";
  });
  $("#javascript").click(() => {
    window.localStorage.setItem("activeTest", "javascript");
    window.location.href = "quiz.html";
  });
  $("#sql").click(() => {
    window.localStorage.setItem("activeTest", "sql");
    window.location.href = "quiz.html";
  });
});
