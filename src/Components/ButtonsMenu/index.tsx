import { ISession } from "../../Api/Session/interfaces";
import { IWebSocketProps } from "../../Api/websocket";
import { ButtonAddQuestion } from "../ButtonAddQuestion";
import { ButtonHome } from "../ButtonHome";
import { MenuContainer } from "./styled";

interface IButtonsMenuProps extends IWebSocketProps {
	session?: ISession;
}

export const ButtonsMenu = ({ session }: IButtonsMenuProps) => {
	return (
		<MenuContainer>
			<ButtonHome />
			<ButtonAddQuestion sessionExists={Boolean(session?.id)} />
		</MenuContainer>
	);
};
