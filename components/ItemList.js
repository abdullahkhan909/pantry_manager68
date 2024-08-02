import { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { collection, query, onSnapshot, deleteDoc, doc, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'; // Use this hook to manage user authentication

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [user] = useAuthState(auth); // Get the current user

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'items'), where('userId', '==', user.uid));
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
    } else {
      setItems([]);
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      const itemDoc = doc(db, 'items', id);
      await deleteDoc(itemDoc);
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
