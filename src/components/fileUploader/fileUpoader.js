import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../../store/actions/actions";
import { clearMedia } from "../../store/reducers/mediaSlice";

import { Button, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Loader } from "../loader/loader.js";

import styles from "./fileUploader.module.scss";

export const FileUploader = ({ type, media }) => {
  const fiveMB = 5242880;
  const maxFileSize = fiveMB;

  const { isLoading } = useSelector((state) => state.mediaReducer);

  const imageAccept = "image/png, image/jpg, image/jpeg";
  const audioAccept = "audio/mp3, audio/wav, audio/webm";
  const filePiker = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();

  const isFileSizeOk = selectedFile?.size < maxFileSize ? true : false;

  let accept = type === "image" ? imageAccept : audioAccept;

  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("type", type);
    formData.append("file", selectedFile);

    if (isFileSizeOk) {
      dispatch(uploadFile(formData));
    }
    setSelectedFile(null);
  };
  const handlePick = () => {
    filePiker.current.click();
  };

  const handleDelete = () => {
    dispatch(clearMedia());
    setSelectedFile(null);
  };

  return (
    <Box component="div" sx={{ width: 1, minHeight: 100, mb: 4 }}>
      <Box
        component="div"
        sx={{
          width: 1,
          display: "flex",
          justifyContent: "space-around",
          mt: 2,
        }}
      >
        <Button variant="contained" onClick={handlePick}>
          Выбрать файл
        </Button>

        <input
          className={styles.hidden}
          type="file"
          ref={filePiker}
          onChange={handleChange}
          accept={accept}
        />

        <Button
          disabled={!selectedFile}
          variant="contained"
          endIcon={<UploadFileOutlinedIcon />}
          onClick={handleUpload}
        >
          Загрузить
        </Button>
      </Box>

      {selectedFile && (
        <div className={styles.preview}>
          <PhotoSizeSelectActualOutlinedIcon sx={{ mr: 2 }} />
          {selectedFile.name} {selectedFile.size} КБ
        </div>
      )}
      {selectedFile && !isFileSizeOk && (
        <div className={styles.notification}>
          Размер файла превышает максимальное значение в 5 МБ
        </div>
      )}

      {isLoading && <Loader />}

      {!isLoading && media && type === "image" && (
        <>
          {media.link && (
            <div className={styles.file}>
              <img
                className={styles.file__img}
                alt="задание в виде картинки"
                src={media.link}
              />
              <div className={styles.file__text}>{media.filename}</div>
              <IconButton
                sx={{ color: "#ff6090", ml: 2 }}
                onClick={handleDelete}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </div>
          )}
        </>
      )}
    </Box>
  );
};
