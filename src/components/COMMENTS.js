import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import fetchAPI from '../api/index';
import './COMMENTS.css';

function Comments(props) {
    const {contact} = props
    const [commentList, setCommentList] =useState(contact.comments)
    const [newComment, setNewComment]= useState('')


    return (
        <div className="comments">
            <p><strong>Comments: </strong> {commentList.length === 0? 'None' : null }</p>
            {commentList === 0? null : (commentList).map((comment, index) => {
                return (<div key={index} className="single-comment">
                    <p> - {comment.content}</p>
                    <button
                        onClick={async (event) => {
                            event.preventDefault()
                            fetchAPI(`https://univ-contact-book.herokuapp.com/api/comments/${comment.id}`, "DELETE")
                            .then(function (){
                                const newList = commentList.filter(otherComments => otherComments.id !== comment.id);
                                setCommentList(newList)
                            })
                            .catch(console.error);
                        }}
                        >Delete Comment</button>
                </div>
                 )
            })}
            <form>

                <input 
                    className="comment-form"
                    type={TextField} 
                    placeholder="Type New Comment" 
                    value={newComment} 
                    onChange= {(event) => {
                        setNewComment(event.target.value)}}>
                </input>
                <button
                    className="comment-submit"
                    onClick={async (event) => {
                        event.preventDefault()
                        fetchAPI(`https://univ-contact-book.herokuapp.com/api/contacts/${contact.id}/comments`, "POST", {
                        content: newComment,
                        })
                        .then(function (data) {

                            setCommentList([...commentList, data.comment]);
                        })
                        .then(
                            setNewComment('')
                        )
                        .catch(console.error);
                    }}
                >Add Comment</button>
            </form>
        </div>
    )

}

export default Comments