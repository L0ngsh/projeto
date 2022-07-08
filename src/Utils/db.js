export const getList = () => {
    const data = localStorage.getItem('items');
    
    if (!data) localStorage.setItem('items', JSON.stringify([]));
    
    return data ? JSON.parse(data) : [];
}

export const insert = (item) => {
    let data = localStorage.getItem('items');
    const {title, description} = item;
    
    if (!data || !title) return false;

    data = JSON.parse(data);
    
    const id = `${Math.round(Math.random() * (100 - 1) + 1)}${new Date().getMilliseconds()}`;
    const createdAt = new Date().toISOString(); 

    data.push({
        title,
        description: description || '',
        id,
        createdAt
    })
    localStorage.setItem('items', JSON.stringify(data));

    return true;
}

export const remove = (id) => {
    let data = localStorage.getItem('items');
    if (!data || !id) return false;

    data = JSON.parse(data);

    const itemPosition = getPositionById(data, id);
    if (itemPosition === null) return false;

    data.splice(itemPosition, 1);
    localStorage.setItem('items', JSON.stringify(data));

    return true
}

export const edit = (id, item) => {
    let data = localStorage.getItem('items');
    const {title, description} = item;
    if (!data || !id || !title) return false;

    data = JSON.parse(data);

    const itemPosition = getPositionById(data, id);
    if (itemPosition === null) return false;
    
    const editItem = {
        ...data[itemPosition],
        title,
        description: description || ''
    };

    data[itemPosition] = editItem;
    localStorage.setItem('items', JSON.stringify(data));

    return true;
}

const getPositionById = (data, id) => {
    let itemPosition = null;
    
    data.forEach((d, index) => {
        if (d.id == id) {
            itemPosition = index;
        }
    });

    return itemPosition;
}