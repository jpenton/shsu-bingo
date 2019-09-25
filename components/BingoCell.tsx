import { DetailedHTMLProps, HTMLAttributes } from 'react';
import classnames from 'classnames';

interface ICellProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  count?: number;
  countMax?: number;
  image?: string;
  locked?: boolean;
  marked?: boolean;
  roundCorner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  text?: string;
  win?: boolean;
}

function Cell({
  count,
  countMax,
  className,
  image,
  locked,
  marked,
  roundCorner,
  text,
  win,
  ...rest
}: ICellProps) {
  return (
    <div className="min-w-32 min-h-32 w-32 h-32 xl:w-40 xl:h-40 xl:min-w-40 xl:min-h-40">
      <div
        className={classnames(
          'relative flex justify-center items-center select-none cursor-pointer p-2 text-center text-xs xl:text-sm h-full w-full',
          roundCorner &&
            (roundCorner === 'top-left'
              ? 'rounded-tl-1/5'
              : roundCorner === 'top-right'
              ? 'rounded-tr-1/5'
              : roundCorner === 'bottom-left'
              ? 'rounded-bl-1/5'
              : roundCorner === 'bottom-right'
              ? 'rounded-br-1/5'
              : undefined),
          win
            ? 'bg-teal-100 border-teal-200 hover:bg-teal-200 hover:border-teal-300'
            : marked
            ? [
                'bg-light-blue-vivid-050 border-light-blue-vivid-100 hover:bg-light-blue-vivid-100 hover:border-light-blue-vivid-200',
                !locked &&
                  'active:bg-light-blue-vivid-200 active:border-light-blue-vivid-300',
              ]
            : [
                'bg-white border-cool-grey-100 hover:bg-cool-grey-050',
                !locked &&
                  'active:bg-cool-grey-100 active:border-cool-grey-200',
              ],
          locked && 'cursor-not-allowed',
          className,
        )}
        {...rest}
      >
        {count !== undefined && (
          <div
            className={classnames(
              'absolute top-0 p-1 xl:p-2 flex',
              roundCorner === 'top-right' ? 'left-0' : 'right-0',
            )}
          >
            {/* <span className="font-semibold">{count}</span> */}
            {Array(countMax)
              .fill(undefined)
              .map((_, index) => (
                <svg
                  key={`check-${index}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={classnames(
                    'w-5 xl:w-6 icon-check fill-current',
                    index <= count - 1
                      ? 'text-cool-grey-700'
                      : 'text-cool-grey-200',
                  )}
                >
                  <path d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z" />
                </svg>
              ))}
          </div>
        )}
        {!!image ? (
          <img src={image} alt="Free Logo" className="w-full" />
        ) : (
          text
        )}
      </div>
    </div>
  );
}

export default Cell;
