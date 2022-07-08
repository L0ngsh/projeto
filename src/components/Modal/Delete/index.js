import React from "react";
import { Button } from "@mui/material";
import Modal from "..";

const DeleteModal = ({item, onConfirm, onCancel, show = false}) => {
    if (show) {
        return (
            <Modal>
                <div className="modal">
                    <div className="modal-title">Deletar {item.title}?</div>
                    <div className="modal-description">Esta ação não podera ser desfeita</div>
                    <div className="modal-actions">
                        <Button onClick={onConfirm}>Confirmar</Button>
                        <Button onClick={onCancel}>Cancelar</Button>
                    </div>
                </div>
            </Modal>
        );
    } else {
        return (<></>);
    }
    
}

export default DeleteModal;