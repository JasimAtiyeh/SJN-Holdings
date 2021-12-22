import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginPage(props) {
  const [userNotFound, setUserNotFound] = useState();
  const router = useRouter();

  function onSubmitHandler(event) {
    event.preventDefault();

    const username = event.target[0].value;
    const password = event.target[1].value;

    fetch(`/api/users/login/${username}/${password}`).then((response) => {
      if (response.ok) {
        response.json().then((responseBody) => {
          router.replace("/" + responseBody.id);
        });
      } else {
        setUserNotFound(<p>User not found</p>);
      }
    });
  }

  return (
    <div>
      <h3>Sign in to see your houses</h3>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>Username</label>
          <input type="text" id="username" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" />
        </div>
        <input type="submit" value="Login" />
      </form>
      {userNotFound}
    </div>
  );
}
