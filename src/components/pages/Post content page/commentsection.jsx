import React, { useState } from 'react';
import { FiSend } from "react-icons/fi";
import { ProfilePic } from '../navbar/nav';
import Heart from '../postspage/heart'
import './commentsection.css'
const Commentsection = () => {
  const [comments, setComments] = useState([
    { id: 1, text: 'Today I had the idea to speak about my weekend routine in Korean as a speaking practice. It’s been a long time since I’ve spoken in Korean so I may make some mistakes or struggle a bit to find the words, feel free to correct me and point it out if I make any mistakes. ' },
    { id: 2, text: 'Another comment.' },
  ]);

  const [responses, setResponses] = useState({
    1: [{ id: 101, text: 'Reply to comment 1.' }],
  });

  const [newCommentText, setNewCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const handleAddComment = () => {

    const newComment = { text: newCommentText };
    setComments([...comments, newComment]);
    setNewCommentText('');
  };

  const handleReply = (commentId, text) => {

    const newResponse = { text };
    setResponses({
      ...responses,
      [commentId]: [...(responses[commentId] || []), newResponse],
    });

    setReplyText('');
    setReplyingTo(null);
  };

  return (
    <div className='commentsection'>
      <div className='addcomment'>
        <textarea
          value={newCommentText}
          onChange={e => setNewCommentText(e.target.value)}
          placeholder='Add comment'
        />
        <FiSend className='send' size={30} onClick={handleAddComment}/>
      </div>
        <div className="comments">
           
            {comments.map(comment => (
                <div key={comment.id}>
                     <div className="container">
                        <div className="pic">
                            <ProfilePic/>
                            <div className='inf'><div className="username">User Name</div>
                            <div className="date">Dec 15/2023 </div></div>
                        </div>
                        <div className="comment">
                            <p>{comment.text}</p>
                            <div className="reply">
                                <Heart/>
                                <div className="nbr">65</div>
                                <button onClick={() => setReplyingTo(comment.id)}>
                                    Reply
                                </button>
                            </div>
                        </div>
                     </div>
                     

                {responses[comment.id] &&
                    responses[comment.id].map(response => (
                    <div key={response.id}>
                        <div className="container1">
                            <div className="pic">
                                <ProfilePic/>
                                <div className='inf'><div className="username">User Name</div>
                                <div className="date">Dec 15/2023 </div></div>
                            </div>
                            <div className="replycmt">
                                <p>{response.text}</p>
                                <div className="reply">
                                    <Heart/>
                                    <div className="nbr">65</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    ))}

                {replyingTo === comment.id && (
                    <div className='replybox'>
                        <textarea
                            value={replyText}
                            onChange={e => setReplyText(e.target.value)}
                        />
                        <button onClick={() => handleReply(comment.id, replyText)}>
                            reply
                        </button>
                    </div>
                )}
                </div>
            ))}
        </div>
      
    </div>
  );
};

export default Commentsection;
