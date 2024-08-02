import { useState, useEffect } from 'react';
import { db } from './firebase';
import { List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const itemsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsArray);
    }, (error) => {
      setError(error.message);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      const itemDoc = doc(db, 'items', id);
      await deleteDoc(itemDoc);
      // No need to update local state manually because of onSnapshot
    } catch (error) {
      console.error('Error deleting item: ', error);
      setError('Failed to delete item. Please try again.');
    }
  };

  return (
    <div>
      {error && <Typography color="error">{error}</Typography>}
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} />
            <IconButton onClick={() => handleDelete(item.id)} edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ItemList;
