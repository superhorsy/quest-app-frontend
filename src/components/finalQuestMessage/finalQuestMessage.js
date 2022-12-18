import { Input, InputAdornment } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Send } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { IconButton } from "@mui/material";

export const FinalQuestMessage = () => {

	const [finalQuestMessage, setFinalQuestMessage] = useState("");


	return (
		<Box sx={{ display: "flex", alignItems: "centr", justifyContent: "space-between", mb: { xs: 3, sm: 7 } }}>
			<TextField
				required
				//fullWidth
				id="outlined-basic"
				label="Здесь можно написать финальное послание другу"
				variant="outlined"
				helperText="Описание послания адресат увидит после прохождением квеста"
				value={finalQuestMessage}
				sx={{ width: 500 }}
				onChange={(e) => setFinalQuestMessage(e.target.value)}
			/>
			<Box>
				<IconButton
					//endIcon={<NoteAddIcon />}
					variant="contained"
					//disabled={isEmptyField}
					sx={{
						mb: { xs: 1, sm: 3 },
						py: 1,
					}}
					
					size="small"
				>
					<SaveIcon />
				</IconButton>
				<IconButton
					aria-label="delete"
					sx={{
						mb: { xs: 1, sm: 3 },
						py: 1,
					}}
					size="small"
					
				>
					<ModeEditOutlineOutlinedIcon />
				</IconButton>
			</Box>
			{/* <Input
				onChange={(e) => setFinalQuestMessage(e.target.value)}
				placeholder="Здесь можно написать финальное послание другу"
				value={finalQuestMessage}
				
				fullWidth={true}
				endAdornment={
					<InputAdornment position="end">
						
							<Send
								className="send-form-btn"
								color="primary"
								
							/>
						
					</InputAdornment>
				}
			/> */}
		</Box >
	)

}


