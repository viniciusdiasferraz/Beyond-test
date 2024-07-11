// App.js
import { useEffect } from 'react';
import { Grid, Paper, Box, ThemeProvider } from '@mui/material';
import Modal from './components/Modal';
import FormCandidate from './components/FormCandidate/index';
import ListCandidates from './components/ListCandidates';
import useApi from './hooks/useApi';
import { useApiContext } from './context/context';
import theme from './theme';

function App() {
  const { users } = useApiContext();
  const { allCandidates } = useApi();

  useEffect(() => {
    if (users && users.length === 0) {
      allCandidates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Grid container spacing={10} p={5}>
          <Grid item xs={12} sm={5}>
            <Paper sx={{ p: 2, borderRadius: 2, bgcolor: '#f0f0f0', minWidth: '100%' }}>
              <FormCandidate />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={7}>
            <Paper sx={{ p: 2, borderRadius: 2, bgcolor: '#f0f0f0', minWidth: '100%' }}>
              <ListCandidates />
            </Paper>
          </Grid>
        </Grid>
        <Modal />
      </Box>
    </ThemeProvider>
  );
}

export default App;
