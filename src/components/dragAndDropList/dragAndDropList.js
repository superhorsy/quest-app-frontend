import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSteps } from "../../store/reducers/currentQuestSlice";

import Box from "@mui/material/Box";
import { IconButton, ListItemText } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const DragAndDropList = () => {

  const steps = useSelector((state) => state.currentQuestReducer.currentQuest.steps);
  const dispatch = useDispatch();
  // const [steps, setSteps] = useState([
  //   { name: "Step", sort: 1, description: "Отгадай загадку" },
  //   { name: "Step", sort: 2, description: "Отсканируй QR - код" },
  //   {
  //     name: "Step",
  //     sort: 3,
  //     description:
  //       "Сходи к бабушке и помоги ей убрать квартиру и она даст тебе код. Сходи к бабушке и помоги ей убрать квартиру и она даст тебе код.",
  //   },
  //   {
  //     name: "Step",
  //     sort: 4,
  //     description:
  //       "Сходи к бабушке и помоги ей убрать квартиру и она даст тебе код. Сходи к бабушке и помоги ей убрать квартиру и она даст тебе код.",
  //   },
  //   {
  //     name: "Step",
  //     sort: 5,
  //     description:
  //       "Сходи к бабушке и помоги ей убрать квартиру и она даст тебе код. Сходи к бабушке и помоги ей убрать квартиру и она даст тебе код.",
  //   },
  //   {
  //     name: "Step",
  //     sort: 6,
  //     description:
  //       "Сходи к бабушке и помоги ей убрать квартиру и она даст тебе код. Сходи к бабушке и помоги ей убрать квартиру и она даст тебе код.",
  //   },
  //   {
  //     name: "Step",
  //     sort: 7,
  //     description:
  //       "Сходи к бабушке и помоги ей убрать квартиру и она даст тебе код. Сходи к бабушке и помоги ей убрать квартиру и она даст тебе код.",
  //   },
  //   {
  //     name: "Step",
  //     sort: 8,
  //     description:
  //       "Сходи к бабушке и помоги ей убрать квартиру и она даст тебе код. Сходи к бабушке и помоги ей убрать квартиру и она даст тебе код.",
  //   },
  // ]);

  //save reference for dragitem and dragOverItem
  const dragItem = React.useRef(null);
  const dragOverItem = React.useRef(null);

  //const handle drag sorting

  const handleSort = () => {
    //duplicate items
    let _steps = [...steps];

    // remove and save the dragged item content
    const draggedItemContent = _steps.splice(dragItem.current, 1)[0];

    // switch the position
    _steps.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    // update the actual array
    // setSteps(_steps);
    dispatch(addSteps(_steps));
  };

  return (
    <Box component="div" sx={{ maxWidth: 600, width: 1, boxSizing: "border-box" }}>
      <Box sx={{ width: 1, mb: 2 }}>
        {steps &&
          steps.map((step, index) => (
            <Box
              component="div"
              draggable
              onDragStart={(e) => (dragItem.current = index)}
              onDragEnter={(e) => (dragOverItem.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
              key={index}
              button
              sx={{
                display: "flex",
                width: 1,
                flexDirection: "column",
                alignItems: "center",
                border: "1px solid lightgray",
                borderRadius: 5,
                boxSizing: "border-box",
                mb: 1,
                minHeight: 60,
                p: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  width: 1
                }}
              >
                <ListItemText
                  sx={{ fontSize: { xs: 14, sm: 16 }, width: 8 / 9 }}
                >
                  <b>
                    {step.name} {step.sort}: {step.description}
                  </b>
                </ListItemText>
                <Box
                  sx={{
                    width: 1 / 9,
                    display: "flex",
                    alignItems: "start",
                    justifyContent: { xs: "space-around", sm: "center" },
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <IconButton sx={{ color: "#8FBC8F", p: { xs: 0.5 } }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    sx={{ color: "#F08080", p: { xs: 0.5 } }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              <ListItemText sx={{ fontSize: { xs: 14, sm: 16 }, width: 1 }}>
                {step.description}
              </ListItemText>
            </Box>
          ))}
      </Box>
    </Box>
  );
};
