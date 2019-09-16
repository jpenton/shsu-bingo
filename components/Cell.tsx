import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface ICellProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  image?: string;
  marked?: boolean;
  text?: string;
}

function Cell({ image, marked, text, ...rest }: ICellProps) {
  return (
    <div
      className="bingo-cell"
      style={{
        ...(marked
          ? {
              backgroundColor: 'blue',
            }
          : {}),
      }}
      {...rest}
    >
      {!!image ? <img src={image} alt="Free Logo" /> : text}
    </div>
  );
}

export default Cell;
