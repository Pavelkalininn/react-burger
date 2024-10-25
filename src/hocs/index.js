import cn from 'classnames';
import wrapperStyles from './style.module.css';


export const pageWrapper =
  (WrappedComponent) =>
  ({ title, ...props }) => {
    return (
      <div className={cn(wrapperStyles.wrapper, 'text text_type_main-default')}>
        <p className={'text text_type_main-medium'}>{title}</p>
        <WrappedComponent {...props} />
      </div>
    );
  };