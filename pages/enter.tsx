import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { NextPage } from "next";
import { useContext, useState } from "react";
import { useAuth, useSigninCheck } from "reactfire";
import { UserContext } from "../lib/context";

const SignInButton = () => {
  const auth = useAuth();
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={"/google.jpg"} alt="google image" />
      Sign in with Google
    </button>
  );
};

const SignOutButton = () => {
  const auth = useAuth();

  const signOut = () => {
    auth.signOut();
  };

  return (
    <button className="btn-red" onClick={signOut}>
      Sign out
    </button>
  );
};

const UsernameForm = () => {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onChange = (e) => {
    const val = (e.target.value as string).toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setIsValid(false);
      setLoading(false);
    } else if (re.test(val)) {
      setFormValue(val);
      setIsValid(false);
      setLoading(true);
    }
  };

  const checkUsername = async (username: string) => {};

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}></form>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={formValue}
          onChange={onChange}
        />

        <button type="submit" className="btn-green" disabled={isValid}>
          Submit
        </button>

        <h3>Debug State</h3>
        <div>
          Username: {formValue}
          <br />
          Loading: {loading.toString()}
          <br />
          Username valid: {isValid.toString()}
        </div>
      </section>
    )
  );
};

const Enter: NextPage = () => {
  const { data: signInCheckResult } = useSigninCheck(); //
  const { username } = useContext(UserContext);

  return (
    <main>
      {signInCheckResult?.signedIn ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
};
export default Enter;
