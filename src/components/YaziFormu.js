import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { api } from "../api";



const YaziFormu = (props) => {
    const TEXT_BASLANGIC = { title: "", content: "" }

    const [text, setText] = useState({});
    const [error, setError] = useState("");

    console.log("yaziFormu_props", props);



    const onInputChange = (e) => {
        setText({ ...text, [e.target.name]: e.target.value });
    }

    console.log("props.postId: ", props.postId);
    // console.log("props.editComment: ", props.editComment);


    useEffect(() => {
        if (props.edit) {
            setText(props.edit);
        } else if (props.editComment) {
            setText(props.editComment);
        }
    }, [props.edit,props.editComment]);

    



    const onFormSubmit = (e) => {
        setError("");
        e.preventDefault();

        if (props.edit) {
            console.log("yazı editleme");
            api().put(`/posts/${props.id}`, text)
                .then(res => {
                    props.history.push(`/posts/${props.id}`);
                })
                .catch(err => {
                    setError("Başlık ve yazı içeriği alanları zorunludur!");
                });
        } else if (props.editComment) {
            api().put(`/posts/${props.postId}/comments/${props.commentId}`, text)
                .then(res => {
                    props.history.push(`/posts/${props.postId}`);
                }).catch(err => {
                    setError("Yazı içeriği alanının doldurulması zorunludur!");
                });
        }
        else {
            api().post(`/posts/`, text)
                .then((response) => {
                    setText(TEXT_BASLANGIC);
                    props.history.push("/");
                })
                .catch(e => {
                    setError("Başlık ve yazı içeriği alanları zorunludur!")
                });
        }
    }

    return (<>
        {error && <div className="ui error message">
            <div className="header">Hata</div>
            <p>{error}</p>
        </div>
        }
        <div className="ui form">
            <div className="field">
                <label>Yazi Başlığı</label>
                <input disabled={props.editComment ? true : false}
                    value={text.display_name || text.title} onChange={onInputChange} name={props.editComment?"display_name":"title"} type="text"
                />
            </div>
            <div className="field">
                <label>Yazi İçeriği</label>
                <textarea value={text.body || text.content} onChange={onInputChange} name={props.editComment?"body":"content"} rows="2"></textarea>
            </div>
            <button onClick={onFormSubmit} className="ui primary button">
                Gönder
            </button>
            <button onClick={()=>props.history.push(`/posts/${props.cancelId}`)} className="ui button">
                İptal
            </button>
        </div>
    </>
    )
}


export default withRouter(YaziFormu);