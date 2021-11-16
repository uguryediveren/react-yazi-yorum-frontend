import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { api } from "../api";
import { withRouter } from "react-router-dom";




const SilModalYorum = (props) => {

    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    // const [yorum, setYorum] = useState([props.yorum]);

    console.log("yorum", props.yorum);


    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    console.log("yazi_id", props.yaziDetayi.id);
    console.log("yorum_id", props.yorumId);

    const handleDelete = (id) => {
        api().delete(`/posts/${props.yaziDetayi.id}/comments/${props.yorumId}`)
            .then(response => {
                setError("")
                handleClose();
                window.location.reload();
            })
            .catch(err => {
                setError("Yorumu silerken hata oluştu!", err)
            })
    }

    return (
        <>
            <Button color="red" onClick={handleOpen}>Sil</Button>

            <Modal size="mini" open={open} onClose={handleClose}>

                <Modal.Header>
                    Silme Onayı
                </Modal.Header>

                <Modal.Content>
                    <p>Bu yorumu silmek istediğinizden emin misiniz?</p>
                    {error && <p>{error}</p>}
                </Modal.Content>

                <Modal.Actions>
                    <Button onClick={handleClose} negative>
                        İptal Et
                    </Button>
                    <Button
                        positive icon="delete"
                        labelPosition="right"
                        content="Evet,Sil!"
                        onClick={() => handleDelete(props.yorum.id)}
                    /> {/* self close örneği için iptal et butonundan farklı olarka kendi içinde content yazdık*/}

                </Modal.Actions>

            </Modal>
        </>
    )

}


export default withRouter(SilModalYorum);