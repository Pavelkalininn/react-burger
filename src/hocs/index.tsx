import cn from 'classnames';
import wrapperStyles from './style.module.css';
import { ReactElement } from 'react';


export const pageWrapper =
  (WrappedComponent: () => ReactElement) =>
  ({ title, ...props }: { title?: string; [x: string]: any }) => {
    return (
      <div className={cn(wrapperStyles.wrapper, 'text text_type_main-default')}>
        <p className={'text text_type_main-medium'}>{title}</p>
        {
          <WrappedComponent {...props} />
        }
      </div>
    );
  };