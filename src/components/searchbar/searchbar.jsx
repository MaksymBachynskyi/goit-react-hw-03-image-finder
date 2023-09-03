import {
  SearchBarStyled,
  Form,
  BtnStyled,
  StyledInput,
} from './searchbar.styled';
export const Searchbar = ({ onSubmit }) => {
  return (
    <SearchBarStyled>
      <Form
        onSubmit={event => {
          event.preventDefault();
          return onSubmit(event.target.elements.search.value);
        }}
      >
        <BtnStyled type="submit">
          <span>Search</span>
        </BtnStyled>

        <StyledInput
          name="search"
          type="text"
          placeholder="Search images and photos"
        />
      </Form>
    </SearchBarStyled>
  );
};
