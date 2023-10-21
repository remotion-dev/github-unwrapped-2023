import { CrossCircleIcon } from "../icons/CrossCircleIcon";

export const UserNotFound: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        fontSize: 14,
        color: "rgba(237, 237, 237, 1)",
      }}
    >
      <CrossCircleIcon />
      Incorrect user name
    </div>
  );
};
