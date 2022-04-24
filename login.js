$().ready(() => {
  $("#register_page").click(() => {
    $(".login_wrapper").css("display", "none");
    $(".registration_wrapper").css("display", "inline");
  });

  $("#login_page").click(() => {
    $(".registration_wrapper").css("display", "none");
    $(".login_wrapper").css("display", "inline");
  });
  const handleRegister = () => {
    const username = $("#reg_username").val().trim();
    const email = $("#email").val().trim();
    const password = $("#reg_password").val().trim();
    const verifypassword = $("#verify_password").val().trim();
    let isValid = true;
    if (!email) {
      $("#email").next().text("Username is required");
    } else {
      $("#email").next().text("");
    }
    if (!username) {
      $("#reg_username").next().text("Username is required");
    } else {
      $("#reg_username").next().text("");
    }
    if (password !== verifypassword) {
      isValid = false;
      $("#verify_password").next().text("Password do not match");
    } else {
      $("#verify_password").next().text("");
    }
    if (isValid) {
      const userData = {
        username: username,
        email: email,
        password: password,
        loggedIn: true,
      };
      const fetchedData = window.localStorage.getItem("allUsers");
      const allUsers = JSON.parse(fetchedData);
      if (!allUsers) {
        const createNewUsers = [];
        createNewUsers.push(userData);
        window.localStorage.setItem("currentUser", JSON.stringify(userData));
        window.localStorage.setItem("allUsers", JSON.stringify(createNewUsers));
        window.location.href = "./home.html";
      } else {
        const checkUser = allUsers.filter(
          (user) => user.email === userData.email
        );
        if (checkUser.length > 0) {
          $("#email").next().text("email already exist");
        } else {
          $("#email").next().text("");
          allUsers.push(userData);
          window.localStorage.setItem("currentUser", JSON.stringify(userData));
          window.localStorage.setItem("allUsers", JSON.stringify(allUsers));
          window.location.href = "./home.html";
        }
      }
    }
  };
  const handleLogin = () => {
    const email = $("#login_email").val().trim();
    const password = $("#password").val().trim();
    const fetchedData = window.localStorage.getItem("allUsers");
    const allUsers = JSON.parse(fetchedData);
    const validatedUser = allUsers.filter(
      (user) => user.email === email && user.password === password
    );
    if (validatedUser.length === 0) {
      $("#login_btn").next().text("Email or password incorrect");
    } else {
      validatedUser[0].loggedIn = true;
      console.log(validatedUser);
      window.localStorage.setItem(
        "currentUser",
        JSON.stringify(validatedUser[0])
      );
      window.location.href = "./home.html";
    }
  };
  const handleLogout = () => {};
  $(".registration_form").submit((e) => {
    e.preventDefault();
    handleRegister();
  });

  $(".login_form").submit((e) => {
    e.preventDefault();
    handleLogin();
  });
});
