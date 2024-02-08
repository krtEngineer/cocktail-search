import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 6rem;
  .form {
    display: grid;
    grid-template-rows: 1fr 1fr;
    row-gap: 1rem;
  }

  @media screen and (min-width: 450px) {
    .form {
      grid-template-columns: 1fr auto;
      grid-template-rows: 1fr;
    }
    .form-input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .btn {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;

export default Wrapper;
