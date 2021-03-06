{
  // function: login -> success, fail β±
  type SuccessState = {
    result: "success";
    response: {
      body: string;
    };
  };
  type FailState = {
    result: "fail";
    reason: string;
  };
  type LoginState = SuccessState | FailState;

  function login(): LoginState {
    return {
      result: "success",
      response: {
        body: "logged in!",
      },
    };
  }

  // printLoginState(state: LoginState)
  // success -> π body
  // fail -> π­ reason
  function printLoginState(state: LoginState) {
    if (state.result === "success") {
      // νμkeyλ‘ μ‘°κ±΄μ λ§λ€κ³  λΆκΈ°ν  μ μμ
      console.log(`π ${state.response.body}`);
    } else {
      console.log(`π­ ${state.reason}`);
    }
  }
}
