import React from 'react'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import EditIcon from '@mui/icons-material/Edit';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { client } from '../Services/Api';
import { DialogEdit, DialogDelete } from './Dialog';
import { toast } from "react-toastify";
import { Context } from "../Context/index";



const Folder = () => {
    const { folders } = React.useContext(Context);
    const { check } = React.useContext(Context);
    const { setCheck } = React.useContext(Context);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [valuePost, setValuePost] = React.useState("");
    const [valuePut, setValuePut] = React.useState("");
    const { folderIdOld } = React.useContext(Context);
    const { setFolderIdOld } = React.useContext(Context);
    const { folderIdNew } = React.useContext(Context);
    const { setFolderIdNew } = React.useContext(Context);
    const [countFile, setCountFile] = React.useState(0);


    const handlePost = async () => {
        try {
            let result = folders.filter((item) => {
                return item.folderName === valuePost.trim()
            })
            if (result.length > 0) {
                toast.warning("Post fail name exist");
            }
            else {
                let response = await client.post('', {
                    folderName: valuePost
                });
                if (response.status === 200) {
                    setValuePost("");
                    setCheck(!check);
                    toast.success("Post success");
                }
            }
        } catch (error) {
            toast.error("500 error server");
            console.log(error);
        }
    };

    const handlePut = async () => {
        try {
            let result = folders.filter((item) => {
                return item.folderName === valuePut.trim()
            })
            if (result.length > 0) {
                toast.warning("Put fail name exist");
            }
            else {
                let response = await client.put(`${folderIdOld}`, {
                    folderName: valuePut
                });
                if (response.status === 200) {
                    setValuePut("");
                    setCheck(!check);
                    setOpenEdit(!openEdit);
                    toast.success("Put success");
                }
            }
        } catch (error) {
            toast.error("500 error server");
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            let response = await client.delete(`/${folderIdOld}/${folderIdNew}`);
            if (response.status === 200) {
                setFolderIdOld(0);
                setFolderIdNew(0);
                setCheck(!check);
                setOpenDelete(!openDelete);
                toast.success("Delete success");
            }
        } catch (error) {
            toast.error("500 error server");
            console.log(error);
        }
    };

    React.useEffect(() => {
        const Count = async () => {
            try {
                let response = await client.get(`/CountFile?Folder_Id=${folderIdOld}`);
                setCountFile(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (folderIdOld !== 0) {
            Count();
        }
    }, [folderIdOld]);

    return (
        <>
            <Divider sx={{ margin: 1 }}>New Category</Divider>
            <TextField
                fullWidth
                label="Category Name"
                sx={{ backgroundColor: '#FFF' }}
                value={valuePost}
                onChange={(e) => setValuePost(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton edge="end" color="primary" onClick={handlePost}>
                                <CreateNewFolderIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Divider sx={{ margin: 1 }}>Category List</Divider>
            <h4>Click to select files in this directory, please redirect to file.</h4>
            <List sx={{ maxHeight: '100%', overflow: 'auto', backgroundColor: '#FFF' }}>
                {folders.map(f =>
                    <Stack key={f.folderId} direction="row" spacing={2} onClick={() => { setFolderIdOld(f.folderId); setValuePut(f.folderName) }} sx={folderIdOld === f.folderId ? { backgroundColor: '#20C997', color: '#FFF' } : null}>
                        <Typography sx={{
                            justifyContent: "flex-start",
                            width: '100%', cursor: 'pointer',
                            margin: 'auto', padding: 1
                        }}>{f.folderName}</Typography>
                        <IconButton color="warning" onClick={() => { setOpenEdit(!openEdit) }}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => { setOpenDelete(!openDelete) }}>
                            <FolderDeleteIcon />
                        </IconButton>
                    </Stack>
                )}

            </List>
            <DialogEdit open={openEdit} setOpen={setOpenEdit} value={valuePut} setValue={setValuePut} handlePut={handlePut} />
            <DialogDelete open={openDelete} setOpen={setOpenDelete} value={valuePut} folders={folders} countFile={countFile} setFolderIdNew={setFolderIdNew} handleDelete={handleDelete} />

        </>
    )
}

export default Folder
