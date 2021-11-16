import React, { useEffect, useState } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";
const YaziListesi = (props) => {

    const [yaziListesi, setYaziListesi] = useState([]);
    useEffect(() => {
        api().get("/posts")
            .then(response => {
                setYaziListesi(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className="ui relaxed divided list">
            <h1>Yazı Listesi</h1>
            <Link to={`/yaziekle`} className="header"><h1>Yazi Ekle</h1></Link> <br />
            {yaziListesi.map((yazi, index) => {
                return (<div key={index} className="item">
                    <i className="large github middle aligned icon"></i>
                    <div className="content">
                        <Link to={`/posts/${yazi.id}`} className="header">{yazi.title}</Link>
                        <div className="description">{yazi.created_at}</div>
                    </div>
                </div>)
            })}
        </div>

    )
}

export default YaziListesi;