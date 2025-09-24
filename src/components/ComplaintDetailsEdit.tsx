import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Paper, Stack, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import useComplaintDetailsListFetch from "../hooks/ComplaintDetailsFetch"; // <-- use the correct hook
import { ComplaintListProps } from "../types/ComplaintProps";


const ComplaintDetailsEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { filteredData, handleSubmit: submitStatus, submitLoading, submitError } = useComplaintDetailsListFetch();
    const [errors, setErrors] = useState<{ description?: string }>({});
    const [editedComplaint, setEditedComplaint] = useState<ComplaintListProps | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (filteredData.length > 0) {
            const foundComplaint = filteredData.find(item => item.id.toString() === id);
            setEditedComplaint(foundComplaint || null);
        }
    }, [filteredData, id]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedComplaint(prev => ({
            ...prev!,
            [event.target.name]: event.target.value,
        }));
    };

    const handleStageChange = (e: any) => {
        setEditedComplaint(prev => ({
            ...prev!,
            stage: e.target.value,
        }));
    };

    // Call /on_issue_status API on submit
    const handleSubmit = async () => {
        const newErrors: typeof errors = {};

        if (!editedComplaint?.description?.trim()) {
            newErrors.description = "Description is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        await submitStatus(editedComplaint);
        navigate("/complaints");
    };

    if (!editedComplaint) return <Typography sx={{ ml: 32, mt: 8 }}>Loading complaint data...</Typography>;

    return (
        <Box sx={{ padding: 5, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ margin: 'auto', p: 4, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <h3>Complaint Details </h3>
                    <Button variant="text" onClick={() => navigate('/complaints')}>
                        ← Back
                    </Button>
                </Box>
                <Stack spacing={3}>
                    <FormControl fullWidth>
                        <InputLabel id="stage">Category</InputLabel>
                        <Select
                            labelId="stage"
                            id="stage"
                            label="Category"
                            value={editedComplaint?.stage || ""}
                            onChange={handleStageChange}
                        >
                            <MenuItem value="PROCESSING">PROCESSING</MenuItem>
                            <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        name="shortDesc"
                        label="Short Description"
                        variant="outlined"
                        fullWidth
                        value={editedComplaint.shortDesc}
                        onChange={handleChange}
                    />
                    <TextField
                        name="description"
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={4}
                        value={editedComplaint.description}
                        onChange={handleChange}
                        error={Boolean(errors.description)}
                        helperText={errors.description}
                        
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                        <Button variant="contained" onClick={handleSubmit} disabled={submitLoading || editedComplaint.stage === "PROCESSING"}>
                            {submitLoading ? "Updating..." : "Update"}
                        </Button>
                        <Button variant="outlined" onClick={() => navigate('/complaints')}>
                            Cancel
                        </Button>
                    </Box>
                    {submitError && <Typography color="error">{submitError}</Typography>}
                </Stack>
            </Paper>
        </Box>
    );
};

export default ComplaintDetailsEdit;