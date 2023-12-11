import { useCallback, useState } from "react";
import { CheckCircleIcion } from "../../icons/CheckCircke";
import { CrossCircleIcon } from "../../icons/CrossCircleIcon";
import formStyles from "./emailForm.styles.module.css";

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
        const res = await fetch("/api/email", {
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
        console.error(error);
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
    <div className={formStyles.emailFormWrapper}>
      <form onSubmit={onSubmit} className={formStyles.emailForm}>
        <input
          value={email}
          onChange={onChange}
          type={"email"}
          autoComplete="none"
          className={formStyles.aboutFormInput}
          placeholder="Your email adress"
        />
        <input
          type="submit"
          value={loading ? "Sending..." : "Submit"}
          className={formStyles.aboutFormSubmit}
        />
      </form>
      {error ? (
        <p className={formStyles.submitMessage}>
          <CrossCircleIcon width={15} />
          {error}
        </p>
      ) : null}

      {isSaved ? (
        <p className={formStyles.submitMessage}>
          <CheckCircleIcion style={{ color: "#1bbf47" }} width={18} />
          {successMessage}
        </p>
      ) : null}
    </div>
  );
};
