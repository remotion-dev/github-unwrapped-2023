export const PullRequests: React.FC<{
  pullRequests: number;
}> = ({ pullRequests }) => {
  const digits = String(pullRequests).length;

  return (
    <div
      style={{
        position: "absolute",
        top: 152,
        left: 240,
        width: 210,
        height: 135,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingRight: 20,
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          style={{
            height: 50,
            marginRight: 10,
          }}
        >
          <path
            fill="white"
            d="M80 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm32.4 97.2c28-12.4 47.6-40.5 47.6-73.2c0-44.2-35.8-80-80-80S0 35.8 0 80c0 32.8 19.7 61 48 73.3V358.7C19.7 371 0 399.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-32.8-19.7-61-48-73.3V272c26.7 20.1 60 32 96 32h86.7c12.3 28.3 40.5 48 73.3 48c44.2 0 80-35.8 80-80s-35.8-80-80-80c-32.8 0-61 19.7-73.3 48H208c-49.9 0-91-38.1-95.6-86.8zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM344 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"
          />
        </svg>
        <div
          style={{
            fontFamily: "Mona Sans",
            fontWeight: "500",
            color: "white",
            fontSize: digits > 2 ? 55 : 65,
            lineHeight: "65px",
          }}
        >
          {pullRequests}
        </div>
      </div>
      <div
        style={{
          fontFamily: "Mona Sans",
          fontSize: 20,
          color: "white",
          fontWeight: 500,
        }}
      >
        PRs merged
      </div>
    </div>
  );
};
