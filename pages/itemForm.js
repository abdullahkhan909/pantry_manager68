import React, { useState, useEffect, useRef } from 'react';
import { db, storage } from '../components/firebase'; // Ensure correct path to firebase.js
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useAuth } from '../components/auth'; // Import your authentication context or hook

function ItemForm() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState(null); // New state to track the item being edited
  const fileInputRef = useRef(null); // Ref for file input field
  const { user } = useAuth(); // Get the current user

  // Fetch items from Firestore
  useEffect(() => {
    if (user) {
      const itemsCollectionRef = collection(db, 'items');
      const unsubscribe = onSnapshot(itemsCollectionRef, (snapshot) => {
        const itemsList = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(item => item.userId === user.uid); // Filter by user ID
        setItems(itemsList);
        setFilteredItems(itemsList);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        throw new Error('User is not authenticated');
      }

      if (editingItem) {
        // Update the existing item
        const docRef = doc(db, 'items', editingItem.id);
        await updateDoc(docRef, {
          name: itemName,
          quantity: quantity,
        });

        // Upload the new image if selected
        if (image) {
          const imageRef = ref(storage, `items/${docRef.id}`);
          await uploadBytes(imageRef, image);
          const imageUrl = await getDownloadURL(imageRef);
          await updateDoc(docRef, { imageUrl });
        }

        setEditingItem(null);
      } else {
        // Add a new document
        const itemsCollectionRef = collection(db, 'items');
        const docRef = await addDoc(itemsCollectionRef, {
          name: itemName,
          quantity: quantity,
          imageUrl: '', // Placeholder for the image URL
          userId: user.uid, // Associate item with user ID
        });

        // Upload the image if selected
        if (image) {
          const imageRef = ref(storage, `items/${docRef.id}`);
          await uploadBytes(imageRef, image);
          const imageUrl = await getDownloadURL(imageRef);
          await updateDoc(docRef, { imageUrl });
        }
      }

      // Clear the form fields
      setItemName('');
      setQuantity('');
      setImage(null);

      // Clear the file input field
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error adding/updating document: ', error);
    }
  };

  const handleEdit = (item) => {
    setItemName(item.name);
    setQuantity(item.quantity);
    setEditingItem(item);
  };

  const handleDelete = async (id, imageUrl) => {
    try {
      const docRef = doc(db, 'items', id);
      if (imageUrl) {
        const imageRef = ref(storage, `items/${id}`);
        await deleteObject(imageRef);
      }
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = items.filter(item => item.name.toLowerCase().includes(query));
    setFilteredItems(filtered);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleAddOrUpdate} style={styles.form}>
        <h2 style={styles.title}>{editingItem ? 'Update Item' : 'Add New Item'}</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>Item Name:</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Quantity Needed:</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            ref={fileInputRef} // Set ref to file input field
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.submitButton}>
          {editingItem ? 'Update Item' : 'Add Item'}
        </button>
      </form>

      <div style={styles.searchContainer}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search items..."
          style={styles.searchInput}
        />
      </div>

      <div style={styles.list}>
        {filteredItems.map((item) => (
          <div key={item.id} style={styles.item}>
            <span style={styles.itemText}>{item.name} (Qty: {item.quantity})</span>
            {item.imageUrl && <img src={item.imageUrl} alt={item.name} style={styles.image} />}
            <div style={styles.buttonsContainer}>
              <button onClick={() => handleEdit(item)} style={styles.editButton}>Edit</button>
              <button onClick={() => handleDelete(item.id, item.imageUrl)} style={styles.deleteButton}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    background: 'linear-gradient(to right, #f5f5f5, #e0e0e0)',
    minHeight: '100vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '100%',
    backgroundColor: '#ffffff',
    marginBottom: '20px',
    transition: 'transform 0.2s ease',
  },
  title: {
    marginBottom: '15px',
    color: '#333',
    fontSize: '24px',
    fontWeight: '600',
  },
  formGroup: {
    marginBottom: '15px',
    width: '100%',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: '500',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
    fontSize: '16px',
  },
  submitButton: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  searchContainer: {
    marginBottom: '20px',
    width: '100%',
    maxWidth: '500px',
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
    fontSize: '16px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '500px',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
    marginBottom: '10px',
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  image: {
    maxWidth: '100px',
    maxHeight: '100px',
    objectFit: 'cover',
    marginBottom: '10px',
  },
  buttonsContainer: {
    display: 'flex',
    gap: '10px',
  },
  editButton: {
    backgroundColor: '#ffc107',
    color: '#fff',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ItemForm;
