import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { api } from "../api";
import { withRouter } from "react-router-dom";




const SilModalYazi = (props) => {

    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");


    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const handleDelete = (id) => {
        api().delete(`/posts/${id}`)
            .then(response => {
                setError("")
                handleClose();
                props.history.push("/");

            })
            .catch(err => {
                setError("Yazıyı silerken hata oluştu!", err)
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
                    <p>{<b>{props.yazi.title}</b>} başlıklı yazıyı silmek istediğinizden emin misiniz?</p>
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
                        onClick={() => handleDelete(props.yazi.id)}
                    /> {/* self close örneği için iptal et butonundan farklı olarka kendi içinde content yazdık*/}

                </Modal.Actions>

            </Modal>
        </>
    )

}


export default withRouter(SilModalYazi);