import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Typography,
    IconButton,
    TextField
} from "@mui/material";
// import InputAdornment from '@mui/material/InputAdornment';
// import UploadIcon from '@mui/icons-material/Upload';
import { useDropzone } from 'react-dropzone';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const DialogEdit = ({ open, setOpen, value, setValue, handlePut }) => {
    return (
        <>
            <Dialog
                fullWidth
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                            sx={{
                                width: "100%",
                                fontWeight: 600,
                                fontSize: "16px",
                                lineHeight: "24px",
                            }}
                        >
                            Edit category
                        </Typography>
                        <IconButton
                            onClick={() => setOpen(false)}
                            sx={{
                                width: 16,
                                height: 16,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <TextField
                        fullWidth
                        label="New Category Name"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button fullWidth color="inherit" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button fullWidth variant="contained" onClick={handlePut}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

const DialogDelete = ({ open, setOpen, value, folders, countFile, setFolderIdNew, handleDelete }) => {
    return (
        <>
            <Dialog
                fullWidth
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                            sx={{
                                width: "100%",
                                fontWeight: 600,
                                fontSize: "16px",
                                lineHeight: "24px",
                            }}
                        >
                            Delete category
                        </Typography>
                        <IconButton
                            onClick={() => setOpen(false)}
                            sx={{
                                width: 16,
                                height: 16,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Typography sx={{ marginBottom: 2 }}>
                        Have <strong style={{ color: 'red' }}>{countFile}</strong> file exist in <strong style={{ color: 'blue' }}>{value}</strong>. Please
                        move all files to other category.
                    </Typography>
                    <TextField
                        fullWidth
                        select={true}
                        SelectProps={{
                            MenuProps: {
                                sx: { maxHeight: '280px' }
                            }
                        }}
                        label="Choose Category Transfer File"
                    >
                        {folders.map(f =>
                            <MenuItem
                                key={f.folderId}
                                value={f.folderName}
                                onClick={() => setFolderIdNew(f.folderId)}
                            >{f.folderName}</MenuItem>
                        )}
                    </TextField>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button fullWidth color="inherit" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button fullWidth variant="contained" onClick={handleDelete}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

const DialogUploadFile = ({ open, setOpen, file, setFile, folders, value, setValue, setFolderIdNew, handleUpload }) => {
    const { getRootProps, acceptedFiles, fileRejections, getInputProps } =
        useDropzone({
            accept: {
                "image/png": [".png", ".jpg", ".jpeg"],
                "application/docx": [".docx", ".xlsx", ".pdf"],
            },
            maxSize: 10 * 1024 * 1024,
            maxFiles: 1,
            multiple: false,
            onDrop: (acceptedFiles) => {
                setFile(
                    acceptedFiles.map((file) =>
                        Object.assign(
                            file,
                            {
                                preview: URL.createObjectURL(file)
                            },
                        )
                    )
                );
            },
        });
    const regexSizeUnits = (bytes) => {
        if (bytes >= 1073741824) {
            bytes = (bytes / 1073741824).toFixed(2) + " GB";
        } else if (bytes >= 1048576) {
            bytes = (bytes / 1048576).toFixed(2) + " MB";
        } else if (bytes >= 1024) {
            bytes = (bytes / 1024).toFixed(2) + " KB";
        } else if (bytes > 1) {
            bytes = bytes + " bytes";
        } else if (bytes === 1) {
            bytes = bytes + " byte";
        } else {
            bytes = "0 bytes";
        }
        return bytes;
    };

    const acceptedFileItems = acceptedFiles.map((file) => (
        <div key={file.path}>{file.path} - {regexSizeUnits(parseInt(file.size))}</div>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <div key={file.path}>
            {errors.map((e) =>
                <div key={e.code} style={{ color: 'red', marginTop: 10 }}>Error: {e.message}</div>
            )}
        </div>
    ));

    const Style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        height: "250px",
        background: "#FFFFFF",
        border: "2px dashed #7FD0F3",
        borderRadius: "10px",
    }

    return (
        <>
            <Dialog
                fullWidth
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                            sx={{
                                width: "100%",
                                fontWeight: 600,
                                fontSize: "16px",
                                lineHeight: "24px",
                            }}
                        >
                            Upload file
                        </Typography>
                        <IconButton
                            onClick={() => setOpen(false)}
                            sx={{
                                width: 16,
                                height: 16,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <form>
                        <TextField
                            fullWidth
                            label="New File Name"
                            value={value}
                            sx={{ marginBottom: 2 }}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            select={true}
                            sx={{ marginBottom: 2 }}
                            SelectProps={{
                                MenuProps: {
                                    sx: { maxHeight: '280px' }
                                }
                            }}
                            label="Choose Category Post File"
                        >
                            {folders.map(f =>
                                <MenuItem
                                    key={f.folderId}
                                    value={f.folderName}
                                    onClick={() => setFolderIdNew(f.folderId)}
                                >{f.folderName}</MenuItem>
                            )}
                        </TextField>
                        <div
                            style={Style}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} type="file" />
                            <p>Drag 'n' drop some file here, or click to select file</p>
                            <em>(Only *.jpeg and *.png images, .docx, .xlsx, .pdf will be accepted)</em>
                            {file && acceptedFileItems}
                        </div>
                        {fileRejectionItems}
                    </form>

                    {/* <TextField
                        fullWidth
                        type='file'
                        accept='image/* ,.pdf ,application/vnd.ms-excel'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" color="primary" size='large'>
                                        <UploadIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    /> */}
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button fullWidth color="inherit" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button fullWidth variant="contained" onClick={handleUpload}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

const DialogReview = ({ open, setOpen, docs }) => {
    return (
        <>
            <Dialog
                fullWidth
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                            sx={{
                                width: "100%",
                                fontWeight: 600,
                                fontSize: "16px",
                                lineHeight: "24px",
                            }}
                        >
                            Review file
                        </Typography>
                        <IconButton
                            onClick={() => setOpen(false)}
                            sx={{
                                width: 16,
                                height: 16,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <React.Fragment>
                        <DocViewer pluginRenderers={DocViewerRenderers}
                            documents={docs}
                            config={{
                                header: {
                                    disableHeader: true,
                                }
                            }}
                        />
                    </React.Fragment>
                </DialogContent>
            </Dialog>
        </>
    )
}

export { DialogEdit, DialogDelete, DialogUploadFile, DialogReview };