import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { api } from "../api";



const YaziFormu = (props) => {
    const TEXT_BASLANGIC = { title: "", content: "" }

    const [text, setText] = useState(TEXT_BASLANGIC);
    const [error, setError] = useState("");
    const [disabledFlag, setDisabledFlag] = useState(false);



    const onInputChange = (e) => {
        setText({ ...text, [e.target.name]: e.target.value });
    }

    console.log("props.edit: ", props.edit);
    console.log("props.editComment: ", props.editComment);



    useEffect(() => {
        if (text.display_name === undefined) {
            setDisabledFlag(false);
        }
        else {
            setDisabledFlag(true);
        }

        if (props.edit) {
            setText(props.edit);
        } else if (props.editComment) {
            setText(props.editComment);
        }
    }, [props.edit, props.editComment, text]);

    const onFormSubmit = (e) => {
        setError("");
        e.preventDefault();

        if (props.edit) {
            console.log("yazı editleme");
            api().put(`/posts/${props.edit.id}`, text)
                .then(res => {
                    props.history.push(`/posts/${props.edit.id}`);
                })
                .catch(err => {
                    setError("Başlık ve yazı içeriği alanları zorunludur!");
                });
        } else if (props.editComment) {
            console.log("yorum editleme");
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
                <input disabled={disabledFlag}
                    value={text.display_name || text.title} onChange={onInputChange} name="title" type="text"
                />
            </div>
            <div className="field">
                <label>Yazi İçeriği</label>
                <textarea value={text.body || text.content} onChange={onInputChange} name="content" rows="2"></textarea>
            </div>
            <button onClick={onFormSubmit} className="ui primary button">
                Gönder
            </button>
            <button className="ui button">
                İptal
            </button>
        </div>
    </>
    )
}


export default withRouter(YaziFormu);