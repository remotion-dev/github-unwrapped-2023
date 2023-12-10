export const Title: React.FC<{
  login: string;
}> = ({ login }) => {
  return (
    <div
      style={{
        position: "absolute",
        fontSize: 55,
        fontFamily: "Mona Sans",
        fontWeight: "bold",
        color: "white",
        top: 14,
        left: 20,
      }}
    >
      @{login}
    </div>
  );
};
