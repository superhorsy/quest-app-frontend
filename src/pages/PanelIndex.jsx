import { useNavigate } from "react-router-dom";
import { 
  CardActionArea, 
  Box, 
  Grid,
  CardContent,
  Card,
  Typography
} from '@mui/material';
import { Add } from "@mui/icons-material";

export const PanelIndex = () => { 
  const navigate = useNavigate();
  const goToMyQuests = () => {
    navigate('my-quests');
  };

  const goToMyProgress = () => {
    navigate('my-progress');
  };

  const goToAvailableQuests = () => {
    navigate('available-quests');
  };

  const goToCreateQuest = () => {
    navigate('create-quest');
  };

  const panelRouting = [
    {
      name:'Мои квесты',
      description: 'В данном разделе можно просмотреть созданные вами квесты.',
      topage: goToMyQuests,
    },
    {
      name:'Прогресс',
      description: 'Посмотреть прогресс текущего квеста, выбранного для прохождения.',
      topage: goToMyProgress,
    },
    {
      name: 'Доступные квесты',
      description: 'В данном разделе можно выбрать предложенные вам квесты.',
      topage: goToAvailableQuests,
    },
  ];

  return <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3} sx={{mt: 12}} alignItems="stretch">
        {panelRouting.map((nav) => (
          <Grid item xs={6}>
            <Card sx={{height: '100%'}}>
              <CardActionArea sx={{height: '100%'}} onClick={nav.topage} key={nav.name}>
                <CardContent sx={{height: '100%'}}>
                  <Typography variant="h5" component="p" sx={{lineHeight: 1, mb: 1}}>
                    {nav.name}
                  </Typography>
                  <Typography variant="default" component="p">
                    {nav.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        <Grid item xs={6}>
          <Card sx={{ textAlign: 'center', bgcolor: 'primary.main', color: 'common.white', height: '100%' }}>
            <CardActionArea sx={{height: '100%'}} onClick = {goToCreateQuest}>
              <CardContent sx={{height: '100%'}}>
                <Typography variant="h5" component="p" sx={{lineHeight: 1, mb: 1}}>
                    Создать новый квест
                </Typography>
                <Add/>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  </>;
};