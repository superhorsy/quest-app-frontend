import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSteps, deleteStep } from "../../store/reducers/currentQuestSlice";

import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// import DeleteIcon from "@mui/icons-material/Delete";

import TextIcon from "../../assets/images/questions/text-icon.png";
import QRIcon from "../../assets/images/questions/qr-icon.png";
import styles from "./dragAndDropList.module.scss";

export const DragAndDropList = () => {
  const steps = useSelector(
    (state) => state.currentQuestReducer.currentQuest.steps
  );
  const dispatch = useDispatch();

  //save reference for dragitem and dragOverItem
  const dragItem = React.useRef(null);
  const dragOverItem = React.useRef(null);

  //const handle drag sorting

  const handleSort = () => {
    //duplicate items
    let _steps = structuredClone(steps);

    // remove and save the dragged item content
    let draggedItemContent = _steps.splice(dragItem.current, 1)[0];
    console.log("draggedItemContent", draggedItemContent);

    // switch the position
    _steps.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    // update the actual array
    _steps = _steps.map((item, ind) => {
      item.sort = ind + 1;
      return item;
    });
    dispatch(addSteps(_steps));
  };

  const handleDeleteStep = (id) => {
    dispatch(deleteStep(id));
  }

  return (
    <Box
      component="div"
      sx={{
        maxWidth: 600,
        width: 1,
        boxSizing: "border-box",
        mt: { xs: 1, sm: 4 },
      }}
    >
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
                  width: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: 30,
                    mr: 1,
                  }}
                >
                  {step.question_type === "text" && (
                    <img src={TextIcon} alt="text" />
                  )}
                  {step.question_type === "qr" && (
                    <img src={QRIcon} alt="qr" />
                  )}
                </Box>
                <div
                  className={styles.question__title}                >
                  <b>{step.description}</b>
                </div>
                <Box
                  sx={{
                    width:{xs: 2 / 9, sm: 1/9},
                    ml: 2,
                    display: "flex",
                    alignItems: "start",
                    justifyContent: { sm: "center" },
                    flexDirection: {  sm: "row" },
                  }}
                >
                  <IconButton sx={{ color: "#cfd8dc", p: { xs: 0.5 } }}>
                    <ModeEditOutlineOutlinedIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    sx={{ color: "#ff6090", p: { xs: 0.5 } }}
                    onClick={() => dispatch(deleteStep(step.id))}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </Box>
              </Box>
              <div className={styles.question__desc}>
                {step.question_content}
              </div>
            </Box>
          ))}
      </Box>
    </Box>
  );
};
