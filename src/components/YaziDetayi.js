import React, { useEffect, useState } from "react";
import YaziYorumlari from "./YaziYorumlari";
import { api } from "../api";
import axios from "axios";
import { Link, useParams,useHistory } from "react-router-dom";
import SilModalYazi from "./SilModalYazi";



const YORUM_BASLANGIC = { display_name: "", body: "" }

const YaziDetayi = (props) => {
    const { id } = useParams();
    const [yaziDetayi, setYaziDetayi] = useState({});
    const [yorumlar, setYorumlar] = useState([]);
    const [yorum, setYorum] = useState(YORUM_BASLANGIC);

    // const history=useHistory();
    // console.log(history);

  



    const handleCommentSubmit = (event, yorum) => {
        event.preventDefault();
        api().post(`posts/${id}/comments`, yorum)
            .then(response => {
                setYorumlar([...yorumlar, response.data]);
                setYorum(YORUM_BASLANGIC)
            })
            .catch(err => { console.log(err); })
    }




    useEffect(() => {
        axios.all([api().get(`/posts/${id}`), api().get(`/posts/${id}/comments`)])
            .then(response => {
                console.log("response", response[0].data);
                setYaziDetayi(response[0].data);
                setYorumlar(response[1].data);
            }).catch(err => { console.log(err); })
    }, [id]);


    return (
        <React.Fragment>  {/* <> */}
            <h2 className="ui header">{yaziDetayi.title}</h2>
            <p>{yaziDetayi.content}</p>
            <p>{yaziDetayi.created_at}</p>
            <div className="ui buttons">
                <Link to={`/posts/${id}/edit`} className="ui blue button">Düzenle</Link>
                <SilModalYazi yazi={yaziDetayi} />
            </div>
            <YaziYorumlari yaziDetayi={yaziDetayi} id={id} yorumlar={yorumlar} yorum={yorum} handleSubmit={handleCommentSubmit} />
        </React.Fragment> /* </> */
    );
}

export default YaziDetayi;



