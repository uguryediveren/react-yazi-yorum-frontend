import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImageGroup } from "semantic-ui-react";

const YaziDetayi = (props) => {
    const { id } = props.match.params;

    const [yaziDetayi, setYaziDetayi] = useState({});
    const [yorumlar, setYorumlar] = useState([]);
    // const [displayName, setDisplayName] = useState("");
    // const [body, setBody] = useState("");
    // console.log("displayName: ", displayName);
    // console.log("body: ", body);
    const [commentBody, setCommentBody] = useState({ display_name: "", body: "" });


    const handleComment = (commentBody) => {
        axios.post(`https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`, {
            commentBody
        }).then(response => { console.log(response) }).catch(err => {
            console.log(err);
        })
    }

    const handleChange = (e) => {
        console.log(e);
        setCommentBody({ ...commentBody, [e.target.name]: e.target.value });
    }



    useEffect(() => {

        axios.get(`https://react-yazi-yorum.herokuapp.com/posts/${id}`).then((response) => {
            setYaziDetayi(response.data);
        }).catch((error) => {
            console.log(error + " --- Boyle bir içerik yok!");
        });

        axios.get(`https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`).then((response) => {
            setYorumlar(response.data);
        }).catch((error) => {
            console.log(error + " --- Yorumlar yok!");
        })
    });
    return (
        <React.Fragment>  {/* <>*/}
            <h2 className="ui header">{yaziDetayi.title}</h2>
            <p>{yaziDetayi.content}</p>
            <p>{yaziDetayi.created_at}</p>
            {/* 
                //yorumlar **
                //yorumlar listesi **
                //yorum yazma formu
            */}
            <h3>Yorumlar</h3>
            {yorumlar.map((yorum) => {
                return (
                    <div key={yorum.id} className="ui relaxed list">
                        <div className="item">
                            <img className="ui avatar image" src={`https://picsum.photos/id/${Math.floor(yorum.id / 10)}/200/300`} alt="avatar" />
                            <div className="content">
                                <a className="header">{yorum.display_name}</a>
                                <div className="description">{yorum.body}</div>
                            </div>
                        </div>

                    </div>
                )
            })}

            <h3>Yorum Yaz</h3>
            <form className="ui form" onSubmit={handleComment()}>
                <div className="ui small icon input">
                    <input name="display_name" type="text" value={commentBody.displayName} onChange={handleChange} placeholder="Adınız..." />
                </div> <br></br>
                <textarea name="body" onChange={handleChange} value={commentBody.body} placeholder="Yorumunuz..." rows="3"></textarea>
            </form>
        </React.Fragment> /* <>*/
    );
}

export default YaziDetayi;



