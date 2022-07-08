import React, { useContext, useState } from "react";
import Button from '@mui/material/Button';
import ListContext from "../../Context/ListContext";
import { DataGrid } from '@mui/x-data-grid';
import DeleteModal from "../Modal/Delete";
import FormModal from "../Modal/Form";
import * as db from '../../Utils/db';

const DataTable = ({rows}) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [editTitle, setEditTitle] = useState(null);
    const [editDescription, setEditDescription] = useState(null);
    const {setItems} = useContext(ListContext);

    const columns = [
        { field: 'id', headerName: 'ID', disablePadding: true, minWidth: 100 },
        { field: 'title', headerName: 'Title', disablePadding: true, minWidth: 200 },
        { field: 'createdAt', headerName: 'Created At', disablePadding: true, minWidth: 200 },
        { field: 'description', headerName: 'Description', disablePadding: true, minWidth: 400 },
        {
            field: 'action',
            headerName: 'Actions',
            sortable: false,
            minWidth: 200,
            disablePadding: true,
            renderCell: (params) => {
                const edit = (event) => {
                    const {title, description} = params.row;

                    event.stopPropagation();
                    setCurrentItem(params.row);
                    setEditTitle(title)
                    setEditDescription(description);
                    setShowEditModal(true);
                };
    
                const remove = (event) => {
                    event.stopPropagation();
                    setCurrentItem(params.row);
                    setShowDeleteModal(true);
                };
    
                return (
                    <>
                        <Button onClick={edit}>Edit</Button>
                        <Button onClick={remove}>Remove</Button>
                    </>
                );
            }
        }
    ];

    const clear = () => {
        setShowDeleteModal(false);
        setEditDescription(null);
        setShowEditModal(false);
        setCurrentItem(null);
        setEditTitle(null)
    }

    const deleteConfirm = () => {
        if (db.remove(currentItem.id)) {
            console.log('Remove Complete');
            setItems(db.getList());
        } else {
            console.log(`Error on Remove ${currentItem.id}`);
        }
        clear();
    }

    const editConfirm = () => {
        if (db.edit(currentItem.id, { title: editTitle, description: editDescription })) {
            console.log('Edit Complete');
            setItems(db.getList());
        } else {
            console.log(`Error on Edit ${currentItem.id}`);
        }
        clear();
    }

    return (
        <>
            <div style={{ height: 'auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    autoHeight={true}
                />
            </div>
        
            <DeleteModal
                item={currentItem}
                show={showDeleteModal}
                onCancel={clear}
                onConfirm={deleteConfirm}
            />

            <FormModal
                item={currentItem}
                show={showEditModal}
                onCancel={clear}
                onConfirm={editConfirm}
                title={editTitle}
                titleChange={setEditTitle}
                description={editDescription}
                descriptionChange={setEditDescription}
            />
        </>
    );
};

export default DataTable;