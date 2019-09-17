import { DetailedHTMLProps, HTMLAttributes } from 'react';
import classnames from 'classnames';

function Container({
  children,
  className,
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div className={classnames('flex justify-center', className)} {...rest}>
      <div className="w-full px-8 lg:px-20 xl:px-48">{children}</div>
    </div>
  );
}

export default Container;
