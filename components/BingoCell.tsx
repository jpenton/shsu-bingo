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
        'bingo-cell flex flex-1 justify-center items-center select-none cursor-pointer p-2 text-center',
        win
          ? 'bg-teal-100 border-teal-200 hover:bg-teal-200 hover:border-teal-300'
          : marked
          ? 'bg-light-blue-vivid-100 border-light-blue-vivid-200 hover:bg-light-blue-vivid-200 hover:border-light-blue-vivid-400'
          : 'bg-white border-cool-grey-200 hover:bg-light-blue-vivid-050 hover:border-light-blue-vivid-200',
        className,
      )}
      {...rest}
    >
      {!!image ? <img src={image} alt="Free Logo" /> : text}
    </div>
  );
}

export default Cell;
