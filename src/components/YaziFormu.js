import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { api } from "../api";



const YaziFormu = (props) => {
    const TEXT_BASLANGIC = { title: "", content: "" }

    const [text, setText] = useState(TEXT_BASLANGIC);
    const [error, setError] = useState("");

    const onInputChange = (e) => {
        setText({ ...text, [e.target.name]: e.target.value });
    }

    const onFormSubmit = (e) => {
        setError("");
        e.preventDefault();
        api().post(`/posts/`, text)
            .then((response) => {
                setText(TEXT_BASLANGIC);
                props.history.push("/");
            })
            .catch(e => {
                setError(" Başlık ve yazı içeriği alanları zorunludur!")
            });
    }

    console.log("error içeriği: ", error);



    return (<>
        {error && <div className="ui error message">
            <div className="header">Hata</div>
            <p>{error}</p>
        </div>
        }
        <div className="ui form">
            <h1>Yazı Ekleme Formu</h1>
            <div className="field">
                <label>Yazi Başlığı</label>
                <input value={text.title} onChange={onInputChange} name="title" type="text" />
            </div>
            <div className="field">
                <label>Yazi İçeriği</label>
                <textarea value={text.content} onChange={onInputChange} name="content" rows="2"></textarea>
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