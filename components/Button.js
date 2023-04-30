import styled, {css} from "styled-components";

export const ButtonStyle = css`
  border:0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  svg{
    height: 25px;
    margin-right: 5px;
  }
  ${props => props.white && !props.outline && css`
  color: #fff;
  background-color: #000;
  `}
  ${props => props.white && props.outline && css`
  background-color: transparent;
  color: #fff;
  border: 1px solid #fff;
  `}
  ${props => props.primary && !props.outline && css`
  background-image: linear-gradient(to bottom right, #64748b, #ef4444);
  color: #fff;
  `}
  ${props => props.primary && props.outline && css`
  background-color: transparent;
  border: 1px solid #5542f6;
  color: #5542f6;
  `}
  ${props => props.size === 'l' && css`
    font-size:1.2rem;
    padding: 10px 20px;
  `}
`;

export const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({children,...rest}) {
  return (
    <StyledButton {...rest}>{children}</StyledButton>
  );
}