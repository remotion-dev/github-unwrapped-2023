export const Title: React.FC<{
  login: string;
}> = ({ login }) => {
  return (
    <div
      style={{
        position: "absolute",
        fontSize: 40,
        fontFamily: "Mona Sans",
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        width: "100%",
        top: 50,
      }}
    >
      @{login}
    </div>
  );
};
