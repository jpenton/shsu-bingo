import { DetailedHTMLProps, HTMLAttributes } from 'react';
import classnames from 'classnames';

interface ICardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  img?: string;
  title?: string;
}

function Card({ children, className, img, title, ...rest }: ICardProps) {
  return (
    <div
      className={classnames('bg-white shadow-md rounded-lg', className)}
      {...rest}
    >
      {img ? (
        <img className="w-full rounded-t-lg" src={img} alt={title} />
      ) : null}
      <div className="p-4">
        {title ? <h6 className="text-lg font-medium">{title}</h6> : null}
        {children}
      </div>
    </div>
  );
}

export default Card;
