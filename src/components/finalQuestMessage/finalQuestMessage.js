import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import { addFinalQuestMessage } from "../../store/reducers/currentQuestSlice";

export const FinalQuestMessage = () => {
  const [finalQuestMessage, setFinalQuestMessage] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const finalMessage = useSelector(
    (state) => state.currentQuestReducer.currentQuest.final_message
  );

  const handleEdit = () => {
    setIsEdit(false);
  };
  const handleSave = () => {
    dispatch(addFinalQuestMessage(finalQuestMessage));
    setIsEdit(true);
  };
  useEffect(() => {
    if (finalMessage) {
      setFinalQuestMessage(finalMessage);
      setIsEdit(true);
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
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
        label="Послание получателю"
        variant="outlined"
        helperText="Данное послание получатель увидит после прохождения квеста"
        value={finalQuestMessage}
        sx={{ width: '100%', mr: 1 }}
        onChange={(e) => setFinalQuestMessage(e.target.value)}
      />

      <Box>
        {isEdit ? (
          <IconButton
            onClick={handleEdit}
            sx={{ m: "0 auto" }}
            size="large"
          >
            <ModeEditOutlineOutlinedIcon fontSize="inherit" />
          </IconButton>
        ) : (
          <Tooltip
            title="сохранить послание"
            placement="top"
          >
            <span>
              <IconButton
                onClick={handleSave}
                sx={{ m: "0 auto" }}
                color="success"
                size="large"
              >
                <SaveOutlinedIcon fontSize="inherit" />
              </IconButton>
            </span>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};
