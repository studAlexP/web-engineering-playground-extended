import { useState } from 'react';

interface CommentProps {
  name: string;
  description: string;
}

function Comment(): React.JSX.Element {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const initialComments: CommentProps[] = [
    {
      name: 'Bob Fossil',
      description:
        'Oh, I am so glad you taught me all about the big brown angry guys in the woods.' +
        'With their sniffing little noses and their bad attitudes, they can sure be a menace —' +
        'I was thinking of putting them all in a truck and driving them out of here.' +
        'I run a zoo, you know.',
    },
  ];

  const [comments, setComments] = useState<CommentProps[]>(initialComments);

  const [isVisible, setVisible] = useState<boolean>(false);
  const toggleCommentsButton = (): void => {
    setVisible(!isVisible);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (name !== '' && description !== '') {
      const newComment: CommentProps = { name, description };
      setComments([...comments, newComment]);
      setName('');
      setDescription('');
    }
  };

  return (
    <section className="comments">
      <div
        className="show-hide"
        tabIndex={0}
        role="button"
        onClick={toggleCommentsButton}
      >
        {isVisible ? 'Hide comments' : 'Show comments'}
      </div>

      {isVisible && (
        <div className="comment-wrapper">
          <h2>Add comment</h2>

          <form className="comment-form" onSubmit={handleSubmit}>
            <div className="flex-pair">
              <label htmlFor="name">Your name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter your name"
              />
            </div>
            <div className="flex-pair">
              <label htmlFor="comment">Your comment:</label>
              <input
                type="text"
                name="comment"
                id="comment"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="Enter your comment"
              />
            </div>
            <div>
              <input type="submit" value="Submit comment" />
            </div>
          </form>

          <h2>Comments</h2>
          <ul className="comment-container">
            {comments.map((comment, i) => (
              <li key={i}>
                <p>{comment.name}</p>
                <p>{comment.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default Comment;
