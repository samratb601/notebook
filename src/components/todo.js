import React, { useEffect, useState } from 'react'
import Alert from './alert';
import gif from '../images/buddy-13.gif'

const Todo = () => {

    const [input, setInput] = useState({
        title: "",
        desc: ""
    });
    const [item, setItem] = useState([]);
    const [showDltAllBtn, setShowDltAllBtn] = useState(false);
    const [alert, setAlert] = useState({
        title: "",
        desc: ""
    });
    const [showEditBtn, setShowEditBtn] = useState(false);
    const [showAddItemDiv, setShowAddItemDiv] = useState(false);
    const [showAlert, setShowAlert] = useState({ type: '', msg: '' });
    const [showDesc, setShowDesc] = useState(null);
    const [isEdit, setIsEdit] = useState(null);


    useEffect(() => {

        if (localStorage.getItem('todos')) {
            setItem(JSON.parse(localStorage.getItem("todos")))
        }

    }, [])


    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(item))

        if (item.length) {
            setShowDltAllBtn(true)
        }
        const timer = setTimeout(() => {
            setShowAlert({ type: '', msg: '' })
        }, 3500);
        return () => clearTimeout(timer);
    }, [item])


    // add todo items////
    const addItem = () => {
        var title = input.title;
        var desc = input.desc;

        // console.log(input);        

        if (!isEdit && title !== '' && desc !== '') {

            var data = { id: new Date().getTime().toString(), title: title, desc };
            setItem([...item, data]);

            setInput({
                title: "",
                desc: ""
            })

            setShowDltAllBtn(true)
            setShowAddItemDiv(false);
            setShowAlert({ type: 'success', msg: 'Successfully added' })


        } else if (isEdit && title !== '' && desc !== '') {

            setItem(
                item.map((elem) => {
                    if (elem.id === isEdit) return { ...elem, title, desc }
                    return elem;
                })
            )

            setShowEditBtn(false);
            setShowAddItemDiv(false);
            setIsEdit(null);
            setInput({
                title: "",
                desc: ""
            });
            setShowAlert({ type: 'success', msg: 'Successfully updted' })

        } else {

            title === '' && setAlert((prevAlert) => { return { ...prevAlert, title: 'This Field is Required' } });
            desc === '' && setAlert((prevAlert) => { return { ...prevAlert, desc: 'This Field is Required' } });
            // rest of this part is in onChange attribute function inside jsx element
        }
    }

    // delete todo items///
    const deleteItem = (id) => {
        const updateItems = item.filter((elem, indx) => {
            return elem.id !== id;
        })
        setItem(updateItems);

        if (!updateItems.length) {
            setShowDltAllBtn(false);
        }
        setShowAlert({ type: 'warning', msg: 'Successfully deleted' })

    }
    // delete All todo items///
    const deleteAllItems = () => {
        setItem([]);
        setShowDltAllBtn(false)
        setShowAlert({ type: 'danger', msg: 'Successfully deleted All notes' })
    }

    // edit todo items///
    const editItem = (id) => {

        const updateItems = item.find((elem) => {
            return elem.id === id;
        })


        setShowAddItemDiv(true);
        setShowEditBtn(true);
        setIsEdit(id);
        setInput(updateItems);
        // console.log(updateItems);
    }

    // show notes description ////
    const showNoteDesc = (noteId) => {

        if (!showDesc) {
            setShowDesc(noteId);
        } else {
            setShowDesc(null);
        }
    }
    // show add item div  ////
    const addItemDivShow = () => {

        if (!showAddItemDiv) {
            setShowAddItemDiv(true);
        } else {
            setShowAddItemDiv(false);
        }
        // console.log(showAddItemDiv);
    }


    return (
        <div className='mt-5'>

            <div className='d-flex align-items-center justify-content-center flex-column mt-4 w-100'>

                <i className="fa fa-note-sticky text-light mb-5"><span className='ms-2'>Note-Book</span><i className='fa fa-pencil-alt ms-2'></i></i>

                {
                    (showAlert.msg && showAlert.type !== '') &&
                    <Alert alertType={showAlert.type} alertMsg={showAlert.msg} />

                }
                <div className='addItems flex-column'>


                    {
                        showAddItemDiv &&
                        <>
                            <textarea type="text" name="title" className='textbox shadow-sm mb-1' placeholder='🖋 Title' value={input.title} rows="1" cols="30"
                                onChange={(e) => {
                                    setInput((prevData) => { return { ...prevData, title: e.target.value } });
                                    e.target.value.trim() === "" ? setAlert((prevAlert) => { return { ...prevAlert, title: 'This Field is Required' } }) :
                                        setAlert((prevAlert) => { return { ...prevAlert, title: '' } });
                                }} ></textarea>
                            <small className='text-light mb-3'>
                                {
                                    alert.title && alert.title
                                }
                            </small>

                            <textarea className='textbox shadow-sm' type="text" name="text" placeholder='🖊 Description .... ' value={input.desc}

                                onChange={(e) => {
                                    setInput((prevData) => { return { ...prevData, desc: e.target.value } });
                                    e.target.value.trim() === "" ? setAlert((prevAlert) => { return { ...prevAlert, desc: 'This Field is Required' } }) :
                                        setAlert((prevAlert) => { return { ...prevAlert, desc: '' } });
                                }}
                                cols="30" rows="2" >
                            </textarea>
                            <small className='text-light mt-1'>
                                {
                                    alert.desc && alert.desc
                                }
                            </small>
                        </>
                    }

                    {
                        showEditBtn ?
                            <i className='fa fa-check text-success btn-light shadow-sm mt-3 p-2 rounded-circle' title='Edit Item' onClick={addItem}></i>
                            :
                            <i className=
                                {`fa-solid fa-plus text-success fw-bold  btn-light  rounded-circle  shadow-sm mt-3 ${showAddItemDiv ? 'p-2' : 'p-3'}`}

                                title='Add an Item' onClick={showAddItemDiv ? addItem : addItemDivShow}></i>

                    }

                </div>


                <div className='d-flex  flex-column align-items-center justify-content-center col-10 col-md-6 mt-5'>
                    <div className='text-light d-flex justify-content-between align-items-center mb-3'>
                        Your TO-DO Items
                    </div>
                    {

                        item.map((elem, indx) => {
                            return (
                                <div
                                    className=
                                    {
                                        `row showItems shadow-sm mt-2 w-100 py-2 ${(isEdit !== elem.id) && 'bg-light'}`
                                    }
                                    key={elem.id} >

                                    <div className='col-8' onClick={() => showNoteDesc(elem.id)}>
                                        <h6 className='item title mb-0 mt-2'>{elem.title}</h6>
                                        {
                                            (showDesc === elem.id) && <p className='item desc'>{elem.desc}</p>
                                        }
                                    </div>

                                    <div className='col-4 mt-1'>
                                        {
                                            (isEdit !== elem.id) ?
                                                <>
                                                    <i className='fa fa-pencil-alt me-3' title='Edit Item' onClick={() => editItem(elem.id)}></i>
                                                    <i className='fa fa-trash-alt me-3' title='Delete Item' onClick={() => deleteItem(elem.id)}></i>
                                                    <i className={`fa fa-angle-${showDesc === elem.id?'up':'down'} me-0`} title='Expand Note' onClick={() => showNoteDesc(elem.id)}></i>
                                                </> :
                                                <i className='fa fa-check text-success' title='Edit Item' onClick={addItem}></i>
                                        }
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>

                {
                    showDltAllBtn ?

                        <i className='fa fa-trash-alt text-danger btn btn-light shadow-sm mt-5 rounded-circle' title='Delete All Items' onClick={deleteAllItems}></i>
                        :
                        <>
                            <img src={gif} className='mt-5 py-3 px-5 w-100' alt='' />
                            <h6 className='text-light'>Add + Some To-Dos</h6>
                        </>

                }

            </div>
        </div>
    )
}

export default Todo;