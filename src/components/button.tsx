import Spinner from './spinner';

interface ButtonWrapperProps extends React.ComponentPropsWithoutRef<'button'> {
  loading?: boolean;
}

const ButtonWrapper = ({ loading, children, ...rest }: ButtonWrapperProps) =>
  loading ? (
    <div className="">
      {children}
            <Spinner />
    </div>
  ) : (
    <>{children}</>
  );

export default ButtonWrapper;
