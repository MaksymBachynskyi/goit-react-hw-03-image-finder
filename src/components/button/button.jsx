import { ButtonLoad } from './button.styled';
export const Button = ({ children, onLoadMore }) => {
  return (
    <ButtonLoad type="button" onClick={onLoadMore}>
      {children}
    </ButtonLoad>
  );
};
