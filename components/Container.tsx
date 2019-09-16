import { DetailedHTMLProps, HTMLAttributes } from 'react';
import classnames from 'classnames';

function Container({
  children,
  className,
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div className={classnames('flex justify-center', className)} {...rest}>
      <div className="container">{children}</div>
    </div>
  );
}

export default Container;
