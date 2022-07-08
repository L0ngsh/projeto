import './style.css';
import React, { useEffect, useState, useContext } from "react";
import ListContext from '../../Context/ListContext';
import { Button } from "@mui/material";
import DataTable from '../../components/DataTable';
import FormModal from '../../components/Modal/Form';
import * as db from '../../Utils/db';

const Home = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [addTitle, setAddTitle] = useState(null);
    const [addDescription, setAddDescription] = useState(null);
    const {items, setItems} = useContext(ListContext);


    useEffect(() => {
        setItems(db.getList());
    }, []);

    const clear = () => {
        setAddDescription(false);
        setShowAddModal(false);
        setAddTitle(false);
    };

    const add = () => {
        setShowAddModal(true);
    }

    const addConfirm = () => {
        if (db.insert({ title: addTitle, description: addDescription })) {
            console.log(`Insert complete`);
            setItems(db.getList());
            clear();
        } else {
            console.log(`Error on insert`);
        }

    }

    return (
        <>
            <section>
                <div className="container">
                    <Button onClick={add}>Adicione</Button>
                    <DataTable rows={items} />
                </div>
            </section>

            <FormModal
                show={showAddModal}
                onCancel={clear}
                onConfirm={addConfirm}
                title={addTitle}
                titleChange={setAddTitle}
                description={addDescription}
                descriptionChange={setAddDescription}
            />
        </>
    );
}
;

export default Home;