import { DetailedHTMLProps, HTMLAttributes } from 'react';
import classnames from 'classnames';

interface ICellProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  image?: string;
  locked?: boolean;
  marked?: boolean;
  text?: string;
  win?: boolean;
}

function Cell({
  className,
  image,
  locked,
  marked,
  text,
  win,
  ...rest
}: ICellProps) {
  return (
    <div
      className={classnames(
        'bingo-cell flex flex-1 justify-center items-center select-none cursor-pointer p-2 text-center text-xs md:text-base',
        win
          ? 'bg-teal-100 border-teal-300 hover:bg-teal-200 hover:border-teal-400'
          : marked
          ? [
              'bg-light-blue-vivid-100 border-light-blue-vivid-200',
              !locked &&
                'hover:bg-light-blue-vivid-200 hover:border-light-blue-vivid-500 active:bg-light-blue-vivid-300 active:border-light-blue-vivid-600',
            ]
          : [
              'bg-white border-cool-grey-200',
              !locked &&
                'hover:bg-light-blue-vivid-050 hover:border-light-blue-vivid-200 active:bg-light-blue-vivid-300 active:border-light-blue-vivid-600',
            ],
        locked && 'cursor-not-allowed',
        className,
      )}
      {...rest}
    >
      {!!image ? <img src={image} alt="Free Logo" /> : text}
    </div>
  );
}

export default Cell;
