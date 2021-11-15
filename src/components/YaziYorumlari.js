
import React from "react";
import YorumFormu from "./YorumFormu";
import YorumListesi from "./YorumListesi";


const YaziYorumlari = (props) => {

    return (
        <>
            <YorumListesi id={props.id} yorumlar={props.yorumlar} />
            <YorumFormu yorum={props.yorum} handleSubmit={props.handleSubmit} />
        </>
    )
}

export default YaziYorumlari;