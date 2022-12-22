import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import SaveIcon from "@mui/icons-material/Save";

import {
  addFinalQuestMessage
} from "../../store/reducers/currentQuestSlice";

export const FinalQuestMessage = () => {
  const [finalQuestMessage, setFinalQuestMessage] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const finalMessage = useSelector((state) => state.currentQuestReducer.currentQuest.final_message);

  const handleEdit = () => {
    setIsEdit(false);
  };
  const handleSave = () => {
    dispatch(addFinalQuestMessage(finalQuestMessage));
    setIsEdit(true);
  };
  useEffect(() => {
    if(finalMessage) {
      setFinalQuestMessage(finalMessage)
    }
  }, [])

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
				mt: 3,
        mb: { xs: 3, sm: 3 },
        width: 1,
      }}
    >
      <TextField
        disabled={isEdit}
        required
        id="outlined-basic"
        multiline
        maxRows={4}
        label="Здесь можно написать финальное послание другу"
        variant="outlined"
        helperText="Описание послания адресат увидит после прохождением квеста"
        value={finalQuestMessage}
        sx={{ width: 9 / 10 }}
        onChange={(e) => setFinalQuestMessage(e.target.value)}
      />

      <Box>
        {isEdit ? (
          <IconButton onClick={handleEdit} sx={{ m: "0 auto" }}>
            <ModeEditOutlineOutlinedIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleSave} sx={{ m: "0 auto" }}>
            <SaveIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};
