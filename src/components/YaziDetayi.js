import axios from "axios";
import React, { useEffect, useState } from "react";

const YaziDetayi = (props) => {
    const { id } = props.match.params;

    const [yaziDetayi, setYaziDetayi] = useState({});
    console.log(yaziDetayi)

    useEffect(() => {
        axios.get(`https://react-yazi-yorum.herokuapp.com/posts/${id}`).then((response) => {
            setYaziDetayi(response.data);
        }).catch((error) => {
            console.log(error + " --- Boyle bir içerik yok!");
        });
    }, [id]);
    return (
        <React.Fragment>  {/* <>*/}
            <h2 className="ui header">{yaziDetayi.title}</h2>
            <p>{yaziDetayi.content}</p>
            <p>{yaziDetayi.created_at}</p>
        </React.Fragment> /* <>*/ 
    );
}

export default YaziDetayi;



