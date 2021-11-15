import React, { useState } from "react";
import { Link } from "react-router-dom";



const YorumListesi = (props) => {


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
                            <button className="mini ui red button">Sil</button>
                        </div>
                    </div>

                </div>
            )
        })}
    </>)
}

export default YorumListesi;