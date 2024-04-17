import { useState, useEffect } from 'react';
import { Button, Form, ListGroup, Spinner, Alert } from 'react-bootstrap';
import NavBar from './NavBar';

function CommentSection() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch comments from the server using the access token
    const accessToken = localStorage.getItem('accessToken');
    fetch('http://127.0.0.1:5500/comments', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments || []);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching comments. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleAddComment = () => {
    const accessToken = localStorage.getItem('accessToken');

    fetch('http://127.0.0.1:5500/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ text: newComment }),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments((prevComments) => [...prevComments, data]); // Update state immediately
        setNewComment('');
      })
      .catch((error) => {
        setError('Error adding comment. Please try again.');
      });
  };  

  const handleEditComment = (commentId) => {
    setEditingCommentId(commentId);
  };

  const handleSaveComment = (commentId, updatedText) => {
    const accessToken = localStorage.getItem('accessToken');

    fetch(`http://127.0.0.1:5500/comments/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ text: updatedText }),
    })
      .then(() => {
        const updatedComments = comments.map((comment) =>
          comment.id === commentId ? { ...comment, text: updatedText } : comment
        );
        setComments(updatedComments);
        setEditingCommentId(null);
      })
      .catch((error) => {
        setError('Error saving comment. Please try again.');
      });
  };

  const handleDeleteComment = (commentId) => {
    const accessToken = localStorage.getItem('accessToken');

    fetch(`http://127.0.0.1:5500/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(() => {
        const updatedComments = comments.filter((comment) => comment.id !== commentId);
        setComments(updatedComments);
      })
      .catch((error) => {
        setError('Error deleting comment. Please try again.');
      });
  };

  return (
    <div className="container mt-4">
      <div className='container bg-dark p-1 mb-1'>
      <h1 className="text-warning mt-4 text-center">FITFLEX HOME TRAINER 💪🏋️🏋️‍♀️ 🤼‍♂️</h1>
        <br></br>
        <NavBar />
      </div>
      <div className='container'>
      <h1 className="text-center text-warning">Comment Section</h1>
      <div className="container" style={{ width: '50%' }}>
      <Form className="mb-3">
        <Form.Group controlId="newComment">
          <Form.Control
            type="text"
            placeholder="Add a new comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <br></br>
        </Form.Group>
        <Button variant="primary" onClick={handleAddComment}>
          Add Comment
        </Button>
      </Form>

      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <ListGroup>
          {comments.map((comment) => (
            <ListGroup.Item key={comment.id} className="d-flex justify-content-between">
              <div>
                {editingCommentId === comment.id ? (
                  <>
                    <input
                      type="text"
                      value={comment.text}
                      onChange={(e) => handleSaveComment(comment.id, e.target.value)}
                    />
                    <Button
                      variant="warning"
                      className="ms-2"
                      onClick={() => handleSaveComment(comment.id, comment.text)}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    {comment.text}
                    <Button
                      variant="info"
                      className="ms-2"
                      onClick={() => handleEditComment(comment.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="ms-2"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
    </div>
    </div>
  );
}

export default CommentSection;
