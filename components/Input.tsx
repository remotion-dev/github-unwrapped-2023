import React, { useCallback } from "react";

export const Input: React.FC<{
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
  placeHolder?: string;
  style?: React.CSSProperties;
}> = ({ text, setText, disabled, placeHolder, style }) => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setText(e.currentTarget.value);
    },
    [setText]
  );

  return (
    <>
      <style jsx>{`
        input {
          width: 100%;
          font-size: 18px;
          padding: 0 16px;
          border: 1px solid rgba(70, 195, 189, 0.5);
          border-radius: 5px;
          background-color: rgba(166, 212, 210, 0.3);
          height: 48px;
          display: flex;
          align-items: center;
          caret-color: white;
        }

        input::placeholder {
          color: rgba(209, 245, 228, 0.7);
        }
      `}</style>
      <input
        disabled={disabled}
        name="title"
        value={text}
        onChange={onChange}
        placeholder={placeHolder}
        style={style}
      />
    </>
  );
};
