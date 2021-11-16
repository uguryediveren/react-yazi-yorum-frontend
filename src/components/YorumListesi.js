import React from "react";
import { Link } from "react-router-dom";
import SilModalYorum from "./SilModalYorum";




const YorumListesi = (props) => {


    // yorumları idye göre sortladım. çünkü her yorum güncellemesinde güncellenen yorum dizinin en sonuna gönderiyordu api tasarımı yüzünden
    props.yorumlar.sort((a, b) => (a.id > b.id) ? 1 : -1)

    return (<>
        <h3>Yorumlar</h3>
        {props.yorumlar.map((yorum) => {
            return (
                <div key={yorum.id} className="ui relaxed list">
                    <div className="item">
                        <img className="ui avatar image" src={`https://picsum.photos/id/${Math.floor(yorum.id / 10)}/200/300`} alt="avatar" />
                        <div className="content">
                            <a className="header">{yorum.display_name}</a>
                            <div className="description">{yorum.body}</div>
                            <Link to={{ pathname: `/posts/${props.id}/editcomment/${yorum.id}`, state: { yorum: yorum.body, name: yorum.display_name, postId: props.id } }} className="mini ui blue button">Düzenle</Link>
                            <SilModalYorum yaziDetayi={props.yaziDetayi} yorumId={yorum.id} yorum={props.yorumlar}/>
                        </div>
                    </div>

                </div>
            )
        })}
    </>)
}

export default YorumListesi;