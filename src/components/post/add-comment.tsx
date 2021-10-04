import { SyntheticEvent, useState, useContext } from 'react';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import { CommentsPropTypes } from './comments';

interface AddCommentProptypes extends CommentsPropTypes {
  setComments: React.Dispatch<
    React.SetStateAction<
      {
        comment?: string;
        displayName?: string | null;
      }[]
    >
  >;
}

const AddComment = ({
  docId,
  comments,
  setComments,
  commentInput,
}: AddCommentProptypes): JSX.Element => {
  const [comment, setComment] = useState('');
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const { displayName } = user;

  const handleSubmitComment = (event: SyntheticEvent) => {
    event.preventDefault();

    setComments([...comments, { displayName, comment }]); // Add display pic to the Comment and 
    setComment('');

    return firebase
      .firestore()
      .collection('posts')
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment }),
      });
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && 'opacity-25'
          }`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddComment;
