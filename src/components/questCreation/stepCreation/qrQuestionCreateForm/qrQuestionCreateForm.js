import React, { useState } from "react";

import QRCode from "qrcode";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { updateQuest } from "../../../../store/actions/actions";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import styles from "./qrQuestionCreateForm.module.scss";

export const QRQuestionCreateForm = () => {

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [qrImageUrl, setQrImageUrl] = useState("");

  // для qr-code
  const imageSaveName = `qr-code-${taskDescription}.png`;
  const { questId } = useParams();
  const quests = useSelector(state => state.createdQuestsReducer.quests);
  const currentQuest = quests.find(item => item.id === questId);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isEmptyField = !taskName || !taskDescription;

  const handleCreateQRCode = async () => {
    const response = await QRCode.toDataURL(taskDescription);
    setQrImageUrl(response);
  };

  const onCreateTaskSubmit = (event) => {
    event.preventDefault();

    let stepN = currentQuest.steps.length + 1;

    let copyOfCurrentQuest = structuredClone(currentQuest);

    const step = {
      quest_id: questId,
      sort: stepN,
      description: taskName,
      question_type: "qr",
      question_content: taskDescription,
      answer_type: "text",
      answer_content: [taskDescription],
    };
    copyOfCurrentQuest.steps.push(step);

    dispatch(updateQuest(copyOfCurrentQuest));
    navigate(`/panel/quest-profile/${questId}`);
  };
  return (
    <Box
      component="form"
      sx={{
        m: "0 auto",
        mb: { xs: 2, sm: 3 },
        textAlign: "center",
        width: { xs: 1 / 1, sm: 500 },
      }}
      noValidate={false}
      autoComplete="off"
      onSubmit={onCreateTaskSubmit}
    >
      <TextField
        fullWidth
        id="outlined-basic"
        label="Название задания"
        variant="outlined"
        helperText="Например: отсканируйте QR-код"
        sx={{ mb: { xs: 3, sm: 7 } }}
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <TextField
        fullWidth
        id="outlined-basic"
        label="Введите строку для генерации QR-кода"
        variant="outlined"
        helperText="Например: Ты такой хороший человек, спасибо , что отсканировал этот код"
        multiline
        rows={4}
        sx={{ mb: { xs: 3, sm: 6 } }}
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <Box
        component="div"
        sx={{
          m: "0 auto",
          mb: { xs: 2, sm: 5 },
          textAlign: "center",
          width: { xs: 1 / 1, sm: 500 },
        }}
      >
        <div className={styles.qrCodeBox}>
          <Button
            variant="contained"
            size="large"
            disabled={!taskDescription}
            onClick={handleCreateQRCode}
          >
            Создать QR-код
          </Button>
          {qrImageUrl && (
            <div className={styles.qrCodeBox__qr}>
              <a href={qrImageUrl} download={imageSaveName}>
                <img src={qrImageUrl} alt="QR Code" />
              </a>
            </div>
          )}
          {qrImageUrl && <span>Для сохранения QR-кода нажмите на него.</span>}
        </div>
      </Box>
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isEmptyField}
      >
        Сохранить
      </Button>
    </Box>
  );
};
