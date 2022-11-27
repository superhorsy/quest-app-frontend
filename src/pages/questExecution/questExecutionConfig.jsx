import {styled} from "@mui/material/styles";
import {colors} from "../../constants/constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";

export const ColorLibStepIconRoot = styled('div')(({theme, ownerState}) => ({
    backgroundColor: !ownerState.active && (ownerState.isWrongAnswer ? colors.danger : colors.success),
    zIndex: 1,
    color: '#fff',
    width: 24,
    height: 24,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px',
    ...(ownerState.active && {
        backgroundColor: colors.primary,
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    })
}));

export function ColorLibStepIcon(props, step) {
    const {active, completed, className} = props;
    const {hasAnswer, rightAnswer, id} = step
    const isWrongAnswer = hasAnswer && !rightAnswer

    const icons = {
        1: <FontAwesomeIcon icon={faCheck}/>,
        2: <FontAwesomeIcon icon={faXmark}/>,
    };

    return (
        <ColorLibStepIconRoot ownerState={{completed, active, isWrongAnswer}} className={className}>
            {active && id}
            {!active && (isWrongAnswer ? icons[2] : icons[1])}
        </ColorLibStepIconRoot>
    );
}