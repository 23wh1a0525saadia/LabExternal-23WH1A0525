import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Divider,
  Button,
} from '@mui/material';
import NotesTable from './components/NotesTable';
import { fetchNotes } from './api';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchNotes(page, limit)
      .then((res) => {
        // res: { data: [...], total }
        setNotes(Array.isArray(res.data) ? res.data : []);
        setTotal(typeof res.total === 'number' ? res.total : 0);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [page, limit]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        QuickNotes Pro
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}


      {!loading && !error && (
        <>
          <NotesTable notes={notes} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              Previous
            </Button>

            <Typography>
              Page {page} of {Math.max(1, Math.ceil(total / limit))} — Total: {total}
            </Typography>

            <Button
              variant="contained"
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= Math.max(1, Math.ceil(total / limit))}
            >
              Next
            </Button>
          </Box>
        </>
      )}
      <Divider sx={{ my: 4 }} />

    </Container>
  );
}

export default App;
