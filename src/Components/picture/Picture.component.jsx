import React from 'react';
import { useState } from 'react';
import 'tachyons';

const Picture = ({ src, author, createdAt, comments, deletePicture, addComment }) => {
    const [height, setHeight] = useState(400);

    let own_picture = false;
    if (sessionStorage.getItem("username") === author) {
        own_picture = true;
    }
    let commentString = "";
    for (let i = 0; i < comments.length; i++) {
        commentString += comments[i]['author'] + ": " + comments[i]['comment'] + " (" + comments[i]['createdAt'] + "), ";
    }

    function commentsView() {
        for (let i = 0; i < comments.length; i++) {
            return (
                <div>
                    <p>{comments[i]['author']}</p>
                    <p>{comments[i]['comment']}</p>
                    <p>{comments[i]['createdAt']}</p>
                </div>)
        }
    }

    function imageGrow() {
        if (height === 400) {
            setHeight(height * 2);
        } else {
            setHeight(height / 2);
        }
    }

    return (
        <div className='tc bg-light-yellow ma2'>
            <button className="pointer bg-light-yellow" onClick={imageGrow}><img src={src} alt='newPicture' height={height} /></button>
            {
                height === 400 ?
                    <div>
                        {own_picture ?
                            <input className="grow dib f3-ns no-underline bg-light-yellow black-90 pointer" type="button" value="Delete Picture" onClick={deletePicture} />
                            : null
                        }
                        <h3 className="underline">Author: {author} </h3>
                        <p>Created at: {createdAt}</p>
                        <h3>Comments: </h3>
                        <div>{commentString}</div>
                        <input className="grow dib f3-ns no-underline bg-light-yellow black-90 pointer" id="newCommentButton" type="button" value="Add Comment" onClick={addComment} /> <br />


                    </div> : null
            }

        </div>
    )
}

export default Picture;