import React, { useState } from "react";

const YORUM_BASLANGIC = { display_name: "", body: "" }

const YorumFormu = (props) => {

    const [yorum, setYorum] = useState(YORUM_BASLANGIC);

    const handleOnChange = (e) => {
        setYorum({ ...yorum, [e.target.name]: e.target.value });
    }

    console.log("yorum: ", yorum);


    return (<>
        <h3>Yorum Yaz</h3>
        <form className="ui form" onSubmit={(e) => { 
            props.handleSubmit(e,yorum)
            setYorum(YORUM_BASLANGIC)
         }}>
            <div className="ui small icon input">
                <input name="display_name" type="text" value={yorum.display_name} onChange={handleOnChange} placeholder="Adınız..." />
            </div> <br></br>
            <textarea name="body" onChange={handleOnChange} value={yorum.body} placeholder="Yorumunuz..." rows="3"></textarea>
            <button className="ui blue button" type="submit">Yorum Gönder</button>
        </form>

    </>);
}

export default YorumFormu;