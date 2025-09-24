import SearchComponent from "./SearchComponent";
import useComplaintDetailsListFetch from "../hooks/ComplaintDetailsFetch";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";

const ComplaintDetails: React.FC = () => {
    const navigate = useNavigate();
    const { filteredData, loading, handleSearch } = useComplaintDetailsListFetch();
    const [open, setOpen] = useState(false);
    const [popupContent, setPopupContent] = useState<string>("");

    const handleOpenPopup = (value: string) => {
        setPopupContent(value);
        setOpen(true);
    };

    const handleClosePopup = () => {
        setOpen(false);
        setPopupContent("");
    };


    const columns: GridColDef[] = [
        { field: "issueId", headerName: "Issue Id", width: 200 },
        { field: "bapId", headerName: "BAP ID", width: 200 },
        { field: "bapUri", headerName: "BAP URI", width: 200 },
        { field: "orderId", headerName: "Order ID", width: 200 },
        { field: "stage", headerName: "Status", width: 120 },
        { field: "shortDesc", headerName: "Description", width: 250 },
        { field: "createdDate", headerName: "Created Date", width: 150 },
        {
            field: "incomingRequest",
            headerName: "Incoming Request",
            width: 180,
            renderCell: (params) => {
                const incomingRequest = params.row.incomingRequest;
                if (incomingRequest && incomingRequest.value) {
                    return (
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleOpenPopup(incomingRequest.value);
                            }}
                        >
                            View
                        </Button>
                    );
                }
                return <Typography variant="body2" color="textSecondary">-</Typography>;
            }
        },
    ];

    const handleRowClick = (params: any) => {
        console.log("Row clicked:", params, params.row);
        const complaintId = params.id;
        navigate(`/complaints/edit/${complaintId}`); // Redirects to edit page
    };

    return (
        <>
            <Box sx={{ pl: 5, mr: 5, mt: 5, backgroundColor: '#F1F2F7', borderRadius: 2 }}>
                <h3>Complaint Details</h3>
                <SearchComponent onSearch={handleSearch} />
                {loading ? <p>Loading...</p> : (
                    <DataGrid
                        rows={filteredData}
                        columns={columns}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 10 } },
                        }}
                        pageSizeOptions={[10, 25, 50]}
                        onRowClick={(params) => handleRowClick(params.row)} />
                )}
            </Box>
            <Dialog open={open} onClose={handleClosePopup} maxWidth="md" fullWidth>
                <DialogTitle>Incoming Request</DialogTitle>
                <DialogContent>
                    <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                        {popupContent}
                    </pre>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopup}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ComplaintDetails;
