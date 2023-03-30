import React from 'react'
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import PreviewIcon from '@mui/icons-material/Preview';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UploadIcon from '@mui/icons-material/Upload';
import {
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
} from "@mui/material";
import { DialogUploadFile, DialogReview } from './Dialog';
import { client } from '../Services/Api';
import { Context } from "../Context/index";
import { toast } from "react-toastify";

const File = () => {
    const { folders } = React.useContext(Context);
    const { folderIdNew } = React.useContext(Context);
    const { setFolderIdNew } = React.useContext(Context);
    const [openUpload, setOpenUpload] = React.useState(false);
    const [openReview, setOpenReview] = React.useState(false);
    const [files, setFiles] = React.useState([]);
    const [file, setFile] = React.useState([]);
    const [value, setValue] = React.useState("");
    const [review, setReview] = React.useState("");
    const [check, setCheck] = React.useState(false);
    const [file_Id, setFile_Id] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const open = Boolean(anchorEl);

    const handleClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setFile_Id(id);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleUpload = async () => {
        let formData = new FormData();
        formData.append("file", file[0]);
        try {
            let result = files.filter((item) => {
                return item.fileName === value.trim()
            })
            if (result.length > 0) {
                toast.warning("Post fail file name exist");
            }
            else {
                let response = await client.post(`/UploadFile?Folder_Id=${folderIdNew}&FileName=${value.trim()}`, formData);
                if (response.status === 200) {
                    setValue("");
                    setFolderIdNew(0);
                    setOpenUpload(false);
                    setCheck(!check);
                    toast.success("Post file success");
                }
            }
        } catch (error) {
            toast.error("500 error server");
            console.log(error);
        }
    }
    const handleSearch = async (text) => {
        try {
            if (text.trim().length === 0) {
                setCheck(!check);
            }
            else {
                let response = await client.get(`/Search/${text.trim()}`);
                if (response.status === 200) {
                    setFiles(response.data);
                }
            }
        } catch (error) {
            toast.error("500 error server");
            console.log(error);
        }
    }

    React.useEffect(() => {
        const GetAllFile = async () => {
            try {
                let response = await client.get('?_limit=10');
                setFiles(response.data.files);
            } catch (error) {
                console.log(error);
            }
        };
        GetAllFile();
    }, [check]);



    const docs = [
        {
            uri:
                `https://cvtapi.bsite.net/${review}`
        }
    ];

    return (
        <>
            <Button fullWidth={true} sx={{ backgroundColor: '#FFF' }} onClick={() => setOpenUpload(!openUpload)}>
                <UploadIcon />  Upload File
            </Button>
            <Divider sx={{ margin: 1 }}>Search File</Divider>
            <TextField
                fullWidth
                label="File Name"
                onChange={(e) => handleSearch(e.target.value)}
                sx={{ backgroundColor: '#FFF' }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton edge="end" color="primary">
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Divider sx={{ margin: 1 }}>File List</Divider>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table>
                        <TableHead
                            sx={{
                                backgroundColor: "#20C997",
                                "& .MuiTableCell-head": {
                                    fontWeight: 600,
                                    fontFamily: "Roboto",
                                    color: "#FFF"
                                },
                            }}
                        >
                            <TableCell>File Name</TableCell> {/* Tiêu đề */}
                            <TableCell>Folder Id</TableCell> {/* Danh mục */}
                            <TableCell>Update Date</TableCell> {/* Thời gian */}
                            <TableCell></TableCell>
                        </TableHead>
                        <TableBody
                            sx={{
                                '&	.MuiTableRow-root:hover': {
                                    backgroundColor: '#FAFAFA'
                                },
                                fontWeight: "400px",
                                fontSize: "14px",
                                lineHeight: "20px",
                            }}
                        >
                            {
                                (rowsPerPage > 0
                                    ? files.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : files
                                ).map(f => {
                                    return (
                                        <TableRow key={f.fileId} sx={file_Id === f.fileId ? { backgroundColor: '#FAFAFA' } : null}>
                                            <TableCell>
                                                {/* <Box sx={{ display: 'flex' }}>
                                            {count ? renderIcon((f.fileType).trim()) : ""}
                                            &nbsp; {f.fileName}
                                        </Box> */}
                                                {f.fileName}
                                            </TableCell>
                                            <TableCell>{f.folderId}</TableCell>
                                            <TableCell>{new Date(f.dateUpload).toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Button
                                                    style={{ float: 'right' }}
                                                    onClick={(e) => {
                                                        handleClick(e, f.fileId)
                                                    }}
                                                >
                                                    <MoreVertIcon />
                                                </Button>
                                            </TableCell>
                                            <Menu
                                                elevation={1}
                                                sx={{
                                                    borderRadius: "8px",
                                                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.16)",
                                                }}
                                                anchorOrigin={{
                                                    vertical: "bottom",
                                                    horizontal: "right",
                                                }}
                                                transformOrigin={{
                                                    vertical: "top",
                                                    horizontal: "right",
                                                }}
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                            >
                                                <MenuItem onClick={() => { setOpenReview(true); setReview(f.filePath) }}>
                                                    <PreviewIcon />
                                                    <Typography >
                                                        Review
                                                    </Typography>
                                                </MenuItem>
                                            </Menu>

                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, { label: 'All', value: -1 }]}
                    count={files.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: {
                            'aria-label': 'rows per page',
                        },
                        native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    component={"div"}
                ></TablePagination>
            </Paper>

            <DialogUploadFile open={openUpload} setOpen={setOpenUpload} file={file} setFile={setFile} folders={folders} value={value} setValue={setValue} setFolderIdNew={setFolderIdNew} handleUpload={handleUpload} />
            <DialogReview open={openReview} setOpen={setOpenReview} docs={docs} />
        </>
    )
}

export default File