import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

function NotesTable({ notes }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="notes table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Title</strong></TableCell>
            <TableCell><strong>Content</strong></TableCell>
            <TableCell><strong>Category</strong></TableCell>
            <TableCell><strong>Created At</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No notes found.
              </TableCell>
            </TableRow>
          ) : (
            notes.map((note) => (
              <TableRow key={note._id}>
                <TableCell>{note.title}</TableCell>
                <TableCell>{note.content}</TableCell>
                <TableCell>{note.category}</TableCell>
                <TableCell>
                  {new Date(note.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default NotesTable;
