import { useCallback, useState } from "react";
import styles from "../styles.module.css";

type EmailResponse =
  | {
      type: "success";
      message: string;
    }
  | {
      type: "error";
      error: string;
    };

export const EmailForm: React.FC<{}> = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const isValidEmail = (inputMail: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inputMail);

  const onSubmit: React.FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSaved(false);
      setError(null);
      if (isValidEmail(email)) {
        setLoading(true);
        const res = await fetch("http://localhost:8080/api/email", {
          method: "post",
          body: JSON.stringify({ email }),
          headers: { "content-type": "application/json" },
        });
        const json = (await res.json()) as EmailResponse;
        if (json.type === "success") {
          setIsSaved(true);
          setSuccessMessage(json.message);
          setError(null);
        } else {
          setError(res.statusText);
        }
        setLoading(false);
      } else {
        setError("Invalid email provided. Please try again");
        console.log(error);
      }
    },
    [email, error],
  );

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [],
  );

  return (
    <div>
      <form
        className="mobile-row"
        onSubmit={onSubmit}
        style={{
          display: "flex",
          alignContent: "center",
        }}
      >
        <input
          value={email}
          onChange={onChange}
          type={"email"}
          autoComplete="none"
          className={styles.aboutFormInput}
          placeholder="Your email adress"
        ></input>
        <input
          type="submit"
          value={loading ? "Sending..." : "Submit"}
          className={styles.aboutFormSubmit}
        />
      </form>
      {error ? (
        <p style={{ color: "red", marginBottom: -8 }}> {error}</p>
      ) : null}

      {isSaved ? (
        <p style={{ color: "#1bbf47", marginBottom: -8 }}>{successMessage}</p>
      ) : null}
    </div>
  );
};
