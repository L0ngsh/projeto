import React, { useState, useEffect } from "react";
import { Button, Input } from "@mui/material";
import Modal from "..";
import { dateParser } from "../../../Utils/date";

const FormModal = ({
    item = null,
    onConfirm,
    onCancel,
    titleChange,
    title,
    descriptionChange,
    description,
    show = false
}) => {
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (item !== null) setIsEditing(true);
    }, [item]);

    if (show) {
        return (
            <Modal>
                <div className="modal">
                    <div className="modal-title">{isEditing ? `Editar ${item.id}`:'Adicionar a lista'}</div>
                    <div className="modal-form">
                        <div className="modal-form-input">
                            <label htmlFor="title">Título</label>
                            <Input
                                id="title"
                                onChange={(event) => titleChange(event.target.value)}
                                placeholder={'Título'}
                                value={title || ''}
                            />
                        </div>
                            
                        <div className="modal-form-input">
                            <label htmlFor="title">Título</label>
                            <Input
                                id="description"
                                onChange={(event) => descriptionChange(event.target.value)}
                                placeholder={'Descrição'}
                                value={description || ''}
                                rows={5}
                            />
                        </div>
                            
                        <div className="modal-form-input">
                            <label htmlFor="title">Título</label>
                            <Input value={dateParser(isEditing? item.createdAt: new Date().toISOString())} id="createdAt"/>
                        </div>
                    </div>
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

export default FormModal;