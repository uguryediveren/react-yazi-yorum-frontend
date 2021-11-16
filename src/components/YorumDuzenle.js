import React, { useEffect, useState } from "react";
import YaziFormu from "./YaziFormu";




const YorumDuzenle = (props) => {

    const { id } = props.match.params;
    // console.log("yorum_id",id);
    // console.log("props: ",props.location.state.yorum);
    // console.log("post_id: ",props.location.state.postId);
    // console.log("name: ", props.location.state.name);
    // console.log("yorum: ",props.location.state.yorum);

    const [editComment, setEditComment] = useState({})

    useEffect(() => {
        setEditComment({ display_name: props.location.state.name, body: props.location.state.yorum })
    }, [props.location.state.name, props.location.state.yorum])


    return (<>
        <h1>Yorum Düzenle Formu</h1>
        <YaziFormu editComment={editComment} deleteId={id} cancelId={props.location.state.postId} postId={props.location.state.postId} commentId={id} />
    </>)
}


export default YorumDuzenle;