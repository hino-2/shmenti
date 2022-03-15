import { ButtonAddQuestion } from "../AddQuestion";
import { ButtonHome } from "../ButtonHome";
import { MenuContainer } from "./styled";

export const ButtonsMenu = () => {
  return (
    <MenuContainer>
      <ButtonHome />
      <ButtonAddQuestion />
    </MenuContainer>
  );
};
