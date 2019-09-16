import { DetailedHTMLProps, HTMLAttributes } from 'react';
import classnames from 'classnames';

interface ICellProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  image?: string;
  marked?: boolean;
  text?: string;
  win?: boolean;
}

function Cell({ className, image, marked, text, win, ...rest }: ICellProps) {
  return (
    <div
      className={classnames(
        'bingo-cell flex flex-1 justify-center items-center select-none cursor-pointer p-2 text-center border-2',
        win ? 'bg-teal-300' : marked ? 'bg-light-blue-vivid-300' : null,
        className,
      )}
      {...rest}
    >
      {!!image ? <img src={image} alt="Free Logo" /> : text}
    </div>
  );
}

export default Cell;
