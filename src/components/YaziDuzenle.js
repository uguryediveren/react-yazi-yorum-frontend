import React, { useEffect, useState } from "react";
import { api } from "../api";
import YaziFormu from "./YaziFormu"


const YaziDuzenle = (props) => {
    const EDIT_BASLANGIC={title:"",content:""}
    const { id } = props.match.params;
    const [edit, setEdit] = useState(EDIT_BASLANGIC);

    console.log("edit",edit);

    useEffect(() => {
        api().get(`/posts/${id}`)
            .then(res => setEdit({title:res.data.title,content:res.data.content}))
            .catch(err => { console.log(err) })
    },[id])

    return (<>
        <h1>Yazı Düzenleme Formu</h1>
        <YaziFormu edit={edit} />
    </>
    )
}

export default YaziDuzenle;

